/* eslint-disable no-console */
const models = require('../models')
const { twilioText } = require('../utils/utilities')

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

    const getCampaignById = await models.TextCampaigns.findAll({
      where: {
        [models.Op.or]: [
          { id }, { name: { [models.Op.like]: `%${id}%` } }
        ]
      }
    })

    if (getCampaignById.length === 0) return response.status(404).send('No campaign found, please try again')

    return response.send(getCampaignById)
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
  const { id } = request.params

  try {
    const campaign = await models.TextCampaigns.findOne({ where: { id } })

    if (!campaign) {
      return response.status(400).send(`Unable to find a campaign with id: ${id}`)
    }

    const allTexts = await models.TextMessages.findAll({ where: { textCampaignId: id } })

    allTexts.forEach(async (text) => {
      const { contactId } = text
      const contact = await models.Contacts.findOne({ where: { id: contactId } })

      await twilioText(campaign.message, contact.phoneNumber, text)

      campaign.update({ timeInitiated: text.timeSent })
      campaign.update({ status: 'Sent' })
    })

    return response.status(200).send('Campaign has been successfully sent')
  } catch (e) {
    console.log(e)
    const campaign = await models.TextCampaigns.findOne({ where: { id } })

    campaign.update({ status: 'Failed' })

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
