import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const NavBar = () => {

    return(
        <div>
            <>
                <Button variant="outline-dark"><Link to={'/contact/upload'}>Upload Contacts</Link></Button>{' '}
                <Button variant="outline-dark">Dark</Button>
            </>
        </div>
    )
}

export default NavBar