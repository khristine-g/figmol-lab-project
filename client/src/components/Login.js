import React, { useState, useEffect } from 'react';
import '../Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  useEffect(() => {
    console.log('User details in effect:', user);
  }, [user]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from server:', data);

        // Save token to localStorage
        localStorage.setItem('authToken', data.token);

        // Set the user in the context
        setUser(data);

        // Navigate after the state has been updated
        navigate('/');
      } else {
        const errorMessage = await response.text();
        setError(`Login failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleEmailChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
          />
        </div>

      <Link to="/forgot-password">Forgot Password?</Link>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>




    </>
  );
};

export default Login;


// import React, { useState,useEffect } from 'react';
// import '../Login.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Import the useAuth hook

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setUser, user } = useAuth(); // Destructure user from useAuth

//   useEffect(() => {
//     console.log('User details in effect:', user);
//   }, [user]);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('http://127.0.0.1:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Response from server:', data);

//         // Log the user details before setting
//         console.log('User details before setting:', data.user);

//         // Set the user in the context
//         setUser(data);

//         // Log the user details after setting
//         console.log('User details after setting:', data);

     

//         // Navigate after the state has been updated
//         navigate('/');
//       } else {
//         const errorMessage = await response.text();
//         setError(`Login failed: ${errorMessage}`);
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('An unexpected error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="login-form-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <div className="form-group">
//           <label htmlFor="email">Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             aria-describedby="emailHelp"
//             placeholder="Enter email"
//             value={email}
//             onChange={handleEmailChange}
//             disabled={loading}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             placeholder="Password"
//             value={password}
//             onChange={handlePasswordChange}
//             disabled={loading}
//           />
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit" className="login-btn" disabled={loading}>
//           {loading ? 'Logging in...' : 'Log In'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


