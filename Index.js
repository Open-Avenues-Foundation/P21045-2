/* eslint-disable no-console */
const express = require('express')

const app = express()

app.all('*', (request, response) => {
  response.sendStatus(404)
})

app.listen(1337, () => {
  console.log('Listening on http://localhost:1337...')
})
