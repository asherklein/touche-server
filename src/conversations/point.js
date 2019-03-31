const mysql = require('../config/mysql')

const newPoint = (convoId, title) => {
        const pointQuery = `INSERT INTO points(topic_id, point_title) VALUES (${convoId}, '${title}')`
        return mysql.query(pointQuery)
}

module.exports = { newPoint }