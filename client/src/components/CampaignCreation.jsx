import React, { useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'

const CampaignCreation = (props) => {
  const { contacts } = props
  const [campaignMessage, setCampaignMessage] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const [validationAlert, setValidationAlert] = useState(false)


  const navigate = useNavigate()

  const createCampaign = async () => {
    setValidationAlert(false)


    if(contacts.length === 0 || campaignName.length === 0 || campaignMessage.length === 0){

      return setValidationAlert(true)
    }


    const newCampaign = await axios.post('http://localhost:1336/api/campaign/', {
      message: campaignMessage, name: campaignName

    })
    contacts.forEach( async(contact) => {
        await axios.post('http://localhost:1336/api/text', {
        contactId: contact.id, textCampaignId: newCampaign.data.id
      })
    })
    navigate('/campaign')

  }

return (
      <Grid>
        {validationAlert ? 
          <Alert severity="error">Select Contact(s) above, Create a Campaign Name, a Campaign Message <strong>BEFORE</strong> creating a Campaign!</Alert>
          : null
        }
          <Box sx={{ borderColor: 'grey.300' }} border={1.5} m={.5} mx={5} p={3} borderRadius={1} >
            <FormGroup size='normal'>
                    <TextField id="Campaign Name"   sx={{ mx: 'auto', }} label="Campaign Name" variant="outlined" 
                    onChange={(event) => setCampaignName(event.target.value)} value={campaignName} />
                  <Container maxWidth="sm">
                    <TextField fullWidth id="Campaign Message" sx={{ mx: 'auto' }} margin="normal" label="Campaign Message" variant="outlined" multiline
                    onChange={(event) => setCampaignMessage(event.target.value)} value={campaignMessage} />
                  </Container>
            </FormGroup>
            <Button variant='contained' onClick={createCampaign}>Create Campaign</Button>
          </Box>
      </Grid>
)
}

export default CampaignCreation