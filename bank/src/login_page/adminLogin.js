import React, { useState } from 'react';
import './loginPgStyle.css';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Form from './form';

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
      <Form 
      Link={Link}
      userName={userName}
      setUserName={setUserName}
      password={password}
      setPassword={setPassword}
      error={error}
      loginSuccess={loginSuccess}
      submit={submit}
      user="admin"

      />
    </div>
  );
}

export default User_Login;
