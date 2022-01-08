/* eslint-disable no-console */
const express = require('express')
const {
  createNewPerson, getAllContacts, getContactById, uploadCSVFile, uploadContacts
} = require('./controller')

const app = express()

app.get('/api/contacts', getAllContacts) // displays all contacts on the database

app.get('/api/contacts/:id', getContactById) // displays one contact whose id matches the one specified in the route

app.post('/api/contacts', uploadCSVFile) // uploads contacts using a CSV file to the database

app.post('/api/contacts', createNewPerson) // uploads a contact (or contacts) using "Add Contacts" made on our UI(FrontEnd)

app.all('*', (request, response) => {
  response.sendStatus(404)
})

app.listen(1336, () => {
  console.log('Listening on http://localhost:1336...')
})
