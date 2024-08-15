// Socket.io para el lado del cliente
const socket = io()

function checkSocketStatus() {
  console.log(`Estado del socket: ${socket.connected}`)
}

// estoy atrapando eventos que envia el servidor y ejecutar funciones según el evento
// socket.on('connect', () => {
//   console.log(`El socket se ha conectado: ${socket.id}`)
//   checkSocketStatus()
// })

// esto solo funciona si muere el servidor
// socket.on('disconnect', () => {
//   checkSocketStatus()
//   console.log(`El socket se ha desconectado: ${socket.id}`)
// })

// socket.io.on('reconnect_attempt', () => {
//   console.log('Intento de conexión al servidor')
// })

// socket.io.on('reconnect', () => {
//   console.log('Conexión recuperada')
// })

// socket.io.on('connect_error', () => {
//   console.log('Falla en el intento de reconexión')
// })

// Recibir evento custom de servidor
socket.on('welcome', data => {
  const text = document.querySelector('#text')
  text.textContent = data
})

const emitToServer = document.querySelector('#emit-to-server')
emitToServer.addEventListener('click', () => {
  socket.emit('server-client', 'Se esta enviando un evento desde el cliente al servidor')
})

socket.on('emit-to-everyone', data => {
  const text = document.querySelector('#id-conn')
  text.textContent = data
})

const emitToLastConnected = document.querySelector('#emit-to-last-connected')
emitToLastConnected.addEventListener('click', () => {
  socket.emit('emit-to-last-connected', 'Evento a la última conexión')
})

socket.on('saludos', message => {
  console.log(message)
})

// socket.on: recibir eventos
// socket.one: solo recibe un evento en especifico una sola vez
// socket.off: apaga eventos para que el cliente o servidor ya deje de ejecutarlos

const listener = () => {
  console.log('Se apaga el evento')
}

socket.on('off', listener)

setTimeout(() => {
  // debes usar funciones con nombres no anonimas porque el off necesita especificación
  // para poder apagar dicho evento
  socket.off('off', listener)
}, 2000)

// socket.on: recibir eventos
// socket.one: solo recibe un evento en especifico una sola vez
// socket.off: apaga eventos para que el cliente o servidor ya deje de ejecutarlos
