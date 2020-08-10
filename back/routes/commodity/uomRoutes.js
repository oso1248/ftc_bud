const express = require('express')
const dbCall = require('../../models/commodity/uomQuery')

const router = express.Router()

// end points = /api/uom

// create
router.post('/', (req, res) => {
  const jsonData = req.body
  dbCall.UOMadd(jsonData)
    .then(uom => {
      res.status(200).json(uom)
    })
    .catch(err => {
      res.status(500).json({msg: 'error adding UOM'})
    })
})
// read
router.get('/', (req, res) => {
  dbCall.UOMfindAll()
    .then(uom => {
      res.status(200).json(uom)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching UOMs'})
    })
})
router.get('/:name', (req, res) => {
  const { name } = req.params
  dbCall.UOMfindById(name)
    .then(uom => {
      res.status(200).json(uom)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching UOM'})
    })
})
// update
router.patch('/:name', (req, res) => {
  const { name } = req.params
  const changes = req.body
  dbCall.UOMupdate(name, changes)
  .then(uom => {
    res.status(200).json(uom)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating UOM'})
  })
})
// delete
router.delete('/:name', (req,res) => {
  const { name } = req.params
  dbCall.UOMdelete(name)
    .then(count => {
      if(count > 0){
        res.status(200).json({msg: 'UOM deleted'})
      } else {
        res.status(204).json({msg: 'UOM not found'})
      }
    })
    .catch(err => {
      res.status(500).json({mgs: 'error deleting UOM'})
    })
})

module.exports = router