const express = require('express')
require('../src/db/mongoose')
const userRouter = require('./router/users')

const app = express()

app.use(express.json())
app.use(userRouter)

module.exports = app