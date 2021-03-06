/* eslint-disable no-console */
/* eslint-disable max-len */
const models = require('../models')
const csv = require('csvtojson')


const getAllContacts = async (request, response) => {
  try {
    const getAllContacts = await models.Contacts.findAll()

    return response.status(200).send(getAllContacts)
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error trying to retrieve contact list, please try again')
  }
}

const getContactById = async (request, response) => {
  try {
    const { id } = request.params

    const getContactById = await models.Contacts.findOne({
      where: { id },
    include: [{model: models.TextCampaigns}]})

    if (getContactById.length === 0) return response.status(404).send('No contact found, please try again')

    return response.send(getContactById)
  } catch (e) {
    return response.status(500).send('Error trying to retrieve contact, please try again')
  }
}

const createNewPerson = async (request, response) => {
  try {
    const {
      firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate
    } = request.body

    if (!firstName || !lastName || !email || !city || !state || !phoneNumber || !lastOrderPrice || !lastOrderDate) {
      return response.status(400).send('Missing one of the following: firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOderDate')
    }

    const newPerson = await models.Contacts.create({
      firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate
    })

    return response.status(201).send(newPerson)
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error while creating new contact')
  }
}

const updateContact = async (request, response) => {
  try {
    const {
      firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate
    } = request.body
    const { id } = request.params

    if (!id || !firstName || !lastName || !email || !city || !state || !phoneNumber || !lastOrderPrice || !lastOrderDate) {
      return response.status(400).send('Missing one of the following: id, firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOderDate')
    }

    const contact = await models.Contacts.findOne({ where: { id } })

    if (!contact) return response.status(400).send(`Unable to find the contact with id: ${id} to update`)

    await contact.update({
      firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate
    })

    return response.status(201).send('The contact has been successfully updated')
  } catch (e) {
    console.log(e)

    response.status(500).send('Error while updating contact')
  }
}

const deleteContact = async (request, response) => {
  try {
    const { id } = request.params

    const contact = await models.Contacts.findOne({ where: { id } })

    if (!contact) return response.status(400).send(`Unable to find the contact with id: ${id} to delete`)

    await contact.destroy()

    return response.status(200).send('Contact has been successfully deleted')
  } catch (e) {
    console.log(e)

    return response.status(500).send('Error while deleting contact')
  }
}

const uploadCSVFile = async (request, response) => {
  try { const { file: { path } } = request

    const csvObject = await csv().fromFile(path)

    const isValidContact = (contact) => {
      const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      const phoneFormat = /(?=\(|\b)(?:\+?1 ?[-.]?)?(?:\(\d{3}\)|\d{3}) ?[-.]? ?\d{3} ?[-.]? ?\d{4}\b/
      const emailString = contact.email.toString()

      return mailFormat.test(contact.email) && phoneFormat.test(contact.phoneNumber) && (emailString[emailString.length - 1] !== 'o')
    }

    const validContacts = csvObject.filter(contact => isValidContact(contact))

    if (validContacts.length === 0) return response.status(400).send('Error with file upload, please ensure file format is correct')

    await models.Contacts.bulkCreate(validContacts)

    return response.status(200).send('Successfully created contacts from the CSV file')
  } catch (e) {
    console.log(e)

    return response.status(500).send('Unable to import csv file')
  } }

module.exports = {
  createNewPerson,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  uploadCSVFile
}
