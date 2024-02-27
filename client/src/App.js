

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


import { AuthProvider } from './components/AuthContext';


function App() {

 
  return (
    <AuthProvider>
    <Router>
      <Navbar />

      <Routes>
      <Route path="/quiz/:id" element={<Quiz />} />

        <Route path="/quizzes/titles" element={<QuizTitles />} />
        <Route path="/" element={<Home   />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quizzes/:title" element={<QuizTitle />} />
         <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
         <Route path="/quizzes/title" element={<QuizEditor />} />


          

      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

