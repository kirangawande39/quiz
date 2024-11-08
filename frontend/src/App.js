

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
import Register from './components/Register';
import SignIn from './components/singin';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/quiz" element={<Quiz />} />
            </Routes>
        </Router>
    );
};


export default App;

