const express = require('express')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')
const viewsRouter = require('./routes/views.router')

const port = 8080; 

const app = express();

app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

const server = app.listen(port, ()=>console.log(`Listenning on port ${port}`))

let log = ''
let chatMessages = []

const io = new Server(server);
io.on('connection', (socket)=>{
    console.log('connected ' + socket.id)

    socket.on('disconnect',()=>{
        console.log(`socked ${socket.id} disconnected`)
    })

    socket.on('message',(message)=>{
        console.log(message)
        socket.emit('answer', 'Hello from the server')
    })

    socket.on('keyPressed',(key)=>{
        console.log("keyPressed", key)
        log = `${log}${key}`
        io.emit('log', log)
    })

    socket.on('chatMessage',(chatMessage)=>{
        chatMessages.push({socketId: socket.id, mensaje: chatMessage})
        io.emit('newMessage', chatMessages)
    })

    socket.emit('newMessage', chatMessages)
})