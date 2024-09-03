const socket = io()

const send = document.querySelector('#send')
const disconnect = document.querySelector('#disconnect')
const connect = document.querySelector('#connect')

send.addEventListener('click', () => {
  // evita cargar varios procesos en el buffer en el caso de desconexión
  if(socket.connected)
    socket.emit('is connected', '¡Está conectado!')
})

disconnect.addEventListener('click', () => {
  socket.disconnect()
})

connect.addEventListener('click', () => {
  socket.connect()
})