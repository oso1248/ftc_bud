const express = require('express')
const dbCall = require('../models/supplierQuery')

const router = express.Router()

// end points = /api/supplier

// create
router.post('/', (req, res) => {
  const jsonData = req.body
  dbCall.supplierAdd(jsonData)
    .then(supplier => {
      res.status(200).json(supplier)
    })
    .catch(err => {
      res.status(500).json({msg: 'error adding supplier'})
    })
})
// read
router.get('/', (req, res) => {
  dbCall.supplierFindAll()
    .then(supplier => {
      res.status(200).json(supplier)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching supplier'})
    })
})
router.get('/:id', (req, res) => {
  const { id } = req.params
  dbCall.supplierFindById(id)
    .then(supplier => {
      res.status(200).json(supplier)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching supplier'})
    })
})
// update
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  dbCall.supplierUpdate(id, changes)
  .then(supplier => {
    res.status(200).json(supplier)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating supplier'})
  })
})
// delete
router.delete('/:id', (req,res) => {
  const { id } = req.params
  dbCall.supplierDelete(id)
    .then(count => {
      if(count > 0){
        res.status(200).json({msg: 'supplier deleted'})
      } else {
        res.status(204).json({msg: 'supplier not found'})
      }
    })
    .catch(err => {
      res.status(500).json({mgs: 'error deleting supplier'})
    })
})

module.exports = router