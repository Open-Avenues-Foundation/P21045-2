import React, { useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CampaignCreation = (props) => {
  const { contacts } = props
  const [campaignBody, setCampaignBody] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const navigate = useNavigate()

  const createCampaign = async () => {
    // get the campaign name && body
    // send them to the backend
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

    <FormGroup>
        <TextField id="Campaign Name" margin="normal" label="Campaign Name" variant="outlined" 
        onChange={(event) => setCampaignName(event.target.value)} value={campaignName} />
        <TextField id="Campaign Message" margin="normal" label="Campaign Message" variant="outlined"
        onChange={(event) => setCampaignBody(event.target.value)} value={campaignBody} />
    </FormGroup>

    {/* <FormGroup className="mb-3" controlId="campaignName">
        <FormControlLabel>Campaign Name</FormControlLabel>
      <FormControl type="name" onChange={(event) => setCampaignName(event.target.value)} value={campaignName}/>
    </FormGroup>
    <FormGroup className="mb-3" controlId="campaignMessage">
        <FormControlLabel>Campaign Message</FormControlLabel>
      <FormControl as="textarea" onChange={(event) => setCampaignBody(event.target.value)} value={campaignBody} rows={3} />
    </FormGroup> */}

        <Button variant='contained' onClick={createCampaign}>Create Campaign</Button>

</div>


)
}

export default CampaignCreation