// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import QuizTitle from './components/QuizTitle';
import QuizTitles from './components/QuizTitles'; 
import AdminDashboard from './components/AdminDashboard';
import QuizEditor from './components/QuizEditor';


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
      <Route path="/quiz/:id" element={<Quiz />} />

        <Route path="/quizzes/titles" element={<QuizTitles />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
        <Route path="/quizzes/:id" element={<QuizEditor />} /> 
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quizzes/:title" element={<QuizTitle />} />
      </Routes>
    </Router>
  );
}

export default App;

