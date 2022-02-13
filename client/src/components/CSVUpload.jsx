import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"

const CSVUpload = () => {

    return(
        <main class="admin">
            <div class="admin__upload-file">
                <form action="http://localhost:1336/api/contact/upload" enctype="multipart/form-data" method="post">
                    <input type="file" class="admin__input" id="file_uploaded" name="file_uploaded" />
                    <input class="admin__submit" type="submit" />
                </form>
                <p>*File must be in CSV format with the following headers:</p>
                <p>firstName, lastName, email, city, state, phoneNumber, lastOrderPrice, lastOrderDate</p>
                <Button variant="link" ><Link to={'/'}>Back</Link></Button>
                
            </div>
        </main>
    )
}

export default CSVUpload
