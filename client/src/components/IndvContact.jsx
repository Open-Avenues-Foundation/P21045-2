import React, {useEffect, useState} from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {Link, useParams} from 'react-router-dom'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import TextMessageTable from './TextMessageTable'

const IndvContact = () => {

    const [contact, setContact] = useState({})
    const [textMessages, setTextMessages] = useState([])
    const [textNeedsUpdate, setTextNeedsUpdate] = useState(false)
    const { id } = useParams()
    

    useEffect(() => {
        const getContact = async () => {
            const { data } = await axios.get(`/api/contact/${id}`)
            setContact(data)
            setTextMessages(data.textCampaigns)
            setTextNeedsUpdate(false)
        }
        getContact()
    }, [id, textNeedsUpdate])

    return(
        <Container>
            <Typography variant='h3'>
            {contact.firstName} {contact.lastName}
            </Typography>
            <TextMessageTable textMessages={textMessages} setTextNeedsUpdate={setTextNeedsUpdate}/>
            <Grid
                padding={2}>
                <Link to={'/'}><Button variant="contained" >Back</Button></Link>
            </Grid>
        </Container>
    )
}

export default IndvContact