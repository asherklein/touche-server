const mysql = require('../config/mysql')


const newMessage = (sent_by, sent_at, content) => {
    const query = `INSERT INTO messages(sent_by, sent_at, content) VALUES (${sent_by}, ${sent_at}, ${content})`
    return mysql.query(query)
        .then(({ insertId: message_id }) => ({ message_id, sent_by, sent_at, content }))
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


const relateMessageToPoint = (message_id, point_id) => {
    const query = `INSERT INTO message_on_point(message_id, point_id) VALUES (${message_id}, ${point_id})`
    return mysql.query(query)
        .then(({ insertId: relation_id }) => ({ relation_id, message_id, point_id }))
}


module.exports = { newMessage, relateMessageToPoint, getMessagesForConvo }