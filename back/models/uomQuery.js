const db = require('../db/dbConfig')

module.exports = {
  UOMadd,
  UOMfindAll,
  UOMfindById,
  UOMupdate,
  UOMdelete
}

// create
async function UOMadd(jsonData){
  // return await db.VERSION('mtl_uom').insert((jsonData, ['id', 'uom']))
  const rtn = await db('mtl_uom').insert(jsonData, ['id'])
  const {id} = rtn[0]
  return UOMfindById(id)
}
// read
function UOMfindById(id) {
  return db('mtl_uom')
  .where({id: id})
  .first()
}
function UOMfindAll() {
  return db('mtl_uom')
    .orderBy('uom')
}
// update
function UOMupdate(id, changes){
  return db('mtl_uom')
    .where({id: id})
    .update(changes)
    .then(() => {
    return UOMfindById(id)
    })
}
// delete
function UOMdelete(id) {
  return db('mtl_uom')
  .where({id: id})
  .del()
}


async function addMessage(message, lesson_id) {
  return await db('messages')
  .where({ lesson_id })
  .insert(message, ['enter fields to return', '', ''])
}

// example of join
function getMessages(lesson_id){
  console.log(lesson_id)
  return db('lessons as l')
  .join('messages as m', 'l.lid', '=', 'm.lid')
  .select(
    'l.lid as LessonID',
    'l.name as LessonName',
    'm.mid as MessageID',
    'm.sender as Sender',
    'm.text as Message'
  )
  .where('m.lid', lesson_id)
}