import React from 'react';
import {MenuItem, Select } from '@mui/material';


const CampaignSearchFilter = (props) => {
    const {filterProperty,setFilterProperty} = props
    return (
    
        <Select
        value={filterProperty} 
        onChange={ (event) => {
          setFilterProperty(event.target.value)

        }  }   
         >
          <MenuItem value={'name'} > Campaign Name </MenuItem>
          <MenuItem value={'message'} > Message </MenuItem>
          <MenuItem value={'status'} >Status </MenuItem>
 
        </Select>
        
  
    )
 }

export default CampaignSearchFilter 
