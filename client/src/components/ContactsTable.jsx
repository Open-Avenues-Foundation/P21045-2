import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom';


export default function ContactsTable(props) { 
  const {contacts,setSelectedContacts} = props
  const [selectedIndex,setSelectedIndex] = useState([])

  useEffect(()=> {
    setSelectedContacts(contacts.filter((_,index) =>{
      return  selectedIndex.includes(index+1)}))
  }, [selectedIndex, contacts, setSelectedContacts])

 const columns = [
    { field: 'id', headerName: '#', width: 70},
    { field: 'email', headerName: 'Email', width: 250},
    { field: 'firstName', headerName: 'First name', width: 150},
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150},
    { field: 'city', headerName: 'City', width: 150},
    { field: 'state', headerName: 'State', width: 70},
    { field: 'lastOrderPrice', headerName: 'Last Order Price', width: 150},
    { field: 'lastOrderDate', headerName: 'Last Order Date', width: 150},
    { field: '', headerName: '', width: 150, renderCell: (cellValues) => {
      return <Link to={`contact/${cellValues.row.id}`}>More Info</Link>
    }}
  ];

  const rows = contacts

  return (
      <Box sx={{
        height: 530,
        width: '100%'}}
        paddingLeft={5}
        paddingRight={5}
        >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          selectionModel={selectedIndex}
          onSelectionModelChange={(newSelectionModel) =>{setSelectedIndex(newSelectionModel)} } 
        />
      </Box>
  );
}

