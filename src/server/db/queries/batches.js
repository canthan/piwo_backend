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

function insertBatch(batch) {
  return knex('batches')
    .insert(batch)
    .returning('*');
}

function deleteBatch(batchNumber) {
  return knex('batches')
    .del()
    .where({ batch_id: parseInt(batchNumber) })
    .returning("*");
}

module.exports = {
  deleteBatch,
  insertBatch,
  getAllBatches,
  getBatchesOfUser,
};
