const db = require('../../db/dbConfig')

module.exports = {
  containerAdd,
  containerFindAll,
  containerFindById,
  containerUpdate,
  containerDelete,
}

// create
async function containerAdd(jsonData){
  // return await db.VERSION('mtl_uom').insert((jsonData, ['id', 'uom']))
  const rtn = await db('mtl_container').insert(jsonData, ['container'])
  const { container } = rtn[0]
  return containerFindById(container)
}
// read
function containerFindById(container) {
  return db('mtl_container')
  .where({container: container})
  .first()
}
function containerFindAll() {
  return db('mtl_container')
    .orderBy('container')
}
// update
function containerUpdate(container, changes){
  return db('mtl_container')
    .where({container: container})
    .update(changes)
    .then(() => {
    return containerFindById(container)
    })
}
// delete
function containerDelete(container) {
  return db('mtl_container')
  .where({container: container})
  .del()
}
