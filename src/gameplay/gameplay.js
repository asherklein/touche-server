const { newPoint } = require('../conversations/point')
const { newMessage, relateMessageToPoint } = require('../conversations/message')
const { createAttackRecord, supportAttack } = require('../conversations/attack')

const startNewPoint = (convo, title, initial) => newPoint(convo, title)
    .then((point) => relateMessageToPoint(initial, point.point_id)
        .then(rel => ({ ...point, ...rel }))

    )

const sendMessage = (point, sent_by, sent_at, content) =>
    newMessage(sent_by, sent_at, content)
        .then((msg) => relateMessageToPoint(msg.message_id, point)
            .then(rel => ({ ...msg, ...rel }))
        )

const sendAttack = (sent_by, sent_at, content, to) =>
    sendMessage(sent_by, sent_at, content)
        .then((msg) => createAttackRecord(msg.message_id, to)
            .then((attack) => ({ ...msg, ...attack }))
        )

module.exports = { startNewPoint, sendMessage, sendAttack, supportAttack }