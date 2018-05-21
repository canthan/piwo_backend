const Router = require('koa-router');
const koaBody = require('koa-body');
const queries = require('../db/queries/batches');
const stash_queries = require('../db/queries/stashes');

const router = new Router();
const BASE_URL = `/api/v1.0/batches`;

router.get(BASE_URL, async ctx => {
  try {
    const batches = await queries.getAllBatches();
    ctx.body = {
      status: 'success',
      data: batches
    };
  } catch (err) {
    console.log(err);
  }
});

router.get(`${BASE_URL}/:user_id`, async ctx => {
  try {
    const batches = await queries.getBatchesOfUser(ctx.params.user_id);
    ctx.body = {
      status: 'success',
      data: batches
    };
  } catch (err) {
    console.log(err);
  }
});

router.post(`${BASE_URL}/:user_id`, koaBody(), async ctx => {
  try {
    const newBatch = ctx.request.body;
    newBatch['quantity_litres'] = 0;
    newBatch['quantity_bottles'] = 0;
    newBatch['quantity_crates'] = 0;
    newBatch.batch_user_id = ctx.params.user_id;
    let batch = await queries.insertBatch(newBatch);
    batch = JSON.parse(JSON.stringify(...batch));
    batch['stashes'] = [];
    delete batch.batch_user_id;

    if (batch) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: batch
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

router.delete(`${BASE_URL}/:user_id/:batch_id`, async ctx => {
  try {
    let deletedRecords = {
      stashes: [],
      batches: []
    };
    await deleteStashes(
      ctx.params.user_id,
      ctx.params.batch_id,
      deletedRecords
    );
    await deleteBatch(ctx.params.batch_id, deletedRecords);
    if (deletedRecords.batches.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: deletedRecords
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

router.put(`${BASE_URL}/:user_id/:batch_id`, koaBody(), async (ctx) => {
  try {
    const batch = await queries.updateBatch(ctx.params.user_id, ctx.params.batch_id, ctx.request.body.batch)
    if (batch) {
      ctx.status = 200;
      ctx.body = { data: batch };
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
    };
  }
});

deleteStashes = async (user_id, batch_id, deletedRecords) => {
  const deleted = await stash_queries.deleteStashesFromBatch(user_id, batch_id);
  deletedRecords.stashes = deleted;
};

deleteBatch = async (batch_id, deletedRecords) => {
  const deleted = await queries.deleteBatch(batch_id);
  deletedRecords.batches = deleted;
};

module.exports = router;
