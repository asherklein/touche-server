const { newPoint } = require('../conversations/point')
const { createMessage, relateMessageToPoint } = require('../conversations/message')
const { createAttackRecord, supportAttack } = require('../conversations/attack')
const { createConvo } = require('../conversations/conversation')

const startConvo = (topic, { sent_by, content }) => {

    const initialP = createMessage(sent_by, content)
        .then((msg) => createAttackRecord(msg.message_id, msg.message_id)
            .then((attack) => ({ ...msg, ...attack }))
        )

    return createConvo(topic)
        .then(({ convo_id }) => initialP.then(initial =>
            startNewPoint(convo_id, 'main', initial.message_id)
                .then(({ point_id, title: point_title }) => ({ convo_id, topic, point_id, point_title, ...initial }))
        ))


}
const startNewPoint = (convo, title, initial) =>
    newPoint(convo, title)
        .then((point) => relateMessageToPoint(initial, point.point_id)
            .then(rel => ({ ...point, ...rel }))

        )

const sendMessage = (point, sent_by, sent_at, content) =>
    createMessage(sent_by, sent_at, content)
        .then((msg) => relateMessageToPoint(msg.message_id, point)
            .then(rel => ({ ...msg, ...rel }))
        )

const createAttackMessage = (sent_by, sent_at, content, to) =>
    createMessage(sent_by, sent_at, content)
        .then((msg) => createAttackRecord(msg.message_id, to)
            .then((attack) => ({ ...msg, ...attack }))
        )

const sendAttack = (point, sent_by, sent_at, content, to) =>
    createAttackMessage(sent_by, sent_at, content, to)
        .then((msg) => relateMessageToPoint(msg.message_id, point)
            .then(rel => ({ ...msg, ...rel }))
        )

module.exports = { startConvo, startNewPoint, sendMessage, sendAttack, supportAttack }