import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import Button from '@mui/material/Button'

export default function TextMessageTable(props) {

    const {setTextNeedsUpdate} = props

    function sleeper(ms) {
        return function (x) {
            return new Promise(resolve => setTimeout(() => resolve(x), ms));
        }};

    const StartButton = (props) => {
        const { params } = props

        const handleOnClick = async () => {
            await axios.post('http://localhost:1336/api/text/twilio', {id: `${params.row.textId}`}).then(sleeper(1500)).finally(() => {
               setTextNeedsUpdate(true)
            })
        }
        return (
            <Button variant="text" onClick={handleOnClick}>Send</Button>
        )
    }

    const columns = [
        { field: 'name', headerName: 'Campaign Name', width: 200 },
        { field: 'message', headerName: 'Message', description: 'This column is not sortable', sortable: false, width: 400 },
        { field: 'textSent', headerName: 'Sent Date', width: 250 },
        { field: 'textStatus', headerName: 'Status', width: 130 },
        { field: '', headerName: '', width: 135, sortable: false, renderCell: (params) => {
                return <StartButton params={params} />
            }, disableClickEventBubbling: true
        }
    ]

    const rows = props.textMessages.map((textMessage) => {
        const textStatus = textMessage.textMessages.status
        const textSent = textMessage.textMessages.timeSent
        const textId = textMessage.textMessages.id
        const newRow = { ...textMessage, textStatus, textSent, textId }
        return newRow
    })

    return (
        <Grid style={{ height: 650, width: '100%' }}
        margin={2}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </Grid>
    );
}
