const mysql = require('../config/mysql')


const newMessage = (sent_by, sent_at, content) => {
    const query = `INSERT INTO messages(sent_by, sent_at, content) VALUES (${sent_by}, ${sent_at}, ${content})`
    return mysql.query(query)
        .then(({ insertId: message_id }) => ({ message_id, sent_by, sent_at, content }))
}


const relateMessageToPoint = (message_id, point_id) => {
    const query = `INSERT INTO message_on_point(message_id, point_id) VALUES (${message_id}, ${point_id})`
    return mysql.query(query)
        .then(({ insertId: relation_id }) => ({ relation_id, message_id, point_id }))
}


module.exports = { newMessage, relateMessageToPoint }