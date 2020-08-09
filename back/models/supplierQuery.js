const db = require('../db/dbConfig')

module.exports = {
  supplierAdd,
  supplierFindAll,
  supplierFindById,
  supplierUpdate,
  supplierDelete,
}

// create
async function supplierAdd(jsonData){
  // return await db.VERSION('mtl_uom').insert((jsonData, ['id', 'uom']))
  const rtn = await db('mtl_supplier').insert(jsonData, ['id'])
  const {id} = rtn[0]
  return supplierFindById(id)
}
// read
function supplierFindById(id) {
  return db('mtl_supplier')
  .where({id: id})
  .first()
}
function supplierFindAll() {
  return db('mtl_supplier')
    .orderBy('company')
}
// update
function supplierUpdate(id, changes){
  return db('mtl_supplier')
    .where({id: id})
    .update(changes)
    .then(() => {
    return supplierFindById(id)
    })
}
// delete
function supplierDelete(id) {
  return db('mtl_location')
  .where({id: id})
  .del()
}


async function addMessage(message, lesson_id) {
  return await db('messages')
  .where({ lesson_id: lesson_id })
  .insert(message, ['enter fields to return', '', ''])
}