
// knex migrate:latest
exports.up = function(knex) {
  return knex.schema.createTable('mtl_uom', tbl => {
    tbl.increments() // sets to 'id' on initialize
    tbl.string('uom', 25)
      .notNullable()
      .unique()
    tbl.string('note', 256)
    tbl.timestamps(true, true)
  })
  .createTable('mtl_type', tbl => {
    tbl.increments() // sets to 'id' on initialize
    tbl.string('type', 25)
      .notNullable()
      .unique()
    tbl.string('note', 256)
    tbl.timestamps(true, true)
  })
  .createTable('mtl_location', tbl => {
    tbl.increments() // sets to 'id' on initialize
    tbl.string('location', 25)
      .notNullable()
      .unique()
    tbl.string('note', 256)
    tbl.timestamps(true, true)
  })
  .createTable('mtl_enviro', tbl => {
    tbl.increments() // sets to 'id' on initialize
    tbl.string('enviro', 25)
      .notNullable()
      .unique()
    tbl.string('note', 256)
    tbl.timestamps(true, true)
  })
  .createTable('mtl_container', tbl => {
    tbl.increments() // sets to 'id' on initialize
    tbl.string('container', 25)
      .notNullable()
      .unique()
    tbl.string('note', 256)
    tbl.timestamps(true, true)
  })
  .createTable('mtl_supplier', tbl => {
    tbl.increments() // sets to 'id' on initialize
    tbl.string('company', 100)
      .notNullable()
      .unique()
    tbl.string('contact', 100)
      .notNullable()
    tbl.string('email', 100)
      .notNullable()
    tbl.string('phone', 50)
      .notNullable()
    tbl.string('address', 250)
      .notNullable()
    tbl.string('note', 250)
    tbl.timestamps(true, true)
  })
  .createTable('mtl_commodity', tbl => {
    tbl.increments()
    tbl.string('commodity', 50)
      .notNullable()
      .unique()
    tbl.string('active', 5)
      .notNullable()
    tbl.string('sap', 50)
      .notNullable()
    tbl.string('inventory', 25)
      .notNullable()
    tbl.integer('threshold')
    tbl.integer('per_pallet')
      .notNullable()
    tbl.integer('unit_total')
      .notNullable()
    tbl.string('note', 250)
    tbl.timestamps(true, true)
    
    // foreign keys
    tbl.integer('uom_id') // mtl_uom
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('mtl_uom')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('type_id') //mtl_type
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('mtl_type')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('location_id') // mtl_location
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('mtl_location')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('enviro_id') // mtl_enviro
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('mtl_enviro')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('container_id') // mtl_container
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('mtl_container')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('supplier_id') // mtl_supplier
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('mtl_supplier')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};
//  knex migrate:rollback
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mtl_commodity').dropTableIfExists('mtl_uom').dropTableIfExists('mtl_type').dropTableIfExists('mtl_location').dropTableIfExists('mtl_enviro').dropTableIfExists('mtl_container').dropTableIfExists('mtl_supplier')
};

