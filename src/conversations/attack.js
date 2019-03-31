const mysql = require('../config/mysql')

const createAttackRecord = (from, to) => {
    const query = `INSERT INTO message_attacks(from_id, to_id) VALUES (${from}, ${to})`
    return mysql.query(query)
        .then(({ insertId: attack_id }) => ({ attack_id, from, to }))
}
const supportAttack = (from, to, supporter, type) => {
    const query = `INSERT INTO attack_support(from_id, to_id, supporter, support_type) VALUES (${from}, ${to}, ${supporter}, ${type})`
    return mysql.query(query).then(({ insertId: support_id }) => ({ support_id, from, to, supporter, type }))
}

module.exports = { createAttackRecord, supportAttack }