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
    const [selectedContacts, setSelectedContacts] = useState([])

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
                <Link to={'/contact/upload'}><Button variant="outlined">Upload Contacts</Button></Link>{' '}
                <Link to={'/campaign'}><Button variant="outlined">View Campaigns</Button></Link>
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

            <ContactsTable contacts={matchingContacts} selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts}/> 
            <CampaignCreation contacts={selectedContacts} />

        </div>
    )
}

export default LandingPage
