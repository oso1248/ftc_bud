// const knex = require('knex')
// const config = require('../knexfile')
// const db = knex(config.development)
const db = require('../../db/dbConfig')

module.exports = {
  userAdd,
  userFindAll,
  userFindById,
  userUpdate
}

async function brewery(jsonData){
  let rtn = await db('brewery').select('id').where('brewery', jsonData['brewery_id'])
  let {id} = rtn[0]
  jsonData['brewery_id'] = id
  return jsonData
}

// create
async function userAdd(user) {
  await brewery(user)
  const rtn = await db('users').insert(user, ['username'])
  const {username} = rtn[0]
  const add = await userFindById(username)
  if(add !== null) {
    return({msg: 'User Added'})
  } else {
    return({msg: 'User Not Added'})
  }
}

// read
function userFindAll() {
  return db('users as use')
    .join('brewery as brew', 'brew.id', '=', 'use.brewery_id')
    .select('use.username', 'use.email', 'use.permissions', 'brew.brewery')
    .orderBy('use.username')
}

function userFindById(username) {
 return db('users').where({username: username})
  .first()
//  return db('users as use')
//   .join('brewery as brew', 'brew.id', '=', 'use.brewery_id')
//   .select('use.username', 'use.email', 'use.permissions', 'brew.brewery')
//   .where({username: username})
}

// update
async function userUpdate(user, changes){
  await brewery(changes)
  return db('users')
    .where({username: user})
    .update(changes)
    .then(() => {
    return userFindById(user)
    })
  }