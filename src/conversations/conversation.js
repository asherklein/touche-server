const mysql = require('../config/mysql')
const { newPoint } = require('./point')

const newConversation = (topic) => {
    const convQuery = `INSERT INTO topics(topic_title) VALUES ('${topic}')`
    
    return mysql.query(convQuery)
    .then(({ insertId: convoId }) => {
        return newPoint(convoId, 'main')
        .then(({ insertId: pointId }) => ({ conversation: convoId, point: pointId, topic }))
    })
}

module.exports = { newConversation }