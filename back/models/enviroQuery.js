const db = require('../db/dbConfig')

module.exports = {
  enviroAdd,
  enviroFindAll,
  enviroFindById,
  enviroUpdate,
  enviroDelete,
}

// create
async function enviroAdd(jsonData){
  // return await db.VERSION('mtl_uom').insert((jsonData, ['id', 'uom']))
  const rtn = await db('mtl_enviro').insert(jsonData, ['id'])
  const {id} = rtn[0]
  return enviroFindById(id)
}
// read
function enviroFindById(id) {
  return db('mtl_enviro')
  .where({id: id})
  .first()
}
function enviroFindAll() {
  return db('mtl_enviro')
    .orderBy('enviro')
}
// update
function enviroUpdate(id, changes){
  return db('mtl_enviro')
    .where({id: id})
    .update(changes)
    .then(() => {
    return enviroFindById(id)
    })
}
// delete
function enviroDelete(id) {
  return db('mtl_location')
  .where({id: id})
  .del()
}


async function addMessage(message, lesson_id) {
  return await db('messages')
  .where({ lesson_id: lesson_id })
  .insert(message, ['enter fields to return', '', ''])
}