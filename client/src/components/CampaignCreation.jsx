import React, { useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CampaignCreation = (props) => {
  const { contacts } = props
  const [campaignBody, setCampaignBody] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const navigate = useNavigate()

  const createCampaign = async () => {

    if(campaignBody || campaignName === '') {
      
    }

    const newCampaign = await axios.post('http://localhost:1336/api/campaign/', {
      message: campaignBody, name: campaignName

    })
    contacts.forEach( async(contact) => {
      const newTextMessage = await axios.post('http://localhost:1336/api/text', {
        contactId: contact.id, textCampaignId: newCampaign.data.id
      })
      console.log(newTextMessage)
    })
    navigate(`/campaign/${newCampaign.data.id}`)

  }

return (

<div className='Campaign-section'>
    <FormGroup size='normal'>
        <TextField id="Campaign Name" margin="normal" label="Campaign Name" variant="outlined" 
        onChange={(event) => setCampaignName(event.target.value)} value={campaignName} />
        <TextField id="Campaign Message" margin="normal" label="Campaign Message" variant="outlined" multiline
        onChange={(event) => setCampaignBody(event.target.value)} value={campaignBody} />
    </FormGroup>
    <Button variant='contained' onClick={createCampaign}>Create Campaign</Button>
</div>
)
}

export default CampaignCreation