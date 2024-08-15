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