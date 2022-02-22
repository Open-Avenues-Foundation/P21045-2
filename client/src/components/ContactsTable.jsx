import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'



export default function ContactsTable(props) { 
  const {contacts,selectedContacts,setSelectedContacts} = props
  const [selectedIndex,setSelectedIndex] = useState([])

  useEffect(() => {
console.log(selectedContacts)
  },[selectedContacts])
  
  useEffect(()=> {
    setSelectedContacts(contacts.filter((contact,index) =>{
      return  selectedIndex.includes(index+1)}))
  }, [selectedIndex, contacts, setSelectedContacts])

 const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'header'},
    { field: 'email', headerName: 'Email', width: 250, headerClassName: 'header'},
    { field: 'firstName', headerName: 'First name', width: 150, headerClassName: 'header'},
    { field: 'lastName', headerName: 'Last name', width: 150, headerClassName: 'header' },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150, headerClassName: 'header'},
    { field: 'city', headerName: 'City', width: 150, headerClassName: 'header'},
    { field: 'state', headerName: 'State', width: 70, headerClassName: 'header'},
    { field: 'lastOrderPrice', headerName: 'Last Order Price', width: 150, headerClassName: 'header'},
    { field: 'lastOrderDate', headerName: 'Last Order Date', width: 150, headerClassName: 'header'}
  ];

  const rows = contacts

  return (
      <Box sx={{
        height: 530,
        width: '100%',
        '& .header': {
          backgroundColor: '#1976d2',
        },}} >
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

