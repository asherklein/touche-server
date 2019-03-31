const mysql = require('../config/mysql')

const newPoint = (convo_id, title) => {
        const query = `INSERT INTO points(convo_id, point_title) VALUES (${convo_id}, '${title}')`
        return mysql.query(query)
                .then(({ insertId: point_id }) => ({ point_id, convo_id, title }))
}

module.exports = { newPoint }