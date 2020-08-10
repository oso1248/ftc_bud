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
  const rtn = await db('mtl_uom').insert(jsonData, ['uom'])
  const {uom} = rtn[0]
  return UOMfindById(uom)
}
// read
function UOMfindById(uom) {
  return db('mtl_uom')
  .where({uom: uom})
  .first()
}
function UOMfindAll() {
  return db('mtl_uom')
    .orderBy('uom')
}
// update
function UOMupdate(uom, changes){
  return db('mtl_uom')
    .where({uom: uom})
    .update(changes)
    .then(() => {
    return UOMfindById(uom)
    })
}
// delete
function UOMdelete(uom) {
  return db('mtl_uom')
  .where({uom: uom})
  .del()
}


