const express = require('express')
const dbCall = require('../../models/commodity/locationQuery')

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
router.get('/:name', (req, res) => {
  const { name } = req.params
  dbCall.locationFindById(name)
    .then(location => {
      res.status(200).json(location)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching location'})
    })
})
// update
router.patch('/:name', (req, res) => {
  const { name } = req.params
  const changes = req.body
  dbCall.locationUpdate(name, changes)
  .then(uom => {
    res.status(200).json(uom)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating location'})
  })
})
// delete
router.delete('/:name', (req,res) => {
  const { name } = req.params
  dbCall.locationDelete(name)
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