const express = require('express')
const dbCall = require('../../models/commodity/breweryQuery')

const router = express.Router()

// end points = /api/brewery

// create
router.post('/', (req, res) => {
  const jsonData = req.body
  dbCall.breweryAdd(jsonData)
    .then(brewery => {
      res.status(200).json(brewery)
    })
    .catch(err => {
      res.status(500).json({msg: 'error adding brewery'})
    })
})
// read
router.get('/', (req, res) => {
  dbCall.breweryFindAll()
    .then(response => {

      if(response == null) {
        res.status(200).json({username: 'Empty'})
      } else {
        res.status(200).json(response)
      }
      
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching brewery'})
    })
})
router.get('/:name', (req, res) => {
  const { name } = req.params
  dbCall.breweryFindById(name)
    .then(brewery => {
      res.status(200).json(brewery)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching brewery'})
    })
})
// update
router.patch('/:name', (req, res) => {
  const { name } = req.params
  const changes = req.body
  dbCall.breweryUpdate(name, changes)
  .then(uom => {
    res.status(200).json(uom)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating brewery'})
  })
})
// delete
router.delete('/:name', (req,res) => {
  const { name } = req.params
  dbCall.breweryDelete(name)
    .then(count => {
      if(count > 0){
        res.status(200).json({msg: 'brewery deleted'})
      } else {
        res.status(204).json({msg: 'brewery not found'})
      }
    })
    .catch(err => {
      res.status(500).json({mgs: 'error deleting brewery'})
    })
})

module.exports = router