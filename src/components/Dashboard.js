import React, { Fragment, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {

    const { currentUser, signOut } = useAuth();

    const history = useHistory();

    const [error, setError] = useState('');

    const handleSignout = async () => {
        setError('');
        try {
            await signOut();
            history.push('/signin');
        } catch (error) {
            setError('Failed to sign out.')
        }
    }

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:{currentUser.email}</strong>
                    <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>Update profile</Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant="link" onClick={handleSignout}>Sign Out</Button>
            </div>
        </Fragment>
    )
}
