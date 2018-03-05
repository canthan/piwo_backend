
exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('stashes', (table) => {
      table.integer('stashes_user_id').notNullable();
      table.foreign('stashes_user_id').references('user_id').inTable('users');
      table.integer('batch_number').notNullable();
      table.foreign('batch_number').references('batch_number').inTable('batches');
      table.string('stash_name').notNullable();
      table.integer('b050');
      table.integer('b040');
      table.integer('b033');
    });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('stashes')
};