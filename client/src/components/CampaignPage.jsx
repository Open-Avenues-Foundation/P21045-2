import React from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const CampaignPage = () => {
    return (
        <div>
            <h1>This Is The Campaign Page</h1>
            <NavLink to='/'>
                <Button>Go Back</Button>
            </NavLink>
        </div>
    )
}

export default CampaignPage