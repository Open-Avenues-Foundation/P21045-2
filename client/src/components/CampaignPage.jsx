import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {DataGrid} from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Campaign Name', width: 200 },
    { field: 'message', 
    headerName: 'Message',
    description: 'This column is not sortable',
    sortable: false,
    width: 300 },
    { field: 'timeInitiated', headerName: 'Executed Date', width: 200 },
    { field: 'status', headerName: 'Status', width: 130 }]

export default function DataTable() {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {

        axios.get('http://localhost:1336/api/campaign').then((payload => {
            const { data } = payload
            setCampaigns(data) 
        }))
    }, [])

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={campaigns}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                <Button variant="outlined" ><Link to={'/'}>Back</Link></Button>
            </div>
        </div>
    );
}
