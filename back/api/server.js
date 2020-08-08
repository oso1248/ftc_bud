const express = require('express')
const server = express()

const uomRouter = require('../routes/uomRoutes')


server.use(express.json())

server.get('/', (req, res) => {
  res.json({message: 'hello world'})
})


server.use('/api/uom', uomRouter)


module.exports = server