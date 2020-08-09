const express = require('express')
const dbCall = require('../models/locationQuery')

const router = express.Router()

// end points = /api/location

// create
router.post('/', (req, res) => {
  const jsonData = req.body
  dbCall.locationAdd(jsonData)
    .then(location => {
      res.status(200).json(location)
    })
    .catch(err => {
      res.status(500).json({msg: 'error adding locatiion'})
    })
})
// read
router.get('/', (req, res) => {
  dbCall.locationFindAll()
    .then(uom => {
      res.status(200).json(uom)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching locations'})
    })
})
router.get('/:id', (req, res) => {
  const { id } = req.params
  dbCall.locationFindById(id)
    .then(uom => {
      res.status(200).json(uom)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching location'})
    })
})
// update
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  dbCall.locationUpdate(id, changes)
  .then(uom => {
    res.status(200).json(uom)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating location'})
  })
})
// delete
router.delete('/:id', (req,res) => {
  const { id } = req.params
  dbCall.locationDelete(id)
    .then(count => {
      if(count > 0){
        res.status(200).json({msg: 'location deleted'})
      } else {
        res.status(204).json({msg: 'location not found'})
      }
    })
    .catch(err => {
      res.status(500).json({mgs: 'error deleting location'})
    })
})

module.exports = router