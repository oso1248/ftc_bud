
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments() // sets to 'id' on initialize
    tbl.string('username', 128)
      .notNullable()
      .unique()
      .index()
    tbl.string('password')
      .notNullable()
    tbl.string('email', 128)
      .notNullable()
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
