const db = require('../../db/dbConfig')

module.exports = {
  typeAdd,
  typeFindAll,
  typeFindById,
  typeUpdate,
  typeDelete,
}

// create
async function typeAdd(jsonData){
  // return await db.VERSION('mtl_uom').insert((jsonData, ['id', 'uom']))
  const rtn = await db('mtl_type').insert(jsonData, ['id'])
  const {id} = rtn[0]
  return typeFindById(id)
}
// read
function typeFindById(id) {
  return db('mtl_type')
  .where({id: id})
  .first()
}
function typeFindAll() {
  return db('mtl_type')
    .orderBy('type')
}
// update
function typeUpdate(id, changes){
  return db('mtl_type')
    .where({id: id})
    .update(changes)
    .then(() => {
    return typeFindById(id)
    })
}
// delete
function typeDelete(id) {
  return db('mtl_type')
  .where({id: id})
  .del()
}


async function addMessage(message, lesson_id) {
  return await db('messages')
  .where({ lesson_id: lesson_id })
  .insert(message, ['enter fields to return', '', ''])
}