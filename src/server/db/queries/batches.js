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

function deleteBatch(batch_id) {
  return knex('batches')
    .del()
    .where({ batch_id: parseInt(batch_id) })
    .returning("*");
}

function updateBatch(user_id, batch_id, batch) {
  return knex('batches')
    .update(batch)
    .where({ batch_id: parseInt(batch_id), batch_user_id: parseInt(user_id) })
    .returning('*');
}

module.exports = {
  deleteBatch,
  insertBatch,
  getAllBatches,
  getBatchesOfUser,
  updateBatch,
};
