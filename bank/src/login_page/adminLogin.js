import React, { useState } from 'react';
import './loginPgStyle.css';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const User_Login = () => {
  const history = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // For success notification

  async function submit(e) {
    e.preventDefault();

    // Clear previous errors
    setError('');
    setLoginSuccess(false); // Reset success message

    try {
      const response = await axios.post("https://bankdb-azure.vercel.app/login", { userName, password });

      if (response.data === "success") {
        // Pass the user data (like userId or userName) to the Home page
        const userData = { id: userName }; // You can change this to actual user data (e.g. user.id from DB)

        // Redirect to Home page with state (pass user data via state)
        setLoginSuccess(true);
        setTimeout(() => {
          history('/AdminHome', { state: userData });
        }, 0); // Redirect after 1.5 seconds to show success message
      } else {
        setError(response.data);  // Set error if login fails
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div>
    <div className='login-change-btn'>
      <Link to="/">
         <button>User Login</button>
      </Link>
    </div>
    <div className="login">
      <h4>Admin Login</h4>
      <form className='form' action="POST">
              <div className="text_area">
                <label htmlFor=""><FaUserAlt /> Username</label>
                <input
                  value={userName} // Value bound to state
                  onChange={(e) => { setUserName(e.target.value) }}
                  type="text"
                  id="username"
                  name="username"
                  className="text_input"
                  placeholder="Type your username"
                />
              </div>
      
              <div className="text_area">
                <label htmlFor=""><RiLockPasswordFill /> Password</label>
                <input
                  value={password} // Value bound to state
                  onChange={(e) => { setPassword(e.target.value) }}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Type your password"
                  className="text_input"
                />
              </div>
      

        {error && <div className="error">{error}</div>} {/* Display error message */}
        {loginSuccess && <div className="success">Login Successful!</div>} {/* Display success notification */}

        <div className="btns">
          <input
            type="submit"
            onClick={submit}
            value="LOGIN"
            className="btn"
          />

          <Link to="/Signup" className="link">
            SIGN UP
          </Link>
        </div>
      </form>
    </div></div>
  );
}

export default User_Login;
