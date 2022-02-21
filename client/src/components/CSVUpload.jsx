import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from 'axios'
import Container from '@mui/material/Container'

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
            axios.post('http://localhost:1336/api/contact/upload', formData)
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
        <Container>
            <form ref={formRef}>    
                <div>{message}</div>
                <div onClick={handleClick}>
                    Click to Upload file (CSV) <hr />
                    {files[0] && files[0].name}
                </div>
                <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} />
                <Button onClick={handleSubmit}>Submit</Button>
            </form>
                <p>*File must have the following headers:</p>
                <p>firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate</p>
                <Link to={'/'}><Button variant="contained" >Back</Button></Link>
        </Container>
    )
}

export default CSVUpload


