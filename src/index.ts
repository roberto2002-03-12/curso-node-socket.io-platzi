import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, 'views')))

const socketsOnline: string[] = [];

app.get("/", (req, res) => {
  res.sendFile(__filename + "/views/index.html")
})

interface CustomSocket extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
  connectedRoom?: string
}

io.on('connection', (socket: CustomSocket) => {
  socket.connectedRoom = ''

  socket.on('connect to room', room => {
    socket.leave(socket.connectedRoom ?? 'grupo anonimo')
    socket.join(room)
    socket.connectedRoom = room
  })

  socket.on('message', message => {
    const room = socket.connectedRoom
    io.to(room ?? 'grupo anonimo').emit('send message', {
      message,
      room
    })
  })
})

httpServer.listen(3000)
