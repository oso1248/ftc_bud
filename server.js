const express = require('express')
const server = express()
const PORT = process.env.PORT || 5000
const dbCall = require('./back/models/dbAPI')

// Start server
server.use(express.json())
server.listen(PORT, () => {
  console.log(`\n\n***Server listening on port: ${PORT}***\n\n`)
})


// UOM CRUD
// create
server.post('/api/uom', (req, res) => {
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
server.get('/api/uom', (req, res) => {
  dbCall.UOMfindAll()
    .then(uom => {
      res.status(200).json(uom)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching UOMs'})
    })
})
server.get('/api/uom/:id', (req, res) => {
  const { id } = req.params
  dbCall.UOMfindById(id)
    .then(uom => {
      res.status(200).json(uom)
    })
    .catch(err => {
      res.status(500).json({mgs: 'error fetching UOM'})
    })
})
// update
server.patch('/api/uom/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  dbCall.UOMupdate(id, changes)
  .then(uom => {
    res.status(200).json(uom)
  })
  .catch(err => {
    res.status(500).json({mgs: 'error updating UOM'})
  })
})
// delete
server.delete('/api/uom/:id', (req,res) => {
  const { id } = req.params
  dbCall.UOMdelete(id)
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






// test server in browser
server.get('/', (req, res) => {
  res.json({message: 'hello world'})
})