const Router = require('koa-router');
const koaBody = require('koa-body');
const queries = require('../db/queries/stashes');
const common = require('../common/formatOutputData');

const router = new Router();
const BASE_URL = `/api/v1.0/stashes`;

router.get(BASE_URL, async (ctx) => {
  try {
    const stashes = await queries.getAllStashes();
    ctx.body = {
      status: 'success',
      data: stashes
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:stash_id`, async (ctx) => {
  try {
    const stash = await queries.getStashById(ctx.params.stash_id);
    ctx.body = {
      status: 'success',
      data: stash
    };
  } catch (err) {
    console.log(err)
  }
});

router.get(`${BASE_URL}/:user_id/:batch_id`, async (ctx) => {
  try {
    let stashes = await queries.getStashesOfBatch(ctx.params.user_id, ctx.params.batch_id);
    let stashes_output = [];
    stashes = JSON.parse(JSON.stringify(stashes));
    stashes.forEach((stash) => {
      stashes_output.push(common.formatSingleStash(stash));
    });
    ctx.body = {
      status: 'success',
      data: stashes_output
    };
  } catch (error) {
    console.error(error)
  }
});

router.put(`${BASE_URL}/:user_id/:batch_id`, koaBody(), async (ctx) => {
  try {
    const stashes = await singleStashUpdate(ctx.request.body.stashes);
    if (areThereAnyStashes(stashes)) {
      ctx.status = 200;
      ctx.body = stashes;
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That batch does not exist.'
      };
    }
  } catch (error) {
    ctx.body = {
      status: 'error',
      message: error.message || 'Sorry, an error has occurred.'
    }
  }
});

router.post(`${BASE_URL}/:user_id/:batch_id`, koaBody(), async (ctx) => {
  try {
    console.log(ctx.request.body.stashes);
    const stash = await queries.insertStash(ctx.request.body.stashes);
    if (stash.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: stash
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (error) {
    console.error(error);
  }
});

areThereAnyStashes = (stashes) => {
  return stashes.length;
}

singleStashUpdate = (stashes) => {
  stashes.forEach(async (stash, index) => {
    const stashes = [];
    stashes[index] = await queries.updateStash(stash.stash_id, stash);
    stashes[index] = JSON.parse(JSON.stringify(...stashes[index]));
  })
  return stashes;
}

requestSuccess = (ctx, data) => {
  ctx.body = {
    status: 200,
    data: data,
  };
}

module.exports = router;
