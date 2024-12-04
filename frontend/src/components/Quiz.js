
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentResultPDF from './StudentResultPDF';
import { Button, Container, Row, Col, Card, Spinner, Table, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Quiz.css';  // Import custom CSS file for enhanced styling

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState([]);
    const [category, setCategory] = useState('linux');

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://quizapi.io/api/v1/questions?apiKey=JJs83WmAqmTzEQUxZZxyvBC0rzh6X5Ouc042CsGv&category=${category}&difficulty=Easy&limit=10`
                );
                setQuestions(response.data);
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setScore(0);
                setIsCompleted(false);
                setUserAnswers([]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [category]);

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const handleAnswer = (answer, correctAnswer) => {
        setSelectedAnswer(answer);
        const isCorrect = answer === correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
        }

        setUserAnswers(prevAnswers => [
            ...prevAnswers,
            {
                question: questions[currentQuestionIndex].question,
                answer,
                correctAnswer,
                isCorrect
            }
        ]);

        setTimeout(() => {
            const nextQuestionIndex = currentQuestionIndex + 1;
            if (nextQuestionIndex < questions.length) {
                setCurrentQuestionIndex(nextQuestionIndex);
                setSelectedAnswer(null);
            } else {
                setIsCompleted(true);
            }
        }, 1000);
    };

    if (isLoading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" className="spinner-custom">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (isCompleted) {
        return (
            <Container className="mt-5">
                <Card className="p-4 quiz-card-completed shadow-lg">
                    <Card.Body>
                        <h2 className="text-center text-success">Quiz Completed!</h2>
                        <p className="text-center">Your Score: <strong>{score}/{questions.length}</strong></p>
                        <div className="table-responsive">
                            <Table striped bordered hover className="mt-4 result-table">
                                <thead className="bg-info text-white">
                                    <tr>
                                        <th>#</th>
                                        <th>Question</th>
                                        <th>Your Answer</th>
                                        <th>Correct Answer</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userAnswers.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={item.isCorrect ? 'table-success' : 'table-danger'}
                                        >
                                            <td>{index + 1}</td>
                                            <td>{item.question}</td>
                                            <td>{item.answer}</td>
                                            <td>{item.correctAnswer}</td>
                                            <td>{item.isCorrect ? 'Correct' : 'Incorrect'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        <Button variant="primary" href="/" className="mt-3">Go Home</Button>
                        <StudentResultPDF userAnswers={userAnswers} score={score} totalQuestions={questions.length} />
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const answers = Object.values(currentQuestion.answers).filter(Boolean);

    const answerOptions = ['A', 'B', 'C', 'D'].map((label, index) => ({
        label,
        value: answers[index]
    }));

    const correctAnswerKey = Object.keys(currentQuestion.correct_answers).find(
        key => currentQuestion.correct_answers[key] === 'true'
    );
    const correctAnswer = currentQuestion.answers[correctAnswerKey.replace('_correct', '')];

    const getButtonVariant = (answer) => {
        if (!selectedAnswer) return 'outline-primary';
        if (answer === correctAnswer) return 'success';
        if (answer === selectedAnswer) return 'danger';
        return 'secondary';
    };

    return (
        <Container className="mt-5">
            <Card className="p-4 quiz-card shadow-lg">
                <Card.Body>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="info" id="dropdown-basic" className="w-100 text-center custom-dropdown">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100">
                            <Dropdown.Item onClick={() => handleCategoryChange('devops')}>DevOps</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCategoryChange('programming')}>Programming</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCategoryChange('databases')}>Databases</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCategoryChange('linux')}>Linux</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <h2 className="mt-4 text-center text-info">{currentQuestion.question}</h2>
                    <Row className="mt-4">
                        {answerOptions.map((option, index) => (
                            <Col xs={12} md={6} className="mb-3" key={index}>
                                <Button
                                    variant={getButtonVariant(option.value)}
                                    className="w-100 answer-button"
                                    onClick={() => handleAnswer(option.value, correctAnswer)}
                                    disabled={!!selectedAnswer}
                                >
                                    {option.label}. {option.value}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Quiz;






















