process.env.NODE_ENV != 'production' && require('dotenv').config()
const server = require('http').createServer()
const io = require('socket.io')(server)
const { newConversation } = require('./src/conversations/conversation')
 
io.on('connection', (socket) => {
    io.emit('hooked', 'stuff')
    console.log('new connection')
    socket.on('startconvo', (title) => {
        newConversation(title)
        .then(results => io.emit('convostarted', results))  
    })  
})



const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`listening on: ${PORT}`))