
exports.seed = (knex, Promise) => {
  return knex('stashes').del()
    .then(() => {
      return knex('stashes').insert([{
        stashes_user_id: 1,
        batch_number: 2,
        stash_name: "Piwnica",
        b050: 10,
        b040: 2,
        b033: 1,
      }])
    })
    .then(() => {
      return knex('stashes').insert([{
        stashes_user_id: 1,
        batch_number: 2,
        stash_name: "Dom",
        b050: 3,
        b040: 2,
      }])
    })
    .then(() => {
      return knex('stashes').insert([{
        stashes_user_id: 1,
        batch_number: 4,
        stash_name: "Piwnica",
        b050: 20,
        b040: 2,
        b033: 3,
      }])
    })
    .then(() => {
      return knex('stashes').insert([{
        stashes_user_id: 1,
        batch_number: 4,
        stash_name: "Dom",
        b050: 5,
        b040: 2,
        b033: 1,
      }])
    })
    .then(() => {
      return knex('stashes').insert([{
        stashes_user_id: 1,
        batch_number: 5,
        stash_name: "Piwnica",
        b050: 25,
        b040: 2,
        b033: 1,
      }])
    })
    .then(() => {
      return knex('stashes').insert([{
        stashes_user_id: 2,
        batch_number: 4,
        stash_name: "Dom",
        b050: 5,
        b040: 2,
        b033: 1,
      }])
    })
    .then(() => {
      return knex('stashes').insert([{
        stashes_user_id: 2,
        batch_number: 5,
        stash_name: "Piwnica",
        b050: 25,
        b040: 2,
        b033: 1,
      }])
    });
   
  };
