import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const CSVUpload = ({ resetForm }) => {

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
        <Container className="admin">
            <Box className="admin__upload-file">
            <form ref={formRef}>
                <div className="mui--text-dark-secondary mui--text-button">{message}</div>
                <div className="upload-box" onClick={handleClick}>
                    Click to Upload file (CSV) <hr />
                    {files[0] && files[0].name}
                </div>
                <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} />
                <Button className="mui-btn mui-btn--primary" onClick={handleSubmit}>Submit</Button>
            </form>
                <p>*File must have the following headers:</p>
                <p>firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate</p>
                <Link to={'/'}><Button variant="contained" >Back</Button></Link>
            </Box>
        </Container>
    )
}

export default CSVUpload


