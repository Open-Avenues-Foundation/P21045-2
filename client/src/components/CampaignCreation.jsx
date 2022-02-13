import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { NavLink, Link } from 'react-router-dom'


const CampaignCreation = () => {
return (
  <div className='Campaign-section'>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Make A New Campaign Here</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <NavLink to='/campaign'>
        <Button>Create Campaign</Button>
      </NavLink>
    </Form>
</div>


)
}

export default CampaignCreation