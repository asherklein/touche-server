const mysql = require('../config/mysql')

const createConvo = (topic) => {
    const query = `INSERT INTO conversations(topic) VALUES ('${topic}')`

    return mysql.query(query)
        .then(({ insertId: convo_id }) => ({ convo_id, topic }))
}


const myConvos = (user_id) => {
    const query = `SELECT * FROM conversations`

    return mysql.query(query)
        .then(rows =>
            rows.map(({ id: convo_id, topic, started_at }) =>
                ({ convo_id, topic, started_at }))
        )
}

module.exports = { createConvo, myConvos }