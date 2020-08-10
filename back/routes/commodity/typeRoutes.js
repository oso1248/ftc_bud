const express = require('express')
const dbCall = require('../../models/commodity/typeQuery')

const router = express.Router()

// end points = /api/type

// create
router.post('/', (req, res) => {
  const jsonData = req.body
  dbCall.typeAdd(jsonData)
    .then(type => {
      res.status(200).json(type)
    })
    .catch(err => {
      res.status(500).json({msg: 'error adding type'})
    })
})
// read
router.get('/', (req, res) => {
  dbCall.typeFindAll()
    .then(type => {
      res.status(200).json(type)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching types'})
    })
})
router.get('/:id', (req, res) => {
  const { id } = req.params
  dbCall.typeFindById(id)
    .then(type => {
      res.status(200).json(type)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching type'})
    })
})
// update
router.patch('/:name', (req, res) => {
  const { name } = req.params
  const changes = req.body
  dbCall.typeUpdate(name, changes)
  .then(commodity => {
    res.status(200).json(commodity)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating type'})
  })
})
// delete
router.delete('/:id', (req,res) => {
  const { id } = req.params
  dbCall.typeDelete(id)
    .then(count => {
      if(count > 0){
        res.status(200).json({msg: 'type deleted'})
      } else {
        res.status(204).json({msg: 'type not found'})
      }
    })
    .catch(err => {
      res.status(500).json({mgs: 'error deleting type'})
    })
})

module.exports = router