const express = require('express')

const contactsControllers = require('../controllers/contacts.controllers')
const router = express.Router()


router.get('/', contactsControllers.getAllContacts) // displays all contacts on the database

router.get('/:id', contactsControllers.getContactById) // displays one contact whose id matches the one specified in the route

router.post('/', contactsControllers.uploadCSVFile) // uploads contacts using a CSV file to the database

router.post('/', contactsControllers.createNewPerson) // uploads a contact (or contacts) using "Add Contacts" made on our UI(FrontEnd)

module.exports = router
