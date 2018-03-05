const knex = require('../connection');

function getUserData(user_id) {
  return knex('users')
    .select('*')
    .where({ user_id: parseInt(user_id) });
}

function getUserBatches(user_id) {
  return knex('batches')
    .select('batch_number', 'batch_name', 'bottled_on', 'quantity_litres', 'quantity_bottles', 'quantity_crates')
    .where({ batch_user_id: parseInt(user_id) });
}

function getUserStashes(user_id) {
  return knex('stashes')
    .select('batch_number', 'stash_name', 'b050', 'b040', 'b033')
    .where({ stashes_user_id: parseInt(user_id) });
}

function getUserBatchesStashes(user_id, batch_number) {
  return knex('stashes')
    .select('stash_name', 'b050', 'b040', 'b033')
    .where({ batch_number: parseInt(batch_id), stashes_user_id: parseInt(user_id) });
}

module.exports = {
  getUserBatches,
  getUserBatchesStashes,
  getUserStashes,
  getUserData,
};
