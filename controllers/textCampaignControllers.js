/* eslint-disable no-console */
const models = require('../models')

const addCampaign = async (request, response) => {
  try {
    const { message, name, timeInitiated, status } = request.body

    if (!message || !name || !timeInitiated || !status) {
      return response.status(400).send('Missing one of the following: message, name, timeInitiated, status')
    }

    const newCampaign = await models.TextCampaigns.create({ message, name, timeInitiated, status })

    return response.status(201).send(newCampaign)
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error while creating new campaign')
  }
}

const getAllCampaigns = async (request, response) => {
  try {
    const getAllCampaigns = await models.TextCampaigns.findAll()

    return response.status(200).send(getAllCampaigns)
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error trying to retrieve campaign list, please try again')
  }
}

const getCampaignById = async (request, response) => {
  try {
    const { id } = request.params

    const getCampaignById = await models.TextCampaigns.findOne({
      where: { id }
    })

    return getCampaignById
      ? response.send(getCampaignById)
      : response.status(404).send('No campaign found, please try again')
  } catch (e) {
    return response.status(500).send('Error trying to retrieve campaign, please try again')
  }
}

const updateCampaign = async (request, response) => {
  try {
    const { message, name, timeInitiated, status } = request.body

    const { id } = request.params

    if (!id || !message || !name || !timeInitiated || !status) {
      return response.status(400).send('Missing one of the following: id, message, name, timeInitiated, status')
    }

    const campaign = await models.TextCampaigns.findOne({ where: { id } })

    if (!campaign) return response.status(400).send(`Unable to find the campaign with id: ${id} to update`)

    await campaign.update({ message, name, timeInitiated, status })

    return response.status(201).send('The campaign has been successfully updated')
  } catch (e) {
    console.log(e)

    response.status(500).send('Error while updating campaign')
  }
}

const deleteCampaign = async (request, response) => {
  try {
    const { id } = request.params

    const campaign = await models.TextCampaigns.findOne({ where: { id } })

    if (!campaign) return response.status(400).send(`Unable to find the campaign with id: ${id} to delete`)

    await campaign.destroy()

    return response.status(200).send('Campaign has been successfully deleted')
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error while deleting campaign')
  }
}

const startCampaign = async (request, response) => {
  try {
    const { id } = request.params
    const campaign = await models.TextCampaigns.findOne({ where: { id } })

    if (!campaign) {
      return response.status(400).send(`Unable to find a campaign with id: ${id}`)
    }

    const allTexts = await models.TextMessages.findAll({ where: { textCampaignId: id } })

    const textIds = allTexts.map((arr) => arr.id)

    for (let i = 0; i < textIds.length; i++) {
      const id = textIds[i]

      const text = await models.TextMessages.findOne({ where: { id } })
      const campaign = await models.TextCampaigns.findOne({ where: { id: text.textCampaignId } })
      const contact = await models.Contacts.findOne({ where: { id: text.contactId } })

      const accountSid = process.env.TWILIO_ACCOUNT_SID
      const authToken = process.env.TWILIO_AUTH_TOKEN
      const client = require('twilio')(accountSid, authToken)

      const sendingMessage = await client.messages.create({
        body: campaign.message,
        from: +17853846086,
        to: contact.phoneNumber
      })

      text.update({ timeSent: sendingMessage.dateCreated })
    }

    return response.status(200).send('Campaign has been successfully sent')
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error while sending campaign')
  }
}

module.exports = {
  addCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  startCampaign
}
