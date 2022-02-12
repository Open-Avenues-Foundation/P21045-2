import React from "react";

const CSVUpload = () => {

    return(
        <main class="admin">
            <div class="admin__upload-file">
                <form action="http://localhost:1336/api/contact/upload" enctype="multipart/form-data" method="post">
                    <input type="file" class="admin__input" id="file_uploaded" name="file_uploaded" />
                    <input class="admin__submit" type="submit" />
                </form>
            </div>
        </main>
    )
}

export default CSVUpload
