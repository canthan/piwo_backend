const Router = require('koa-router');
const queries = require('../db/queries/user_data');
const common = require('../common/formatOutputData');

const router = new Router();
const BASE_URL = `/api/v1.0/user_data`;

router.get(`${BASE_URL}/:user_id`, async (ctx) => {
  try {
    const user_data = await queries.getUserData(ctx.params.user_id);
    let user_batches = await queries.getUserBatches(ctx.params.user_id)
    let user_stashes = await queries.getUserStashes(ctx.params.user_id);

    let output_data = JSON.parse(JSON.stringify(user_data));
    output_data = Object.assign(...output_data);

    user_batches = JSON.parse(JSON.stringify(user_batches));

    let formatted_stashes = [];
    user_stashes = [...JSON.parse(JSON.stringify(user_stashes))];
    user_stashes.forEach((stash) => {
      formatted_stashes.push(common.formatSingleStash(stash));
    });

    user_batches.forEach((batch, index) => {
      user_batches[index]['stashes'] = [];
      formatted_stashes.forEach((stash) => {
        if (batch.batch_id === stash.batch_id) {
          user_batches[index].stashes.push(stash);
        }
      })
    });
    output_data['batches'] = user_batches;
    output_data['stashes'] = formatted_stashes;

    ctx.body = {
      status: 'success',
      data: output_data
    };
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
