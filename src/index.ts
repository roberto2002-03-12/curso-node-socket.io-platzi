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

// nota: los namespaces son entornos de conexión en los cuales se pueden crear salas adentro de este
// para cierto grupo de clientes conectadas al entorno

// namespace general por defecto 
// io.on('connection', socket => {

// })

// namespace especifico

// namespace: teachers
const teachers = io.of('teachers')
// namespace: students
const students = io.of('students')

teachers.on('connection', socket => {
  console.log(`${socket.id} se ha conectado a teachers`)
})

students.on('connection', socket => {
  console.log(`${socket.id} se ha conectado a students`)
})

httpServer.listen(3000)
