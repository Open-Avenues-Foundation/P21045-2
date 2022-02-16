import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {Button} from '@mui/material'


export default function ContactsTable(props) { 
  const {contacts,selectedContacts,setSelectedContacts} = props
  const [selectedIndex,setSelectedIndex] = useState([])

  useEffect(() => {
console.log(selectedContacts)
  },[selectedContacts])
  
  useEffect(()=> {
    setSelectedContacts(contacts.filter((contact,index) =>{
      return  selectedIndex.includes(index+1)}))
  },[selectedIndex,contacts])
 
const StartButton = () => {
return (
<Button> start </Button>
)
}

 const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 130},
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      width: 125,
    },
    {field: 'city', headerName:'City', width:140},
    {field:'state', headerName:'State',width:130},
   
    {field:'lastOrderPrice',
    headerName:'Last Order Price',
    type: 'number',
    width:135,
    },
    
    {field:'lastOrderDate',
    headerName: 'Last Order Date',
    type:'number',
    width: 135,
    },
    {field:'',
    headerName:'Start',
    width:135, renderCell: StartButton,
    disableClickEventBubbling: true 
  }
  ];
  const rows = contacts
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        selectionModel={selectedIndex}
        onSelectionModelChange={(newSelectionModel) =>{setSelectedIndex(newSelectionModel)} } 
      />
    </div>
  );
}

