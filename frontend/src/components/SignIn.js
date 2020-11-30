import React from 'react';
import axios from 'axios';

import { Form, Button} from 'react-bootstrap';

const handleSignIn = (e) => {
    e.preventDefault()
    let request = {
        email : document.getElementById('SignInFormEmail').value,
        password : document.getElementById('SignInFormPassword').value,
    }
    axios.post('http://localhost:3000/register', request)
    .then( resp => {
        console.log('post received')
    })
    .catch( err => {
        console.log(err)
    })
};

export default function SignIn() {
    return (
        <Form className="customForm" onSubmit={(e) => handleSignIn(e)}>
            <h2>Sign in</h2>
            <Form.Group controlId="SignInFormEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control placeholder="Enter email" required type="email" />
            </Form.Group>
            <Form.Group controlId="SignInFormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control placeholder="Enter password" required type="password" />
            </Form.Group>
            <Button variant="primary" type="submit">Sign in</Button>
        </Form>
    )
}