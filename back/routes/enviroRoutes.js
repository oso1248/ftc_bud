const express = require('express')
const dbCall = require('../models/enviroQuery')

const router = express.Router()

// end points = /api/enviro

// create
router.post('/', (req, res) => {
  const jsonData = req.body
  dbCall.enviroAdd(jsonData)
    .then(enviro => {
      res.status(200).json(enviro)
    })
    .catch(err => {
      res.status(500).json({msg: 'error adding enviro'})
    })
})
// read
router.get('/', (req, res) => {
  dbCall.enviroFindAll()
    .then(enviro => {
      res.status(200).json(enviro)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching enviro'})
    })
})
router.get('/:id', (req, res) => {
  const { id } = req.params
  dbCall.enviroFindById(id)
    .then(enviro => {
      res.status(200).json(enviro)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching enviro'})
    })
})
// update
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  dbCall.enviroUpdate(id, changes)
  .then(enviro => {
    res.status(200).json(enviro)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating enviro'})
  })
})
// delete
router.delete('/:id', (req,res) => {
  const { id } = req.params
  dbCall.enviroDelete(id)
    .then(count => {
      if(count > 0){
        res.status(200).json({msg: 'enviro deleted'})
      } else {
        res.status(204).json({msg: 'enviro not found'})
      }
    })
    .catch(err => {
      res.status(500).json({mgs: 'error deleting enviro'})
    })
})

module.exports = router