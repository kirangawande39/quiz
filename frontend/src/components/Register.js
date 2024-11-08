
import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !password || !email) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/register', {
                username,
                email,
                password
            });

            if (response.data.message === 'User registered successfully') {
                setSuccess(true);
                setError('');
                setTimeout(() => {
                    navigate('/signin');  
                }, 2000); 
            } else {
                setError(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'An error occurred during registration');
        }
    };

    const sign = () => {
        navigate('/signin');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="p-4" style={{ maxWidth: '400px', width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '15px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4" style={{ color: '#007bff' }}>Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Registration successful! Redirecting to sign-in...</Alert>}
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ borderRadius: '10px' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ borderRadius: '10px' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ borderRadius: '10px' }}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" style={{ borderRadius: '10px' }}>
                            Register
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={sign}
                            className="w-100 mt-3"
                            style={{ borderRadius: '10px' }}
                        >
                            Sign In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;
