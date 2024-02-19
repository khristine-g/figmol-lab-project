import React, { useState } from 'react';
import '../Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = ({ csrfToken }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setError('');

    // Check if passwords match
    if (value !== password) {
      setError('Passwords do not match.');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Obtain the JWT token by authenticating the user
      const authResponse = await fetch('http://localhost:3000/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name,
            email,
            password,
            confirmPassword,
          },
        }),
      });

      if (!authResponse.ok) {
        throw new Error('Authentication failed');
      }

      const authData = await authResponse.json();
      const accessToken = authData.access; // Extract the access token

      // Use the access token to make the signup request
      const signupResponse = await fetch('http://localhost:3000/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          user: {
            name,
            email,
            password,
            password_confirmation: confirmPassword, // Use password_confirmation instead of confirmPassword
          },
        }),
        
      });

      if (signupResponse.ok) {
        navigate('/login');
      } else {
        const errorMessage = await signupResponse.text();
        if (errorMessage.includes('already exists')) {
          setError('A user with this name or email already exists.');
        } else {
          setError(`Signup failed: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              required
            />
            {!name && <p className="input-error-message">Name is required.</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {!email && <p className="input-error-message">Email is required.</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {!password && <p className="input-error-message">Password is required.</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmPassword !== password && (
              <p className="input-error-message">Passwords do not match.</p>
            )}
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;