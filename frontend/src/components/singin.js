
import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('All fields are required');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5001/login', {
                email,
                password
            });
            if (response.data.message === 'Login successful') {
                setSuccess(true);
                setError('');
                setTimeout(() => {
                    navigate('/quiz');
                }, 2000); // Navigate to Quiz after 2 seconds
            } else {
                setError('Login failed');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred during login');
        }
    };

    const register = () => {
        navigate('/');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px', border: 'none' }}>
                <Card.Body>
                    <h2 className="text-center mb-4" style={{ color: '#007bff', fontWeight: 'bold' }}>Sign In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Login successful! Redirecting to quiz...</Alert>}
                    <Form onSubmit={handleSignIn}>
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

                        <Button variant="primary" type="submit" className="w-100" style={{ borderRadius: '10px', fontWeight: 'bold' }}>
                            Sign In
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={register}
                            className="w-100 mt-3"
                            style={{ borderRadius: '10px', fontWeight: 'bold' }}
                        >
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignIn;
