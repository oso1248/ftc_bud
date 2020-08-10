const express = require('express')
const dbCall = require('../../models/commodity/containerQuery')

const router = express.Router()

// end points = /api/container

// create
router.post('/', (req, res) => {
  const jsonData = req.body
  dbCall.containerAdd(jsonData)
    .then(container => {
      res.status(200).json(container)
    })
    .catch(err => {
      res.status(500).json({msg: 'error adding container'})
    })
})
// read
router.get('/', (req, res) => {
  dbCall.containerFindAll()
    .then(container => {
      res.status(200).json(container)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching container'})
    })
})
router.get('/:name', (req, res) => {
  const { name } = req.params
  dbCall.containerFindById(name)
    .then(container => {
      res.status(200).json(container)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching container'})
    })
})
// update
router.patch('/:name', (req, res) => {
  const { name } = req.params
  const changes = req.body
  dbCall.containerUpdate(name, changes)
  .then(container => {
    res.status(200).json(container)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating container'})
  })
})
// delete
router.delete('/:name', (req, res) => {
  const { name } = req.params
  dbCall.containerDelete(name)
    .then(count => {
      if(count > 0){
        res.status(200).json({msg: 'container deleted'})
      } else {
        res.status(204).json({msg: 'container not found'})
      }
    })
    .catch(err => {
      res.status(500).json({mgs: 'error deleting container'})
    })
})

module.exports = router