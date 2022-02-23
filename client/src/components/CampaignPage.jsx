import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {DataGrid} from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import CampaignSearchFilter from './CampaignSearchFilter'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'


export default function DataTable() {
    const [campaigns, setCampaigns] = useState([])
    const [matchingCampaigns, setMatchingCampaigns] = useState([])
    const [campaignsNeedUpdate, setCampaignsNeedUpdate] = useState(false)
    const [filterProperty,setFilterProperty] = useState('name')
    const [searchTerm,setSearchTerm] = useState('')

    useEffect(() => {
        axios.get('/api/campaign').then((payload => {
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
        console.log(params)
        const handleOnClick = async () => {
            await axios.post(`/api/campaign/start/${params.row.id}`).then(sleeper(1500)).then((payload) => {
                setCampaignsNeedUpdate(true)
            })
        }
        return (
            <Button variant="text" onClick={handleOnClick}>Start</Button>
        )
    }

    const columns = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'name', headerName: 'Campaign Name', width: 200 },
        { field: 'message', headerName: 'Message', description: 'This column is not sortable', sortable: false, width: 400 },
        { field: 'timeInitiated', headerName: 'Executed Date', width: 200 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: '', headerName: "Start", width: 135, sortable: false, renderCell: (params) => {
                return <StartButton params={params} />
            }, disableClickEventBubbling: true
        }
    ]

    return (
        <Grid>
            <Grid
            container
            direction="row"
            spacing={1}
            padding={2}
            paddingTop={4}>
                <Grid item md={6} lg={6} xl={6}>
                    <Input fullWidth className="searchBox" type="text" name="search"  value= {searchTerm} placeholder='Search Campaign...'
                        onChange={(event) => setSearchTerm(event.target.value)}/>        
                </Grid>
                <Grid item md={1} lg={1} xl={1}>
                    <CampaignSearchFilter filterProperty={filterProperty} setFilterProperty={setFilterProperty}/> 
                </Grid>
            </Grid>
            <Grid style={{ height: 786, width: '100%' }}
                  paddingLeft={5}
                  paddingRight={5}>
                <DataGrid
                    rows={matchingCampaigns}    
                    columns={columns}
                    pageSize={13}
                    rowsPerPageOptions={[13]}/>
            </Grid>
            <Grid
            padding={2}>
                <Link to={'/'}><Button variant="contained" >Back</Button></Link>
            </Grid>
        </Grid>
    );
}
