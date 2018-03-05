const Router = require('koa-router');
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

router.get(`${BASE_URL}/:user_id`, async (ctx) => {
  try {
    const stashes = await queries.getStashesOfUser(ctx.params.user_id);
    ctx.body = {
      status: 'success',
      data: stashes
    };
  } catch (err) {
    console.log(err)
  }
})

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
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
