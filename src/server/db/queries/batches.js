const knex = require('../connection');

function getAllBatches() {
  return knex('batches')
    .select('*');
}

function getBatchesOfUser(user_id) {
  return knex('batches')
    .select('*')
    .where({ batch_user_id: parseInt(user_id) });
}

module.exports = {
  getAllBatches,
  getBatchesOfUser,
};
