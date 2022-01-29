const express = require('express')

const textMessageControllers = require('../controllers/textMessageControllers')
const router = express.Router()

router.post('/', textMessageControllers.addText) // add a new text message

router.get('/', textMessageControllers.getAllTexts) // displayes all text messages

router.get('/:id', textMessageControllers.getTextById) // gets a text message

router.put('/:id', textMessageControllers.updateText) // updates an existing text message

router.delete('/:id', textMessageControllers.deleteText) // deletes an existing text message

router.post('/twilio', textMessageControllers.sendTextMessage) // sends out text message with Twilio

module.exports = router
