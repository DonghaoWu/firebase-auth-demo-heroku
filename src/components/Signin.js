import React, { Fragment, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Signin() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const { signin } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handelSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signin(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (error) {
            setError(`Failed to sign in.`);
        }
        setLoading(false);
    }

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign In</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handelSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disable={`${loading}`} className="w-100" type="submit">Sign in</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>Need an account? <Link to='/signup'>Sign Up.</Link></div>
        </Fragment>
    )
}
