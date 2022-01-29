/* eslint-disable no-console */
/* eslint-disable max-len */
const models = require('../models')

const getAllContacts = async (request, response) => {
  try {
    const getAllContacts = await models.Contacts.findAll()

    return response.status(200).send(getAllContacts)
  } catch (e) {
    console.log(e) // eslint-disable-line no-console

    return response.status(500).send('Error trying to retrieve contact list, please try again')
  }
}

const getContactById = async (request, response) => {
  try {
    const { id } = request.params

    const getContactById = await models.Contacts.findAll({
      where: { id }
    })

    return getContactById
      ? response.send(getContactById)
      : response.status(404).send('No contact found, please try again')
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

    await contact.update({
      firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate
    })

    return response.status(201).send('The contact has been successfully updated')
  } catch (e) {
    console.log(e)

    response.status(500).send('Error while updating new contact')
  }
}

const deleteContact = () => {
}

const uploadCSVFile = () => {
}

module.exports = {
  createNewPerson,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  uploadCSVFile
}
