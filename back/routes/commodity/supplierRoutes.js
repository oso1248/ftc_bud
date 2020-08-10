const express = require('express')
const dbCall = require('../../models/commodity/supplierQuery')

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
router.get('/:name', (req, res) => {
  const { name } = req.params
  dbCall.supplierFindById(name)
    .then(supplier => {
      res.status(200).json(supplier)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching supplier'})
    })
})
// update
router.patch('/:name', (req, res) => {
  const { name } = req.params
  const changes = req.body
  dbCall.supplierUpdate(name, changes)
  .then(supplier => {
    res.status(200).json(supplier)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating supplier'})
  })
})
// delete
router.delete('/:name', (req,res) => {
  const { name } = req.params
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