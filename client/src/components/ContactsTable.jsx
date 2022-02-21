import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid'

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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 250},
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'city', headerName: 'City', width: 150},
    { field: 'state', headerName: 'State', width: 70},
    { field: 'lastOrderPrice', headerName: 'Last Order Price', width: 150 },
    { field: 'lastOrderDate', headerName: 'Last Order Date', width: 150,}
  ];

  const rows = contacts

  return (
    <Grid style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        selectionModel={selectedIndex}
        onSelectionModelChange={(newSelectionModel) =>{setSelectedIndex(newSelectionModel)} } 
      />
    </Grid>
  );
}

