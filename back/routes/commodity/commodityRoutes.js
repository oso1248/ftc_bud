const express = require('express')
const dbCall = require('../../models/commodity/commodityQuery')

const router = express.Router()

// end points = /api/commodity

// create
router.post('/', (req, res) => {
  const jsonData = req.body
  dbCall.commodityAdd(jsonData)
    .then(commodity => {
      res.status(200).json(commodity)
    })
    .catch(err => {
      res.status(500).json({msg: 'error adding commodity'})
    })
})
// read
router.get('/', (req, res) => {
  dbCall.commodityFindAll()
    .then(commodity => {
      res.status(200).json(commodity)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching commodity'})
    })
})
router.get('/:id', (req, res) => {
  const { id } = req.params
  dbCall.commodityFindById(id)
    .then(commodity => {
      res.status(200).json(commodity)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching commodity'})
    })
})
// update
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  dbCall.commodityUpdate(id, changes)
  .then(commodity => {
    res.status(200).json(commodity)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating commodity'})
  })
})
// delete
router.delete('/:id', (req,res) => {
  const { id } = req.params
  dbCall.commodityDelete(id)
    .then(count => {
      if(count > 0){
        res.status(200).json({msg: 'commodity deleted'})
      } else {
        res.status(204).json({msg: 'commodity not found'})
      }
    })
    .catch(err => {
      res.status(500).json({mgs: 'error deleting commodity'})
    })
})

module.exports = router