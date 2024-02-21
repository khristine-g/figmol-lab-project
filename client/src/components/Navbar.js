import React from 'react';
import { Link } from 'react-router-dom';

import '../Navbar.css';

function Navbar() {
  return (
    <div className='navbar-container'>
    <nav className="navbar" >

    <ul className='nav-list'>
    <li> 
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
    <Link className="nav-list-item" to="/signup">
            Signup
          </Link>
  </li>
    
    <li> 
    <Link className="nav-list-item" to="/login">
            Login
          </Link>

  </li>
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
      
      
      
      
     
          
      </ul>
      
    </nav>
    </div>
  );
}

export default Navbar;


