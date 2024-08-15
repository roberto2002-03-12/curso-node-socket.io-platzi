import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, 'views')))

const socketsOnline: string[] = [];

app.get("/", (req, res) => {
  res.sendFile(__filename + "/views/index.html")
})
// on: declarar eventos que se pueden ejecutar varias veces
io.on('connection', socket => {
  // console.log(`Clientes conectadois: ${io.engine.clientsCount}`)
  // console.log(`ID socket conectado: ${socket.id}`)

  // socket.on('disconnect', () => {
  //   console.log(`El socket ${socket.id} se ha desconectado`)
  // })

  // socket.conn.once('upgrade', () => {
  //   console.log(`Se ha pasa la conexión de HTTP Long-Polling a ${socket.conn.transport.name}`)
  // })

  socketsOnline.push(socket.id)

  // emitir evento custom
  socket.emit('welcome', 'Conexión recibida')

  // con on recibes eventos con emit emites eventos
  socket.on('server-client', data => {
    console.log(data)
  })

  io.emit('emit-to-everyone', `${socket.id} se ha conectado`)

  socket.on('emit-to-last-connected', message => {
    const lastClientConnected = socketsOnline[socketsOnline.length - 1]
    // enviar eventos a clientes especificos con su id
    io.to(lastClientConnected).emit('saludos', message)
  })

  socket.emit('off', 'holi')
  setTimeout(() => {
    socket.emit('off', 'holi')
  }, 3000);
})

httpServer.listen(3000)

/*
connection, disconnect y upgrade son eventos declarados como base

*/
