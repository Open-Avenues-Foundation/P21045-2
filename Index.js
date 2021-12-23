/* eslint-disable no-console */
const express = require('express')

const app = express()

app,get('/api/contacts', getAllContacts)

app.get('/api/contacts/:id', getContactById)

app.post('/api/contacts', uploadCSVFile)

app.post('/api/contacts', uploadContacts)

app.all('*', (request, response) => {
  response.sendStatus(404)
})

app.listen(1337, () => {
  console.log('Listening on http://localhost:1337...')
})
