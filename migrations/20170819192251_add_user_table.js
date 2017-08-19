
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', function (table) {
    table.increments();
    table.string('name');
    table.string('email');
    table.string('password');
    table.timestamps(false, true);
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user')
}
