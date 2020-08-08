const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

module.exports = {
  UOMadd,
  UOMfindAll,
  UOMfindById,
  UOMupdate,
  UOMdelete
}

// CRUD for each table ///////////////////////////////////

// table mtl_uom
// create
async function UOMadd(jsonData){
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
// end table mtl_uom


// end CRUD for each table ///////////////////////////////////


// add, find, find by id, remove, update -records
async function add(lesson){
  const id = await db('lessons').insert(lesson, ['lid'])
  const {lid} = id[0]
  return findById(lid)
}

function find() {
  return db('lessons')
}

function findById(id) {
  return db('lessons')
  .where({lid: id})
  .first()
}

function remove(id) {
  return db('lessons')
  .where({lid: id})
  .del()
}

function update(id, changes){
  return db('lessons')
    .where({lid: id})
    .update(changes)
    .then(() => {
      return findById(id)
    })
}

function findMessageById(id){
  return db('messages')
  .where({mid: id})
  .first()
}

async function addMessage(message){
  const id = await db('messages').insert(message, ['mid'])
  const {mid} = id[0]
  return findMessageById(mid)
}

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