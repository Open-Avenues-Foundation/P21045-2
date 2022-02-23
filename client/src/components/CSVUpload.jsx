import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Typography from'@mui/material/Typography'

const CSVUpload = ( ) => {

    const [files, setFiles] = useState([]);
    const inputRef = useRef(null);
    const formRef = useRef(null);
    const [message, setMessage] = useState('');

    const handleClick = () => inputRef && inputRef.current && inputRef.current.click();
    const handleFiles = (e) => setFiles(e.target.files ? e.target.files : []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (files.length > 0) {
            const formData = new FormData();
            formData.append('file_uploaded', files[0]);
            axios.post('/api/contact/upload', formData)
                .then(data => setMessage(data.data))
                .catch((error) => setMessage('Unable to upload file. Please check formating'));
            setFiles([]);
            formRef.current && formRef.current.reset();
            setTimeout(() => {
                setMessage('');
            }, 6000);
        }
    }
    return(
        <Grid padding={3}>
                <Grid>
                    <form ref={formRef}>
                        <div>{message}</div>
                        <div onClick={handleClick}>
                            Click to Upload file (CSV) <hr />
                            {files[0] && files[0].name}
                        </div>
                        <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} />
                        <Button onClick={handleSubmit}>Submit</Button>
                    </form>
                    <Grid padding={2}>
                        <Typography variant='p'>*File must have the following headers:</Typography>
                    </Grid>
                    <Typography variant='p'>firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate</Typography>
                </Grid>
                <Grid padding={2}>
                    <Link to={'/'}><Button variant="contained" >Back</Button></Link>
                </Grid>
        </Grid>
    )
}

export default CSVUpload


