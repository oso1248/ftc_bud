const express = require('express')
const dbCall = require('../../models/commodity/userQuery')

const router = express.Router()


router.get('/', (req, res) => {
  dbCall.userFindAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({msg: 'errof fetching users'})
    })
})

router.get('/:username', (req, res) => {
  const { username } = req.params
  dbCall.userFindById(username)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({msg: 'error fetching user'})
    })
})

module.exports = router