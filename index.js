require('dotenv').config()

const server = require('./back/api/server')

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`\n\n***Server listening on port: ${PORT}***\n\n`)
})

