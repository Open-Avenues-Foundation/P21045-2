import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios'

const CampaignCreation = () => {
  const [campaignBody, setCampaignBody] = useState('')

  const createCampaign = async () => {
    // get the campaign name
    // get the message from the body

    // send them to the backend
    axios.post('http://localhost:1336/api/campaign/', {
      message: campaignBody, name: 'Test'
    }).then(response => {
      console.log(response)
    })
  }

return (
  <div className='Campaign-section'>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Make A New Campaign Here</Form.Label>
        <Form.Control as="textarea" onChange={(event) => setCampaignBody(event.target.value)} value={campaignBody} rows={3} />
      </Form.Group>

      <NavLink to='/campaign'>
        <Button onClick={createCampaign}>Create Campaign</Button>
      </NavLink>
    </Form>
</div>


)
}

export default CampaignCreation