// const knex = require('knex')
// const config = require('../knexfile')
// const db = knex(config.development)
const db = require('../db/dbConfig')

module.exports = {
  userAdd,
  userFindAll,
  userFindById
 
}

// create
async function userAdd(user) {
  const rtn = await db('users').insert(user, ['username'])
  const {username} = rtn[0]
  return userFindById(username)
}

function userFindAll() {
  return db('users')
}

function userFindById(username) {
 return db('users').where({username: username})
 .first()
}
