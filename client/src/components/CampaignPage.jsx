import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {DataGrid} from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import CampaignSearchFilter from './CampaignSearchFilter'


export default function DataTable() {
    const [campaigns, setCampaigns] = useState([])
    const [matchingCampaigns, setMatchingCampaigns] = useState([])
    const [campaignsNeedUpdate, setCampaignsNeedUpdate] = useState(false)
    const [filterProperty,setFilterProperty] = useState('name')
    const [searchTerm,setSearchTerm] = useState('')

    useEffect(() => {

        axios.get('http://localhost:1336/api/campaign').then((payload => {
            const { data } = payload
            setCampaigns(data) 
            setMatchingCampaigns(data)
            setCampaignsNeedUpdate(false)
        }))
    }, [campaignsNeedUpdate])

  useEffect(() => {
        const matchingCampaigns = campaigns.filter(campaign => {
            return campaign[filterProperty].toLowerCase().includes(searchTerm.toLowerCase())
        })

        setMatchingCampaigns(matchingCampaigns)
    },[searchTerm,filterProperty,campaigns])

    function sleeper(ms) {
        return function (x) {
            return new Promise(resolve => setTimeout(() => resolve(x), ms));
        };
    }

    const StartButton = (props) => {
        const { params } = props

        const handleOnClick = async () => {
            await axios.post(`http://localhost:1336/api/campaign/start/${params.row.id}`).then(sleeper(1000)).then((payload) => {
                setCampaignsNeedUpdate(true)
            })
            
        }

        return (
            <Button onClick={handleOnClick}>Start</Button>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Campaign Name', width: 200 },
        {
            field: 'message',
            headerName: 'Message',
            description: 'This column is not sortable',
            sortable: false,
            width: 300
        },
        { field: 'timeInitiated', headerName: 'Executed Date', width: 200 },
        { field: 'status', headerName: 'Status', width: 130 },
        {
            field: '', headerName: "Start", width: 135, renderCell: (params) => {

                return <StartButton params={params} />
            }, disableClickEventBubbling: true
        }
    ]

    return (
        <div>
           <CampaignSearchFilter filterProperty={filterProperty} setFilterProperty={setFilterProperty}/> 
                <input className="searchBox" type="text" name="search"  value= {searchTerm} placeholder='Search Campaign...'
                    onChange={(event) => setSearchTerm(event.target.value)}
                />{' '}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={matchingCampaigns}    
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                <Link to={'/'}><Button variant="outlined" >Back</Button></Link>
            </div>
        </div>
    );
}
