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

    const getContactById = await models.Contacts.findOne({
      where: { id: { [models.Op.like]: `%${id}%` } }
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
    const { firstKey, secondKey, etcKey } = request.body

    if (!firstKey || !secondKey || !etcKey) {
      return response.status(400).send('Missing one of the following: firstKey, secondKey, etc')
    }

    const newPerson = await models.Contacts.create({ firstKey, secondKey, etcKey })

    return response.status(201).send(newPerson)
  } catch (error) {
    return response.status(500).send('Unknown error while creating new person')
  }
}

const updateContact = () => {
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
