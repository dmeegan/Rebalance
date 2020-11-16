import React from 'react';

import { Form, Button} from 'react-bootstrap';

export default function SignIn() {
    return (
        <Form className="customForm">
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