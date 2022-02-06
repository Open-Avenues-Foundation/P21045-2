/* eslint-disable no-console */
const twilioText = async (message, phoneNumber, text) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const client = require('twilio')(accountSid, authToken)

  const sendingMessage = await client.messages.create({
    body: message,
    from: +17853846086,
    to: phoneNumber
  })

  await text.update({ timeSent: sendingMessage.dateCreated })
  await text.update({ status: 'Sent' })
}

module.exports = { twilioText }
