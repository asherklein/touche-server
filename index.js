process.env.NODE_ENV != 'production' && require('dotenv').config()
const server = require('http').createServer()
const io = require('socket.io')(server)
const socketioauth = require('socketio-auth') 

const { validUser } = require('./src/users/auth')
// const { myConvos } = require('./src/conversations/conversation')
const { getMessages } = require('./src/conversations/message')
const { startConvo, startNewPoint, sendMessage, sendAttack, supportAttack } = require('./src/gameplay/gameplay')
const { 
    isEmpty, head,
    is
 } = require('ramda')

const authenticate = (socket, { user_id, secret }, fn) => {
    
    validUser(user_id, secret).then(res => isEmpty(res) ? fn(new Error('Bad')) : fn(null, head(res)))
}

const postAuthenticate = (socket) => {
// io.on('connection', (socket) => {

     
    const push = (type, confirm) => (results) => {
        io.emit(type, results)
        is(Function, confirm) && confirm(results)
    }
    const respond = (type, confirm) => (results) => {
        socket.emit(type, results)
        is(Function, confirm) && confirm(results)
    }

    console.log('new connection')
    // initial setup
    // myConvos().then(respond('convolist'))
    getMessages().then(respond('initmsgs'))

    // socket.on('getmessages', (convo, confirm) => {
    //     console.log(convo)
    //     getMessagesForConvo(convo).then(res => {
    //         console.log('res', res)
        
    //         confirm(res)
    //     }) 
    // })

    // startconvo => convostarted
    socket.on('startconvo', (title, initial, confirm) => {
        console.log('initial', initial)
        startConvo(title, initial)
        .then(push('convostarted', confirm))  
    })
    
    // startpoint => pointstarted
    // convo :: convo_id
    // title :: String
    // initial :: message_id
    socket.on('startpoint', (convo, title, initial) => {
        startNewPoint(convo, title, inital)
        .then(push('pointstarted'))  
    })

    // sendsimple => simplesent
    // point :: point_id
    // content :: String
    // sentBy :: user_id
    // sentAt :: timestamp
    socket.on('sendsimple', (point, content, sentBy, sentAt) => {
        sendMessage(point, sentBy, sentAt, content)
        .then(push('simplesent'))  
    })

    // sendattack => attacksent
    // point :: point_id
    // content :: String
    // sentBy :: user_id
    // to :: message_id (the original message this attack is on)
    // sentAt :: timestamp
    socket.on('sendattack', (point, content, sentBy, to, sentAt) => {
        sendAttack(point, sentBy, sentAt, content, to)
        .then(push('attacksent'))  
    })

    // support => supported
    // (from, to) :: attack_id
    // by :: user_id
    socket.on('support', (from, to, by) => {
        supportAttack(from, to, by, 1)
        .then(push('supported'))  
    })

    // oppose => opposed
    // (from, to) :: attack_id
    // by :: user_id
    socket.on('oppose', (from, to, by) => {
        supportAttack(from, to, by, -1)
        .then(push('opposed'))  
    })

}
// ) 

//support / oppose
socketioauth(io, { authenticate, postAuthenticate })

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`listening on: ${PORT}`))