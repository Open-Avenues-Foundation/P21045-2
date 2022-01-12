const models = require('../models')
/*
Models are responsible for the storage and 
retrieval of data in our applications. 
For us, models will serve as the interface 
layer between our Express application and our MySQL database.

The information taken from the example postman would be the email, 
name of person, and phone number right?
*/

const getAllContacts = async (request, response) => {
  try {
    const getAllContacts = await models.PLACEHOLDER.findAll()

    return response.status(200).send(getAllContacts)
  } catch (e) {
    console.log(e) // eslint-disable-line no-console

    return response.status(500).send('Error trying to retrieve contact list, please try again')
  }
}

const getContactByIdentifier = async (request, response) => {
  try {
    const { identifier } = request.params

    const getContactByIdentifier = await models.PLACEHOLDER.findOne({
      where: { id: { [models.Op.like]: `%${identifier}%` } }
    })

    return getContactByIdentifier
      ? response.send(getContactByIdentifier)
      : response.status(404).send('No contact found, please try again')
  } catch (e) {
    return response.status(500).send('Error trying to retrieve contact, please try again')
  }
}

const uploadContacts = () => {
}

const uploadCSVFile = () => {
}

const createNewPerson = async (request, response) => {
  try {
    const { firstKey, secondKey, etcKey } = request.body

    if (!firstKey || !secondKey || !etcKey) {
      return response.status(400).send('Missing one of the following: firstKey, secondKey, etc')
    }

    const newPerson = await models.People.create({ firstKey, secondKey, etcKey })

    return response.status(201).send(newPerson)
  } catch (error) {
    return response.status(500).send('Unknown error while creating new person')
  }
}

const sendTextMessage = async (request, response) => {

}

module.exports = {
  createNewPerson,
  getAllContacts,
  getContactByIdentifier,
  uploadContacts,
  uploadCSVFile,
  sendTextMessage
}
