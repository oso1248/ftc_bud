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
  const rtn = await db('mtl_type').insert(jsonData, ['type'])
  const {type} = rtn[0]
  return typeFindById(type)
}
// read
function typeFindById(type) {
  return db('mtl_type')
  .where({type: type})
  .first()
}
function typeFindAll() {
  return db('mtl_type')
    .orderBy('type')
}
// update
function typeUpdate(type, changes){
  return db('mtl_type')
    .where({type: type})
    .update(changes)
    .then(() => {
    return typeFindById(type)
    })
}
// delete
function typeDelete(type) {
  return db('mtl_type')
  .where({type: type})
  .del()
}


async function addMessage(message, lesson_id) {
  return await db('messages')
  .where({ lesson_id: lesson_id })
  .insert(message, ['enter fields to return', '', ''])
}