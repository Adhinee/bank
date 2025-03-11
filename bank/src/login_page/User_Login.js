import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './loginPage';
import React, { useState } from 'react';

const User_Login = () => {
  const history = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  async function submit(e) {
    e.preventDefault();

    // Clear previous errors
    setError('');
    setLoginSuccess(false);

    try {
      const response = await axios.post("https://bankdb-azure.vercel.app/login", { userName, password });

      if (response.data === "success") {
        try {
          const bank = await axios.get("https://bankdb-azure.vercel.app/getAcc");
          const user = bank.data.find(item => item.userName === userName);
          
          if (user) {
            const userData = { userName, userId: user.id };
            setLoginSuccess(true);
            
            // Redirect to Home page after setting login success
            setTimeout(() => {
              history('/Home', { state: userData });
            }, 1000); // Redirect after 1 second
          } else {
            setError('User not found.');
          }
        } catch (err) {
          setError('Error fetching user data.');
          console.log(err);
        }
      } else {
        setError(response.data);  // Set error if login fails
      }
    } catch (err) {
      setError('Login failed, please try again later.');
      console.log(err);
    }
  }

  return (
    <div>
      <Login
        Link={Link}
        userName={userName}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        error={error}
        loginSuccess={loginSuccess}
        submit={submit}
        user="admin"
        link="/adminlogin"
      />
    </div>
  );
};

export default User_Login;
