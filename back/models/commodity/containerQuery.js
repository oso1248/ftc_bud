const db = require('../../db/dbConfig')

module.exports = {
  containerAdd,
  containerFindAll,
  containerFindById,
  containerUpdate,
  containerDelete,
}

// create
async function containerAdd(jsonData){
  // return await db.VERSION('mtl_uom').insert((jsonData, ['id', 'uom']))
  const rtn = await db('mtl_container').insert(jsonData, ['id'])
  const {id} = rtn[0]
  return containerFindById(id)
}
// read
function containerFindById(id) {
  return db('mtl_container')
  .where({id: id})
  .first()
}
function containerFindAll() {
  return db('mtl_container')
    .orderBy('container')
}
// update
function containerUpdate(id, changes){
  return db('mtl_container')
    .where({id: id})
    .update(changes)
    .then(() => {
    return containerFindById(id)
    })
}
// delete
function containerDelete(id) {
  return db('mtl_container')
  .where({id: id})
  .del()
}


async function addMessage(message, lesson_id) {
  return await db('messages')
  .where({ lesson_id: lesson_id })
  .insert(message, ['enter fields to return', '', ''])
}