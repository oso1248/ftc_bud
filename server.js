const express = require('express')
const server = express()
const PORT = process.env.PORT || 5000

server.use(express.json())
server.listen(PORT, () => {
  console.log(`\n\n***Server listening on port: ${PORT}***\n\n`)
})

// test server in browser
server.get('/', (req, res) => {
  res.json({message: 'hello world'})
})