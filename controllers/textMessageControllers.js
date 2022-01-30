/* eslint-disable no-console */
const models = require('../models')

const addText = async (request, response) => {
  try {
    const { contactId, textCampaignId, timeSent, status } = request.body

    if (!contactId || !textCampaignId || !timeSent || !status) {
      return response.status(400).send('Missing one of the following: contactId, textCampaignId, timeSent, status')
    }

    const newText = await models.TextMessages.create({ contactId, textCampaignId, timeSent, status })

    return response.status(201).send(newText)
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error while creating new text message')
  }
}

const getAllTexts = async (request, response) => {
  try {
    const getAllTexts = await models.TextMessages.findAll()

    return response.status(200).send(getAllTexts)
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error trying to retrieve text message list, please try again')
  }
}

const getTextById = async (request, response) => {
  try {
    const { id } = request.params

    const getTextById = await models.TextMessages.findOne({
      where: { id }
    })

    return getTextById
      ? response.send(getTextById)
      : response.status(404).send('No text message found, please try again')
  } catch (e) {
    return response.status(500).send('Error trying to retrieve text message, please try again')
  }
}

const updateText = async (request, response) => {
  try {
    const { contactId, textCampaignId, timeSent, status } = request.body

    const { id } = request.params

    if (!id || !contactId || !textCampaignId || !timeSent || !status) {
      return response.status(400).send('Missing one of the following: id, contactId, textCampaignId, timeSent, status')
    }

    const textMessage = await models.TextMessages.findOne({ where: { id } })

    if (!textMessage) return response.status(400).send(`Unable to find the text message with id: ${id} to update`)

    await textMessage.update({ contactId, textCampaignId, timeSent, status })

    return response.status(201).send('The text message has been successfully updated')
  } catch (e) {
    console.log(e)

    response.status(500).send('Error while updating text message')
  }
}

const deleteText = async (request, response) => {
  try {
    const { id } = request.params

    const textMessage = await models.TextMessages.findOne({ where: { id } })

    if (!textMessage) return response.status(400).send(`Unable to find the text message with id: ${id} to delete`)

    await textMessage.destroy()

    return response.status(200).send('Text message has been successfully deleted')
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error while deleting text message')
  }
}

const sendTextMessage = async (request, response) => {
  try {
    const { body, from, to } = request.body

    if (!body || !from || !to) {
      return response.status(400).send('Missing one of the following: body, from, to')
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const client = require('twilio')(accountSid, authToken)

    await client.messages.create({
      body: body,
      from: from,
      to: to
    }).then(message => console.log(message))

    return response.status(200).send('Text message has been successfully sent')
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error while sending text message')
  }
}

module.exports = {
  addText,
  getAllTexts,
  getTextById,
  updateText,
  deleteText,
  sendTextMessage
}
