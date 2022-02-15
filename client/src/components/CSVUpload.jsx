import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from 'axios'

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
        <main className="admin">
            <div className="admin__upload-file">
                            <form ref={formRef}>
                <div className="mui--text-dark-secondary mui--text-button">{message}</div>
                <div className="upload-box" onClick={handleClick}>
                    Click to Upload file (CSV) <hr />
                    {files[0] && files[0].name}
                </div>
                <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} />
                <button className="mui-btn mui-btn--primary" onClick={handleSubmit}>Submit</button>
            </form>
                <p>*File must have the following headers:</p>
                <p>firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate</p>
                <Button variant="outlined" ><Link to={'/'}>Back</Link></Button>
            </div>
        </main>
    )
}

export default CSVUpload


