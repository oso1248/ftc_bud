const express = require('express')
const dbCall = require('../../models/commodity/enviroQuery')

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
router.get('/:name', (req, res) => {
  const { name } = req.params
  dbCall.enviroFindById(name)
    .then(enviro => {
      res.status(200).json(enviro)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching enviro'})
    })
})
// update
router.patch('/:name', (req, res) => {
  const { name } = req.params
  const changes = req.body
  dbCall.enviroUpdate(name, changes)
  .then(enviro => {
    res.status(200).json(enviro)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating enviro'})
  })
})
// delete
router.delete('/:name', (req,res) => {
  const { name } = req.params
  dbCall.enviroDelete(name)
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