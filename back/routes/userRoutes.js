const express = require('express')
const dbCall = require('../models/userQuery')

const router = express.Router()

router.post('/register', (req, res) => {
  const creds = req.body
  const { username, password, email } = creds
  console.log(username, password, email)
  if(!username || !password || !email) {
    return res.status(400).json({msg: 'username, password & email required'})
  }
  dbCall.userAdd(creds)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      if(err.errno = 23505) {
        res.status(400).json({msg: 'username already exists'})  
      } else {
        res.status(500).json({msg: 'error adding user'})
      }
    })
})

router.get('/', (req, res) => {
  dbCall.userFindAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({msg: 'errof fetching users'})
    })
})



module.exports = router