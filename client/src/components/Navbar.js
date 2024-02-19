import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success ">
      <Link className="navbar-brand " to="/">
        FIGMOL LAB
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ">
          <Link className="nav-item nav-link text-white" to="/quizzes/titles">
            Go to Titles
          </Link>
          <Link className="nav-item nav-link text-white" to="/signup">
            Signup
          </Link>
          <Link className="nav-item nav-link text-white" to="/login">
            Login
          </Link>
          <Link className="nav-item nav-link text-white" to="/admin-dashboard">
            Admin
          </Link>
          <Link className="nav-item nav-link text-white" to="/quiz-form">
            QuizForm
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


