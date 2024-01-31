const socket = io();

const messagesDiv = document.getElementById("messages")
const myButton = document.getElementById('myButton')

socket.on('answer',(message)=>{
    messagesDiv.innerHTML += `<br/>${message}`
})



myButton.addEventListener('click',()=>{
    socket.emit('message', 'Hello server, sending message from a websocket')
})


const myInput = document.getElementById("myInput")
const log = document.getElementById("log")

myInput.addEventListener('keyup',(e)=>{
    let key = e.key; 
    myInput.value = ''
    socket.emit('keyPressed', key)
})

socket.on('log',(logFromServer)=>{
    log.innerHTML= logFromServer;
})


///----------------chat-like--------------------

const chatInput = document.getElementById("chatInput")
const chatLog = document.getElementById("chatLog")

chatInput.addEventListener('keyup',(e)=>{
    let key = e.key; 
    if(key == "Enter"){
        socket.emit('chatMessage', e.target.value)
        e.target.value = ''
    }
})

socket.on('newMessage', (messages)=>{
    chatLog.innerHTML= ""
    messages.forEach(message=>{
        chatLog.innerHTML+= `<br/> ${message.socketId}: ${message.mensaje}`
    })

})