const db = require('../../db/dbConfig')

module.exports = {
  breweryAdd,
  breweryFindAll,
  breweryFindById,
  breweryUpdate,
  breweryDelete,
}

// create
async function breweryAdd(jsonData){
  const rtn = await db('brewery').insert(jsonData, ['brewery'])
  const {brewery} = rtn[0]
  return breweryFindById(brewery)
}
// read
function breweryFindById(brewery) {
  return db('brewery')
  .where({brewery: brewery})
  .first()
}
function breweryFindAll() {
  return db('brewery')
    .orderBy('brewery')
}
// update
function breweryUpdate(brewery, changes){
  return db('brewery')
    .where({brewery: brewery})
    .update(changes)
    .then(() => {
    return breweryFindById(brewery)
    })
}
// delete
function breweryDelete(brewery) {
  return db('brewery')
  .where({brewery: brewery})
  .del()
}
