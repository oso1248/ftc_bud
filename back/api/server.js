const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const cors = require('cors')


const path = require('path')


// const morgan = require('morgan') // remove for production dev dependency


const authRouter = require('../auth/authRoutes')
const userRouter = require('../routes/commodity/userRoutes')
const uomRouter = require('../routes/commodity/uomRoutes')
const enviroRouter = require('../routes/commodity/enviroRoutes')
const locationRouter = require('../routes/commodity/locationRoutes')
const containerRouter = require('../routes/commodity/containerRoutes')
const supplierRouter = require('../routes/commodity/supplierRoutes')
const commodityRouter = require('../routes/commodity/commodityRoutes')
const typeRouter = require('../routes/commodity/typeRoutes')
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
// server.use(morgan('dev')) // remove for production dev dependency
server.use(cors())
server.use(session(sessionConfig))

server.use(express.static(path.join(__dirname, '../../front/client')))
// server.get('/', (req, res) => {
//   res.json({message: 'hello world'})
// })


server.use('/api/auth', authRouter)
server.use('/api/user', restricted, userRouter)
server.use('/api/uom', restricted, uomRouter)
server.use('/api/enviro', restricted, enviroRouter)
server.use('/api/location', restricted, locationRouter)
server.use('/api/container', restricted, containerRouter)
server.use('/api/supplier', restricted, supplierRouter)
server.use('/api/commodity', restricted, commodityRouter)
server.use('/api/type', restricted, typeRouter)


module.exports = server