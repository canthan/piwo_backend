
exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('stashes', (table) => {
      table.increments('stash_id').unique().primary();
      table.integer('stash_user_id').notNullable();
      table.foreign('stash_user_id').references('user_id').inTable('users');
      table.integer('batch_id').notNullable();
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