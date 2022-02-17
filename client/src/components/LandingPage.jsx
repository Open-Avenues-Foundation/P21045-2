import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import axios from 'axios'
import ContactsTable from './ContactsTable'
import CampaignCreation from "./CampaignCreation"; 
import CSVUpload from "./CSVUpload";
import ContactsSearchFilter from './ContactsSearchFilter';




const LandingPage = () => {
    const [contacts, setContacts] = useState([])
    const [matchingContacts, setMatchingContacts] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([])
    const [filterProperty, setFilterProperty] = useState('firstName')
    const [searchTerm, setSearchTerm] = useState ('')

    useEffect(() => {

        axios.get('http://localhost:1336/api/contact').then((payload) => {
            const { data } = payload
            setContacts(data)
            setMatchingContacts(data)
        })
    }, [])

    useEffect(() => {
        
        const matchingContacts = contacts.filter(contact => {
            return contact[filterProperty].toLowerCase().includes(searchTerm.toLowerCase())
        })

        setMatchingContacts(matchingContacts)
    },[searchTerm,filterProperty,contacts])


    return (
        <div> 
            <div>
                <ContactsSearchFilter filterProperty={filterProperty} setFilterProperty={setFilterProperty}/> 
                <input className="searchBox" type="text" name="search"  value= {searchTerm} placeholder='Search Contact...'
                    onChange={(event) => setSearchTerm(event.target.value)}
                />{' '}
                <Link to={'/contact/upload'}><Button variant="outlined">Upload Contacts</Button></Link>{' '}
                <Link to={'/campaign'}><Button variant="outlined">View Campaigns</Button></Link>
            </div>
            <ContactsTable contacts={matchingContacts} selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts}/> 
<<<<<<< HEAD
            <CampaignCreation contacts={selectedContacts} />
=======
            <CampaignCreation contacts={matchingContacts} />
>>>>>>> 721f0af (changes)

        </div>
    )
}

export default LandingPage
