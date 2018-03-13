const Router = require('koa-router');
const koaBody = require('koa-body');
const queries = require('../db/queries/batches');
const stash_queries = require('../db/queries/stashes');

const router = new Router();
const BASE_URL = `/api/v1.0/batches`;

router.get(BASE_URL, async (ctx) => {
  try {
    const batches = await queries.getAllBatches();
    ctx.body = {
      status: 'success',
      data: batches
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:user_id`, async (ctx) => {
  try {
    const batches = await queries.getBatchesOfUser(ctx.params.user_id)
    ctx.body = {
      status: 'success',
      data: batches
    };
  } catch (err) {
    console.log(err)
  }
})

router.post(`${BASE_URL}/:user_id`, koaBody(), async (ctx) => {
  try {
    const newBatch = ctx.request.body;
    newBatch['quantity_litres'] = 0;
    newBatch['quantity_bottles'] = 0;
    newBatch['quantity_crates'] = 0;
    let batch = await queries.insertBatch(newBatch);
    batch = JSON.parse(JSON.stringify(...batch));
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

router.delete(`${BASE_URL}/:user_id/:batch_id`, async (ctx) => {
  try {
    let deletedRecords = [];
    await deleteStashes(ctx.params.user_id, ctx.params.batch_id, deletedRecords);
    await deleteBatch(ctx.params.batch_id, deletedRecords);
    if (deletedRecords.length) {
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
})

deleteStashes = async (user_id, batch_id, deletedRecords = []) => {
  const deleted = await stash_queries.deleteStashesFromBatch(user_id, batch_id);
  deletedRecords.push(deleted);
}

deleteBatch = async (batch_id, deletedRecords = []) => {
  const deleted = await queries.deleteBatch(batch_id);
  deletedRecords.push(deleted);
}

module.exports = router;
