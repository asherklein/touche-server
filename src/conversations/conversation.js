const mysql = require('../config/mysql')
const { newPoint } = require('./point')

const newConversation = (topic) => {
    const query = `INSERT INTO conversations(topic) VALUES ('${topic}')`

    return mysql.query(query)
        .then(({ insertId: convo_id }) => {
            return newPoint(convo_id, 'main')
                .then(({ point_id, title: point_title }) => ({ convo_id, topic, point_id, point_title }))
        })
}

const myConvos = (user_id) => {
    const query = `SELECT * FROM conversations`

    return mysql.query(query)
        .then(rows =>
            rows.map(({ id: convo_id, topic, started_at }) =>
                ({ convo_id, topic, started_at }))
        )
}

module.exports = { newConversation, myConvos }