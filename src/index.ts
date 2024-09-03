import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, 'views')))

app.get("/", (req, res) => {
  res.sendFile(__filename + "/views/index.html")
})

io.on('connection', socket => {
  socket.on('is connected', data => {
    console.log({ data })
  })
})

httpServer.listen(3000)
