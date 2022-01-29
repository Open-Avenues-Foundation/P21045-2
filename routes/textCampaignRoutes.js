const express = require('express')

const textCampaignControllers = require('../controllers/textCampaignControllers')
const router = express.Router()

router.post('/', textCampaignControllers.addCampaign) // add a new text campaign

router.get('/', textCampaignControllers.getAllCampaigns) // displayes all text campaigns

router.get('/:id', textCampaignControllers.getCampaignById) // gets a text campaign

router.put('/:id', textCampaignControllers.updateCampaign) // updates an existing text campaign

router.delete('/:id', textCampaignControllers.deleteCampaign) // deletes an existing text campaign

router.post('/start/:id', textCampaignControllers.startCampaign) // executes a text campaign

module.exports = router
