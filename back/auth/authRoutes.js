const express = require('express')
const dbCall = require('../models/commodity/userQuery')
const bcrypt = require('bcryptjs')

const router = express.Router()


router.post('/register', (req, res) => {
  const creds = req.body
  const { username, password, email, permissions } = creds
  if(!username || !password || !email || !permissions) {
    return res.status(400).json({msg: 'username, password, email & brewery required'})
  }
  const hash = bcrypt.hashSync(creds.password, 12)
  creds.password = hash
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
// login route
router.post('/login', (req, res) => {
  const { username, password } = req.body
  if(!username || !password) {
    return res.status(400).json({msg: 'username & password  required'})
  }
  dbCall.userFindById(username)
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        }
        res.status(200).json({msg: 'pass'})  //({msg: `Welcome ${user.username}`})
      } else {
        res.status(401).json({msg: 'fail'})
      } 
    })
    .catch(err => {
      res.status(500).json({msg: 'error logging in'})
    })
})

router.get('/logout', (req, res) => {
  
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.status(500).json({msg: 'error'})
      } else {
        res.status(200).json({msg: 'success'})
      }
    })
  } else {
    res.status(200).json({msg: 'Not logged out'})
  }
})



module.exports = router