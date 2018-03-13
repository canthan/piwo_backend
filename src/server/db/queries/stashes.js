const knex = require('../connection');

function getAllStashes() {
  return knex('stashes')
  .select('*');
}

function getStashById(stash_id) {
  return knex('stashes')
    .select('*')
    .where({ stash_id: parseInt(stash_id) });
}

function getStashesOfBatch(user_id, batch_id) {
  return knex('stashes')
    .select('*')
    .where({ batch_id: parseInt(batch_id), stash_user_id: parseInt(user_id) });
}

function updateStashes(user_id, batch_id, stashes) {
  let updatedStash;
  stashes.forEach((stash) => {
    updatedStash = updateStash(stash.stash_id, stash);
  });
  return updatedStash;
}

function updateStash(stash_id, stash) {
  return knex('stashes')
    .update(stash)
    .where({ stash_id: parseInt(stash.stash_id) })
    .returning('*');
}

function insertStash(stash) {
  return knex('stashes')
    .insert(stash)
    .returning('*');
}

function deleteStashesFromBatch(user_id, batch_id) {
  return knex('stashes')
  .del()
  .where({ batch_id: parseInt(batch_id), stash_user_id: parseInt(user_id) })
  .returning("*");
}

module.exports = {
  deleteStashesFromBatch,
  insertStash,
  getAllStashes,
  getStashesOfBatch,
  getStashById,
  updateStashes,
  updateStash,
};
