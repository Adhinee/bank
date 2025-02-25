import React, { useState } from 'react';
import './loginPgStyle.css';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


const login = ({link,user,Link,userName,setUserName,password,setPassword,error,loginSuccess,submit}) => {
  

  
  return (
    <div className='bg-hero h-screen flex w-90'>
      <div >
        <Link to={link}>
          <button className=' bg-green-500 rounded-xl absolute p-3 m-4 text-xl top-0  right-0'> {user} </button>
        </Link>
      </div>
    <div className="login bg-slate-100 w-auto h-auto mx-auto rounded-xl my-auto  p-6 shadow-xl shadow-black">
      <h4 className='text-center text-zinc-800 text-2xl font-extrabold font-mono'>User Login</h4>
      <form className='form  text-xl font-sans grid'action="POST">
              <div className="text_area p-3 ">
                <label htmlFor="" className='flex '><FaUserAlt className='mr-3'/> Username</label>
                <input
                  value={userName} // Value bound to state
                  onChange={(e) => { setUserName(e.target.value) }}
                  type="text"
                  id="username"
                  name="username"
                  className="text_input rounded-lg p-1 border-2 border-gray-600 shadow-lg "
                  placeholder="Type your username"
                />
              </div>
      
              <div className="text_area p-3">
                <label htmlFor="" className='flex'><RiLockPasswordFill className='mr-3' /> Password</label>
                <input
                  value={password} // Value bound to state
                  onChange={(e) => { setPassword(e.target.value) }}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Type your password"
                  className="text_input rounded-lg p-1 border-2 border-gray-600 shadow-lg"
                />
              </div>
      

        {error && <div className="error">{error}</div>} {/* Display error message */}
        {loginSuccess && <div className="success">Login Successful!</div>} {/* Display success notification */}

        <div className="btns flex mt-9  mx-auto">
          <input
            type="submit"
            onClick={submit}
            value="LOGIN"
            className="btn shadow-lg  bg-purple-400 rounded-2xl w-24 h-auto  mr-7 p-2 text-xl hover:cursor-pointer "
          />

          <Link to="/Signup" className="link  bg-blue-500 rounded-2xl w-24 h-auto p-2 text-xl shadow-lg">
            SIGN UP
          </Link>
        </div>
      </form>
    </div></div>
  )
}

export default login