import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
// import { Link as ScrollLink } from 'react-scroll';

import '../Navbar.css';

function Navbar() {
  const { user } = useAuth(); 


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
               Quizes
            </Link>
          </li>

          {/* <li> 
          <ScrollLink className="nav-list-item" to="about" smooth={true} duration={500}>
              About
            </ScrollLink>
          </li>
          <li> 
           
          <ScrollLink className="nav-list-item" to="contact" smooth={true} duration={500}>
              Contact
            </ScrollLink>
            
          </li> */}

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

          {user && user.is_admin === true && (
  <>
    <li>
      <Link className="nav-list-item" to="/admin-dashboard">
        Admin
      </Link>
    </li>
    <li>
      <Link className="nav-list-item" to="/quizzes/title">
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
