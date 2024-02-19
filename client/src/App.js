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
import QuizTitles from './components/QuizTitles'; // Import QuizTitles
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quizzes/titles" element={<QuizTitles />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add AdminDashboard route */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quizzes/:title" element={<QuizTitle />} />
      </Routes>
    </Router>
  );
}

export default App;

