/* eslint-disable no-console */
const models = require('../models')
const { twilioText } = require('../utils/utilities')

const addText = async (request, response) => {
  try {
    const { contactId, textCampaignId } = request.body

    if (!contactId || !textCampaignId) {
      return response.status(400).send('Missing one of the following: contactId, textCampaignId')
    }

    const newText = await models.TextMessages.create({ contactId, textCampaignId })

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
  const { id } = request.body

  try {
    if (!id) {
      return response.status(400).send('Missing the id field')
    }

    const text = await models.TextMessages.findOne({ where: { id } })

    if (!text) {
      return response.status(400).send(`Unable to find a text with id: ${id}`)
    }

    const campaign = await models.TextCampaigns.findOne({ where: { id: text.textCampaignId } })
    const contact = await models.Contacts.findOne({ where: { id: text.contactId } })


    await twilioText(campaign.message, contact.phoneNumber, text)

    return response.status(200).send('Text message has been successfully sent')
  } catch (e) {
    console.log(e)
    const text = await models.TextMessages.findOne({ where: { id } })

    text.update({ status: 'Failed' })

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
