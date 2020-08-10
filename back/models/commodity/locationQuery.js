const db = require('../../db/dbConfig')

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
  const rtn = await db('mtl_location').insert(jsonData, ['location'])
  const {location} = rtn[0]
  return locationFindById(location)
}
// read
function locationFindById(location) {
  return db('mtl_location')
  .where({location: location})
  .first()
}
function locationFindAll() {
  return db('mtl_location')
    .orderBy('location')
}
// update
function locationUpdate(location, changes){
  return db('mtl_location')
    .where({location: location})
    .update(changes)
    .then(() => {
    return locationFindById(location)
    })
}
// delete
function locationDelete(location) {
  return db('mtl_location')
  .where({location: location})
  .del()
}
