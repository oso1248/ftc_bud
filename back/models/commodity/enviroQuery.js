const db = require('../../db/dbConfig')

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
  const rtn = await db('mtl_enviro').insert(jsonData, ['enviro'])
  const {enviro} = rtn[0]
  return enviroFindById(enviro)
}
// read
function enviroFindById(enviro) {
  return db('mtl_enviro')
  .where({enviro: enviro})
  .first()
}
function enviroFindAll() {
  return db('mtl_enviro')
    .orderBy('enviro')
}
// update
function enviroUpdate(enviro, changes){
  return db('mtl_enviro')
    .where({enviro: enviro})
    .update(changes)
    .then(() => {
    return enviroFindById(enviro)
    })
}
// delete
function enviroDelete(enviro) {
  return db('mtl_enviro')
  .where({enviro: enviro})
  .del()
}
