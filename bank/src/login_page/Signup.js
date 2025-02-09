import React, { useState } from 'react';
import './loginPgStyle.css';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const Signup = () => {




  

    const API_URL = "mongodb+srv://bank:Bank%40123@cluster0.alh1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bank"






  const history = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [items,setItems]=useState([])
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // For success message


  useEffect( () => {
    axios.get("https://bankdb-azure.vercel.app/getAcc")
    .then(bank => setItems(bank.data))
    .catch(err => console.log(err))


  } , [])
  async function submit(e) {
    e.preventDefault();

    axios.get("https://bankdb-azure.vercel.app/getAcc")
    .then(bank => setItems(bank.data))
    .catch(err => console.log(err))

    // Clear previous errors and success messages
    setError('');
    setSuccess(false);

    try {
      const id = items.length? items[items.length-1].id+1 : 1;
      const response = await axios.post("https://bankdb-azure.vercel.app/Signup", { userName, password ,id});

      if (response.data === "Username is already taken") {
        setError(response.data);  // Show error if username is already taken
      } else {
        setSuccess(true);  // Show success message if signup is successful
        setUserName(''); // Clear username field
        setPassword(''); // Clear password field
        setId('');
  const userData = { username: userName };
        setTimeout(() => {
          history('/Home', { state: userData }); // Redirect to login page after success
        }, 1000); // 1 seconds delay to show the success message
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="login">
      <h4>User Sign Up</h4>
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
        {success && <div className="success">Sign up successful! Redirecting to login...</div>} {/* Display success message */}

        <div className="btns">
          <input
            type="submit"
            onClick={submit}
            value="SIGN UP"
            className="btn"
          />
        </div>
      </form>
    </div>
  );
}

export default Signup;
