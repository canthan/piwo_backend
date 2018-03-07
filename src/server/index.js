const Koa = require('koa');
const cors = require('koa-cors');

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const userDataRoutes = require('./routes/user_data');
const batchesRoutes = require('./routes/batches');
const stashesRoutes = require('./routes/stashes');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(cors());

app.use(indexRoutes.routes());
app.use(usersRoutes.routes());
app.use(batchesRoutes.routes());
app.use(stashesRoutes.routes());
app.use(userDataRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
