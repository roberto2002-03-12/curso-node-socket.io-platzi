// no puedes hacer esto porque te unes al namespace general,
// cosa que para este caso no se quiere realizar esto
// const socket = io()

const user = prompt('Escribe tu usuario')

const teachers = ['Eduardo', 'Midu', 'Jason']

let socketNamespace, group

const chat = document.querySelector('#chat')
const namespace = document.querySelector('#namespace')

if(teachers.includes(user)) {
  socketNamespace = io('/teachers')
  group = 'teachers'
} else {
  socketNamespace = io('/students')
  group = 'students'
}

socketNamespace.on('connect', () => {
  namespace.textContent = group
})

// Lógica de envío de mensajes

const sendMessage = document.querySelector('#sendMessage')
sendMessage.addEventListener('click', () => {
  const message = prompt('Escribe mensaje')
  socketNamespace.emit('send message', {
    message, user
  })
})

socketNamespace.on('message', messageData => {
  const { user, message } = messageData
  const li = document.createElement('li')
  li.textContent = `${user}: ${message}`
  chat.append(li)
})
