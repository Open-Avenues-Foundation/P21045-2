import React from "react";
import {MenuItem, Select} from '@mui/material';

const ContactsSearchFilter = (props) => {
    const {filterProperty,setFilterProperty} = props
    return (
        <Select 
          variant= 'standard'
          value={filterProperty} 
          onChange={ (event) => {
            setFilterProperty(event.target.value)

          }  }   
         >
          <MenuItem value={'firstName'} >  First Name </MenuItem>
          <MenuItem value={'lastName'} > Last Name </MenuItem>
          <MenuItem value={'email'} > Email </MenuItem>
          <MenuItem value={'phoneNumber'} > Phone Number </MenuItem>
 
        </Select>
    )
}

export default ContactsSearchFilter 
