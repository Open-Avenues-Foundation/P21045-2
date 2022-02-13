import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"

const CSVUpload = () => {

    return(
        <main className="admin">
            <div className="admin__upload-file">
                <form action="http://localhost:1336/api/contact/upload" encType="multipart/form-data" method="post">
                    <input type="file" className="admin__input" id="file_uploaded" name="file_uploaded" />
                    <input className="admin__submit" type="submit" />
                </form>
                <p>
                <div>*File must be in CSV format with the following headers:</div>
                <div>firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate</div>
                </p>
                <Button variant="link" ><Link to={'/'}>Back</Link></Button>
                
            </div>
        </main>
    )
}

export default CSVUpload
