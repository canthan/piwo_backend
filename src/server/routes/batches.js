const Router = require('koa-router');
const queries = require('../db/queries/batches');

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

module.exports = router;
