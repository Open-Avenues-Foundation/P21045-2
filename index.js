/* eslint-disable no-console */
const express = require('express')
const contactsRouter = require('./routes/contactsRoutes')
const textMessageRouter = require('./routes/textMessageRoutes')
const textCampaignRouter = require('./routes/textCampaignRoutes')

const app = express()

app.use(express.json())

app.use('/api/contact', contactsRouter)
app.use('/api/text', textMessageRouter)
app.use('/api/campaign', textCampaignRouter)


app.all('*', (request, response) => {
  response.sendStatus(404)
})

app.listen(1336, () => {
  console.log('Listening on http://localhost:1336...')
})
