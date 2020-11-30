import React from 'react';
import axios from 'axios';

import { Form, Button} from 'react-bootstrap';

export default function Register() {

    const handleRegister = (e) => {
        e.preventDefault()
        let request = {
            firstName : document.getElementById('RegisterFormFirstName').value,
            lastName : document.getElementById('RegisterFormLastName').value,
            email : document.getElementById('RegisterFormEmail').value,
            password : document.getElementById('RegisterFormPassword').value,
        }
        axios.post('http://localhost:3000/register', request)
        .then( resp => {
            console.log('post received')
        })
        .catch( err => {
            console.log(err)
        })
    };

   return (
        <Form className="customForm" onSubmit={(e) => handleRegister(e)}>
            <h2>Register</h2>
            <Form.Group controlId="RegisterFormFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="Enter first name" required type="text" />
            </Form.Group>
            <Form.Group controlId="RegisterFormLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Enter last name" required type="text" />
            </Form.Group>
            <Form.Group controlId="RegisterFormEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control placeholder="Enter email" required type="email" />
            </Form.Group>
            <Form.Group controlId="RegisterFormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control placeholder="Enter password" required type="password" />
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
        </Form>
    ) 
}