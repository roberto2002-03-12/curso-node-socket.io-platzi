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
// on: declarar eventos que se pueden ejecutar varias veces
io.on('connection', socket => {

  socket.on('circle position', position => {
    // emitir evento a todos los clientes excepto al que llama el servidor
    socket.broadcast.emit('move circle', position)
  })

})

httpServer.listen(3000)
