const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const createButton = document.getElementById('new-room')


if(messageForm != null){
    const name = prompt("What is your name?")
    appendMessage("You joined")
    socket.emit('new-user', roomName, name)

    messageForm.addEventListener('submit', e => {
        e.preventDefault() // preventDefault() prevents the added `eventListener` from working
        const message = messageInput.value
        if(message){
            socket.emit('send-chat-message', roomName, message)
            appendMessage(`${message}`,"me")
            messageInput.value = ''
        }
    })
} 



socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = "Join"
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
    if(data.message)
        appendMessage(`${data.name}: ${data.message}`,"sender")
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`, "sender")
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`,"sender")
})



function appendMessage(message, sender="me"){
    const messageElement = document.createElement('div')
    const messageElementContainer = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('chat')
    messageElementContainer.append(messageElement)
    messageContainer.append(messageElementContainer)
    if(sender=="me"){
        messageElement.style.backgroundColor = '#CCC';
        messageElement.style.margin = '10px';
        messageElementContainer.style.display = 'flex'
        messageElementContainer.style.justifyContent = 'flex-end'
    }   
    else{
        messageElement.style.backgroundColor = '#4CAF50';
        messageElement.style.margin = '10px';
        messageElementContainer.style.display = 'flex'
        messageElementContainer.style.justifyContent = 'flex-start'
        messageElement.style.color = 'white'
    }
        
}