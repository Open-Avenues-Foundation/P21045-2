/* eslint-disable no-console */
const express = require('express')
var contactsRouter = require('./routes/contacts.routes')
var textMessageRouter = require('./routes/textMessage.routes')

const app = express()

app.use('api/contact', contactsRouter)
app.use('api/text-message', textMessageRouter)

app.all('*', (request, response) => {
  response.sendStatus(404)
})

app.listen(1336, () => {
  console.log('Listening on http://localhost:1336...')
})
