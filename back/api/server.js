const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const cors = require('cors')


const morgan = require('morgan') // remove for production dev dependency


const authRouter = require('../auth/authRoutes')
const userRouter = require('../routes/userRoutes')
const uomRouter = require('../routes/uomRoutes')
const enviroRouter = require('../routes/enviroRoutes')
const locationRouter = require('../routes/locationRoutes')
const containerRouter = require('../routes/containerRoutes')
const supplierRouter = require('../routes/supplierRoutes')
const restricted = require('../auth/restrictedMiddlewear')


const sessionConfig = {
  name: 'budApp',
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // for production set to true for https only
    httpOnly: true, // true means no access from javascript
  },
  resave: false,
  saveUninitialized: true //false for prod for GDPR laws, eu law user consent for cookie
}


const server = express()
server.use(express.json())
server.use(helmet())
server.use(morgan('dev')) // remove for production dev dependency
server.use(cors())
server.use(session(sessionConfig))


server.get('/', (req, res) => {
  res.json({message: 'hello world'})
})


server.use('/api/auth', authRouter)
server.use('/api/user', restricted, userRouter)
server.use('/api/uom', restricted, uomRouter)
server.use('/api/enviro', restricted, enviroRouter)
server.use('/api/location', restricted, locationRouter)
server.use('/api/container', restricted, containerRouter)
server.use('/api/supplier', restricted, supplierRouter)


module.exports = server