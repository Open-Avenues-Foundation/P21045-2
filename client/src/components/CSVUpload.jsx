import React from "react";
import { Link } from "react-router-dom";

const CSVUpload = () => {

    return(
        <main class="admin">
            <div class="admin__upload-file">
                <form action="http://localhost:1336/api/contact/upload" enctype="multipart/form-data" method="post">
                    <input type="file" class="admin__input" id="file_uploaded" name="file_uploaded" />
                    <input class="admin__submit" type="submit" />
                </form>
                <p>*File must be in CSV format</p>
                <Link to={'/'}>Back</Link>
            </div>
        </main>
    )
}

export default CSVUpload
