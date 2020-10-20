import React, { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {

    const emailRef = useRef();

    const { resetPassword } = useAuth();

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handelSubmit(e) {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check yout inbox for further instructions.')
        } catch (error) {
            setError(`Failed to reset password.`);
        }
        setLoading(false);
    }

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handelSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disable={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        <Link to='/signin'>Sign in</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>Need an account? <Link to='/signup'>Sign Up.</Link></div>
        </Fragment>
    )
}
