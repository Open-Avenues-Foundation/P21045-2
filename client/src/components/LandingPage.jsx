import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ContactsTable from './ContactsTable'
import CampaignCreation from "./CampaignCreation"; 
import ContactsSearchFilter from './ContactsSearchFilter'
import Input from '@mui/material/Input'
import SearchIcon from '@mui/icons-material/Search';



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
        <Grid>
            <Grid
                container
                direction="row"
                spacing={1}
                padding={2}
                paddingTop={4}>
                <Grid item md={6} lg={6} xl={6}>
                <Input fullWidth className="searchBox" type="text"  name="search"  value= {searchTerm} placeholder='Search Contact...'
                        onChange={(event) => setSearchTerm(event.target.value)}/>  
               </Grid>   
                <Grid item md={1} lg={1} xl={1}> 
                    <ContactsSearchFilter filterProperty={filterProperty} setFilterProperty={setFilterProperty}/> 
                </Grid>   
                <Grid item md={5} lg={5} xl={5} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Link to={'/contact/upload'}><Button variant="text" >Upload Contacts </Button></Link> 
                    <Link to={'/campaign'}><Button variant="text">View Campaigns</Button></Link>
                </Grid>
            </Grid>
                <ContactsTable contacts={matchingContacts} selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts}/> 
                <CampaignCreation contacts={selectedContacts} />
        </Grid>
    )
}

export default LandingPage
