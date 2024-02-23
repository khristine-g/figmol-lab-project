import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the AuthContext

import '../Navbar.css';

function Navbar() {
  const { user } = useAuth(); // Get user details from AuthContext


  console.log("User details:", user);

  return (
    <div className='navbar-container'>
      <nav className="navbar" >
        <ul className='nav-list'>
          <li className='home-nav'> 
            <Link className="nav-list-item" to="/">
              Home
            </Link>
          </li>

          <li> 
            <Link className="nav-list-item" to="/quizzes/titles">
              Go to Titles
            </Link>
          </li>

          <li> 
            <Link className="nav-list-item" to="/quizzes/titles">
              About 
            </Link>
          </li>

          <li> 
            <Link className="nav-list-item" to="/signup">
              Signup
            </Link>
          </li>
    
          <li> 
            <Link className="nav-list-item" to="/login">
              Login
            </Link>
          </li>

          {user && user.isAdmin && ( // Only render for logged-in admins
            <>
              <li> 
                <Link className="nav-list-item" to="/admin-dashboard">
                  Admin
                </Link>
              </li>
              <li> 
                <Link className="nav-list-item" to="/quizzes/:id">
                  Quiz Editor
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
