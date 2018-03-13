const Router = require('koa-router');
const queries = require('../db/queries/users');

const router = new Router();
const BASE_URL = `/api/v1.0/users`;

router.get(BASE_URL, async (ctx) => {
  try {
    const users = await queries.getAllUsers();
    ctx.body = {
      status: 'success',
      data: users
    };
  } catch (err) {
    console.error(err)
  }
})

router.get(`${BASE_URL}/:user_id`, async (ctx) => {
  try {
    let user = await queries.getSingleUser(ctx.params.user_id);
    user = JSON.parse(JSON.stringify(user))[0];
    ctx.body = {
      status: 'success',
      data: user
    };
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
