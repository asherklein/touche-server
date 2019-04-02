const mysql = require('../config/mysql')
// const { groupBy } = require('ramda')

const createMessage = (sent_by, content) => {
    const query = `INSERT INTO messages(sent_by, content) VALUES (${sent_by}, '${content}')`
    return mysql.query(query)
        .then(({ insertId: message_id }) => ({ message_id, sent_by, content }))
}

const getMessagesForConvo = (convo_id) => {
    const query = `SELECT * FROM messages AS M, message_on_point AS MOP, points AS P, conversations AS C 
    WHERE M.id = MOP.message_id 
    AND MOP.point_id = P.id
    AND P.convo_id = C.id
    AND C.id = ${convo_id}`
    
    return mysql.query(query)
        .then(rows =>
            rows.map(({ id: message_id, ...rest }) =>
                ({ message_id, ...rest }))
        )
}

// groupBy(prop())

const getMessages = (convo_ids, limit, start, end) => {
    const query = `SELECT M.*, MOP.*, P.*, C.*, U.user_name AS sent_by_name FROM messages AS M, message_on_point AS MOP, points AS P, conversations AS C, users AS U 
    WHERE M.id = MOP.message_id 
    AND MOP.point_id = P.id
    AND P.convo_id = C.id
    AND U.id = M.sent_by
    ${ convo_ids ? `AND C.id = ${convo_ids}` : `` }`
 
    return mysql.query(query)
        .then(rows =>
            rows.map(({ id: message_id, ...rest }) =>
                ({ message_id, ...rest }))
        )
}

const relateMessageToPoint = (message_id, point_id) => {
    const query = `INSERT INTO message_on_point(message_id, point_id) VALUES (${message_id}, ${point_id})`
    return mysql.query(query)
        .then(({ insertId: relation_id }) => ({ relation_id, message_id, point_id }))
}


module.exports = { createMessage, relateMessageToPoint, getMessages }