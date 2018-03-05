const knex = require('../connection');

function getAllStashes() {
  return knex('stashes')
  .select('*');
}

function getStashesOfUser(user_id) {
  return knex('stashes')
  .select('*')
  .where({stashes_user_id: parseInt(user_id)});
}

function getStashesOfBatch(user_id, batch_id) {
  return knex('stashes')
  .select('*')
  .where({batch_number: parseInt(batch_id), stashes_user_id: parseInt(user_id)});
}

module.exports = {
  getAllStashes,
  getStashesOfBatch,
  getStashesOfUser,
};
