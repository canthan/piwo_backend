const knex = require('../connection');

function getAllUsers() {
  return knex('users')
  .select('username', 'firstname', 'surname', 'password', 'email', 'registration_date');
}

function getSingleUser(id) {
  return knex('users')
  .select('*')
  .where({user_id: parseInt(id)});
}

module.exports = {
  getAllUsers,
  getSingleUser,
};
