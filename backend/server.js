const express = require('express')
const config = require('./src/config')
const router = require('./src/routes')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.Server(app)
const io = socketio(server)

const connectedUsers = {}

io.on('connection', socket => {
  const { user_id } = socket.handshake.query

  connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers
  return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, 'uploads')))
app.use('/api', router)

server.listen(config.port, err => {
  err
    ? console.log('Could not start the server.')
    : console.log(`Server is running on: http://localhost:${config.port}/api`)
})
