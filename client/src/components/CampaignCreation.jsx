import React, { useEffect, useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CampaignCreation = (props) => {
  const { contacts } = props
  const [campaignMessage, setCampaignMessage] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const [nameErrorText, setNameErrorText] = useState('Create A Name For Your Campaign')
  const [messageErrorText, setMessageErrorText] = useState('Create A Message For Your Campaign')
  const [nameError, setNameError] = useState(false)
  const [messageError, setMessageError] = useState(false)

  const navigate = useNavigate()

  // useEffect(() => {
  //   (campaignMessage.length === 0) ? setMessageError(true): setMessageError(false)
  // }, [campaignMessage])

  // useEffect(() => {
  //   (campaignName.length === 0) ? setCampaignNameError(true): setCampaignNameError(false)
  // }, [campaignName])


  const createCampaign = async () => {

    setNameError(false)
    setMessageError(false)
    setNameErrorText('Create A Name For Your Campaign')
    setMessageErrorText('Create A Message For Your Campaign')

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

<div className='Campaign-section'>
    <FormGroup size='normal'>
        <TextField id="Campaign Name" helperText={nameErrorText}  error={nameError} sx={{ mx: 'auto', }} label="Campaign Name" variant="outlined" 
        onChange={(event) => setCampaignName(event.target.value)} value={campaignName} />
        <TextField id="Campaign Message" helperText={messageErrorText} error={messageError} sx={{ mx: 'auto' }} margin="normal" label="Campaign Message" variant="outlined" multiline
        onChange={(event) => setCampaignMessage(event.target.value)} value={campaignMessage} />
    </FormGroup>
    <Button variant='contained' onClick={createCampaign}>Create Campaign</Button>
</div>
)
}

export default CampaignCreation