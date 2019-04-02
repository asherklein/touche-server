const mysql = require('../config/mysql')

const validUser = (user_id, secret) => {
    const query = `SELECT id, user_name, secret FROM users WHERE id = ${user_id} AND secret = ${secret}`
    return mysql.query(query).then(res => res.map(({ id: user_id, ...rest }) => ({ user_id, ...rest })))
}

module.exports = { validUser }