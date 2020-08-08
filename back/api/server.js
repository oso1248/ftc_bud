const express = require('express')
const server = express()

const uomRouter = require('../routes/uomRoutes')
const userRouter = require('../routes/userRoutes')


server.use(express.json())

server.get('/', (req, res) => {
  res.json({message: 'hello world'})
})


server.use('/api/uom', uomRouter)
server.use('/api/user', userRouter)


module.exports = server