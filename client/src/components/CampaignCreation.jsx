import React, { useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert'

const CampaignCreation = (props) => {
  const { contacts } = props
  const [campaignMessage, setCampaignMessage] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [nameErrorText, setNameErrorText] = useState('Create A Name For Your Campaign')
  const [messageError, setMessageError] = useState(false)
  const [messageErrorText, setMessageErrorText] = useState('Create A Message For Your Campaign')
  const [contactsError, setContactsError] = useState(false)
  const [contactsErrorText, setContactsErrorText] = useState('Which Contacts Would You Like To Receive The Campaign?')

  const navigate = useNavigate()

  const createCampaign = async () => {
    setNameError(false)
    setMessageError(false)
    setContactsError(false)
    setNameErrorText('Create A Name For Your Campaign')
    setMessageErrorText('Create A Message For Your Campaign')

    if(contacts.length === 0){
      setContactsErrorText('*Please Select Contact(s)*')
      setContactsError(true)
    }

    if(campaignName.length === 0 && campaignMessage.length === 0){
      setNameErrorText('*Please Enter A Campaign Name*')
      setMessageErrorText('*Please Enter A Message*')
      setMessageError(true)
      return setNameError(true)
    }

    if(campaignName.length === 0){
      setNameErrorText('*Please Enter A Campaign Name*')
      return setNameError(true)
    }

    if(campaignMessage.length === 0){
      setMessageErrorText('*Please Enter A Message*')
      return setMessageError(true)
    }



    const newCampaign = await axios.post('http://localhost:1336/api/campaign/', {
      message: campaignMessage, name: campaignName

    })
    contacts.forEach( async(contact) => {
      const newTextMessage = await axios.post('http://localhost:1336/api/text', {
        contactId: contact.id, textCampaignId: newCampaign.data.id
      })
      console.log(newTextMessage)
    })
    navigate('/campaign')

  }

return (
<div>
{contactsError ? 
  <Alert severity="error">Please select Contacts above <strong>BEFORE</strong> creating a Campaign!</Alert>
  : null
}
  <div className='Campaign-section'>
    <Box sx={{ borderColor: 'grey.400' }} border={2} p={3} m={0.2} borderRadius={5} >
      <FormGroup size='normal'>
              <TextField id="Campaign Name" helperText={nameErrorText}  error={nameError} sx={{ mx: 'auto', }} label="Campaign Name" variant="outlined" 
              onChange={(event) => setCampaignName(event.target.value)} value={campaignName} />
            <Container maxWidth="sm">
              <TextField fullWidth id="Campaign Message" helperText={messageErrorText} error={messageError} sx={{ mx: 'auto' }} margin="normal" label="Campaign Message" variant="outlined" multiline
              onChange={(event) => setCampaignMessage(event.target.value)} value={campaignMessage} />
            </Container>
      </FormGroup>
      <Button variant='contained' onClick={createCampaign}>Create Campaign</Button>
    </Box>
  </div>
</div>
)
}

export default CampaignCreation