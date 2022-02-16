import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import axios from 'axios'
import ContactsTable from './ContactsTable'
import CampaignCreation from "./CampaignCreation"; 
import CSVUpload from "./CSVUpload";



const LandingPage = () => {
    const [contacts, setContacts] = useState([])
    const [matchingContacts, setMatchingContacts] = useState([])

    const mockContacts = [{
        id: 2,
        email: "willstclair@pickuplanet.com",
        firstName: "James",
        lastName: "Olson",
        phoneNumber: "(978)-652-8789",
        city: "Plano",
        state: "TX",
        lastOrderPrice: 63,
        lastOrderDate: "2021-08-25",
        createdAt: "2022-02-12T22:23:29.000Z",
        updatedAt: "2022-02-12T22:23:29.000Z",
        deletedAt: null
        },
        {
        id: 3,
        email: "jmarkovitch@songshnagu.com",
        firstName: "Catrina",
        lastName: "Bethrico",
        phoneNumber: "(508)-826-4708",
        city: "Denver",
        state: "CO",
        lastOrderPrice: 10,
        lastOrderDate: "2021-09-11",
        createdAt: "2022-02-12T22:23:29.000Z",
        updatedAt: "2022-02-12T22:23:29.000Z",
        deletedAt: null
        }]

    useEffect(() => {

        axios.get('http://localhost:1336/api/contact').then((payload) => {
            const { data } = payload
            setContacts(data)
            setMatchingContacts(data)
        })
    }, [])

    const filteredContacts = (userInput) => {
        const matchingContacts = contacts.filter(contact => {
            return contact.firstName.toLowerCase().startsWith(userInput.toLowerCase())
        })

        setMatchingContacts(matchingContacts)
    }

    return (
        <div> 
            <div>
                <input className="searchBox" type="text" name="search" placeholder='Search Contact...'
                    onChange={(event) => filteredContacts(event.target.value)}
                />{' '}
                <Button variant="outlined"><Link to={'/contact/upload'}>Upload Contacts</Link></Button>{' '}
                <Button variant="outlined"><Link to={'/campaign'}>View Campaigns</Link></Button>
            </div>
            <div>
                {/* {matchingContacts.map(contact => {
                    return (
                        <div key={contact.id}>
                            {contact.firstName} {contact.lastName}
                        </div>
                    )
                })} */}
            </div>
            <ContactsTable contacts={matchingContacts}/> 
            <CampaignCreation contacts={mockContacts} />
        </div>
    )
}

export default LandingPage
