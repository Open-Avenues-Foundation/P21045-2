const express = require('express')

const textMessageControllers = require('../controllers/textMessage.controllers')
const router = express.Router()

router.post('/', textMessageControllers.sendTextMessage) // sends out text message to Twilio

module.exports = router
