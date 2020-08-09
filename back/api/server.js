const express = require('express')
const server = express()
const session = require('express-session')

const uomRouter = require('../routes/uomRoutes')
const userRouter = require('../routes/userRoutes')
const authRouter = require('../auth/authRoutes')
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
  saveUninitialized: true //false for prod for GDPR laws eu law user consent for cookie
}


server.use(express.json())
server.use(session(sessionConfig))

server.get('/', (req, res) => {
  res.json({message: 'hello world'})
})


server.use('/api/auth', authRouter)
server.use('/api/uom', restricted, uomRouter)
server.use('/api/user', restricted, userRouter)



module.exports = server