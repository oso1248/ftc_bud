const db = require('../../db/dbConfig')

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


