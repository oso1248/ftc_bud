const express = require('express')
const dbCall = require('../../models/commodity/userQuery')

const router = express.Router()


router.get('/', (req, res) => {
  dbCall.userFindAll()
    .then(response => {
      if(response == null) {
        res.status(200).json({username: 'Empty'})
      } else {
        res.status(200).json(response)
      }

    })
    .catch(err => {
      res.status(500).json({msg: 'error fetching users'})
    })
})

router.get('/:username', (req, res) => {
  const { username } = req.params
  dbCall.userFindById(username)
    .then(response => {
      if(response == null) {
        res.status(200).json({username: 'Empty'})
      } else {
        res.status(200).json(response)
      }
    })
    .catch(err => {
      res.status(500).json({msg: 'error fetching user'})
    })
})

router.patch('/:name', (req, res) => {
  const { name } = req.params
  const changes = req.body
  dbCall.userUpdate(name, changes)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating supplier'})
  })
})

module.exports = router