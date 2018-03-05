
exports.seed = (knex, Promise) => {
  return knex('batches').del()
    .then(() => {
      return knex('batches').insert([{
        batch_number: 2,
        batch_user_id: 1,
        batch_name: 'Item_2',
        bottled_on: '2017-12-22',
        quantity_litres: 10,
        quantity_bottles: 20,
        quantity_crates: 1,
      }]).into('batches');
    })
    .then(() => {
      return knex('batches').insert([{
        batch_number: 4,
        batch_user_id: 1,
        batch_name: 'Item_4',
        bottled_on: '2018-01-02',
        quantity_litres: 15,
        quantity_bottles: 30,
        quantity_crates: 1.5,
      }]).into('batches');
    })
    .then(() => {
      return knex('batches').insert([{
        batch_number: 5,
        batch_user_id: 1,
        batch_name: 'Item_5',
        bottled_on: '2018-01-16',
        quantity_litres: 16,
        quantity_bottles: 32,
        quantity_crates: 1.6,
      }]);
    })
    .then(() => {
      return knex('batches').insert([{
        batch_number: 6,
        batch_user_id: 1,
        batch_name: 'Item_6',
        bottled_on: '2018-02-02',
        quantity_litres: 10,
        quantity_bottles: 20,
        quantity_crates: 1,
      }]);
    })
    .then(() => {
      return knex('batches').insert([{
        batch_number: 50,
        batch_user_id: 2,
        batch_name: 'Item_50',
        bottled_on: '2018-01-16',
        quantity_litres: 16,
        quantity_bottles: 32,
        quantity_crates: 1.6,
      }]);
    })
    .then(() => {
      return knex('batches').insert([{
        batch_number: 60,
        batch_user_id: 1,
        batch_name: 'Item_60',
        bottled_on: '2018-02-02',
        quantity_litres: 10,
        quantity_bottles: 20,
        quantity_crates: 1,
      }]);
    });
  };
