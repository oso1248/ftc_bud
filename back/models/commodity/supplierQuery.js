const db = require('../../db/dbConfig')

module.exports = {
  supplierAdd,
  supplierFindAll,
  supplierFindById,
  supplierUpdate,
  supplierDelete,
}


// create
async function supplierAdd(jsonData){
  // return await db.VERSION('mtl_uom').insert((jsonData, ['id', 'uom']))
  const rtn = await db('mtl_supplier').insert(jsonData, ['company'])
  const {company} = rtn[0]
  return supplierFindById(company)
}
// read
function supplierFindById(company) {
  return db('mtl_supplier')
  .where({company: company})
  .first()
}
function supplierFindAll() {
  return db('mtl_supplier')
    .select('company', 'contact', 'email', 'phone', 'address', 'note')
    .orderBy('company')
}

// update
function supplierUpdate(company, changes){
  return db('mtl_supplier')
    .where({company: company})
    .update(changes)
    .then(() => {
    return supplierFindById(company)
    })
}
// delete
function supplierDelete(company) {
  return db('mtl_location')
  .where({company: company})
  .del()
}


async function addMessage(message, lesson_id) {
  return await db('messages')
  .where({ lesson_id: lesson_id })
  .insert(message, ['enter fields to return', '', ''])
}