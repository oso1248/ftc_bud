
exports.up = function(knex) {
  return knex.schema.createTable('brewery', tbl => {
    tbl.increments() // sets to 'id' on initialize
    tbl.string('brewery', 25)
      .notNullable()
      .unique()
    tbl.string('note', 256)
    tbl.timestamps(true, true)
  })
  .createTable('users', tbl => {
    tbl.increments() // sets to 'id' on initialize
    tbl.string('username', 128)
      .notNullable()
      .unique()
      .index()
    tbl.string('password', 256)
      .notNullable()
    tbl.string('email', 128)
      .notNullable()
    tbl.integer('permissions')
      .notNullable()
    tbl.timestamps(true, true)

    // foreign keys
    tbl.integer('brewery_id') // brewery
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('brewery')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('brewery')
};
