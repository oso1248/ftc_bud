const db = require('../db/dbConfig')

module.exports = {
  locationAdd,
  locationFindAll,
  locationFindById,
  locationUpdate,
  locationDelete,
}

// create
async function locationAdd(jsonData){
  // return await db.VERSION('mtl_uom').insert((jsonData, ['id', 'uom']))
  const rtn = await db('mtl_location').insert(jsonData, ['id'])
  const {id} = rtn[0]
  return locationFindById(id)
}
// read
function locationFindById(id) {
  return db('mtl_location')
  .where({id: id})
  .first()
}
function locationFindAll() {
  return db('mtl_location')
    .orderBy('location')
}
// update
function locationUpdate(id, changes){
  return db('mtl_location')
    .where({id: id})
    .update(changes)
    .then(() => {
    return locationFindById(id)
    })
}
// delete
function locationDelete(id) {
  return db('mtl_location')
  .where({id: id})
  .del()
}


async function addMessage(message, lesson_id) {
  return await db('messages')
  .where({ lesson_id: lesson_id })
  .insert(message, ['enter fields to return', '', ''])
}