// Socket.io para el lado del cliente
const socket = io()

// Botones de conexión
const connectRoom1 = document.querySelector('#connectRoom1')
const connectRoom2 = document.querySelector('#connectRoom2')
const connectRoom3 = document.querySelector('#connectRoom3')

connectRoom1.addEventListener('click', () => {
  socket.emit('connect to room', 'room1')
})
connectRoom2.addEventListener('click', () => {
  socket.emit('connect to room', 'room2')
})
connectRoom3.addEventListener('click', () => {
  socket.emit('connect to room', 'room3')
})

// Enviar mensaje

const sendMessage = document.querySelector('#sendMessage')

sendMessage.addEventListener('click', () => {
  // mostrar mini ventana para ingresar valor
  const message = prompt('Escribe mensaje')

  socket.emit('message', message)
})

socket.on('send message', data => {
  const { room, message } = data

  const li = document.createElement('li')
  li.textContent = message

  document.querySelector(`#${room}`).append(li)
})