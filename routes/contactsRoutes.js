const express = require('express')

const contactsControllers = require('../controllers/contactsControllers')
const router = express.Router()


router.post('/', contactsControllers.createNewPerson) // uploads a contact (or contacts) using "Add Contacts" made on our UI(FrontEnd)

router.get('/', contactsControllers.getAllContacts) // displays all contacts on the database

router.get('/:id', contactsControllers.getContactById) // displays one contact whose id matches the one specified in the route

router.put('/:id', contactsControllers.updateContact) // updates an existing contact

router.delete('/:id', contactsControllers.deleteContact) // deletes an existing contact

router.post('/upload', contactsControllers.uploadCSVFile) // uploads contacts using a CSV file to the database

module.exports = router
