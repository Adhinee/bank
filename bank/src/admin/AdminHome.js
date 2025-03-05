import React, { useEffect } from 'react'
import './adminStyle.css';
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminHome = () => {
  const history = useNavigate();
  const [username,setUsername] = useState('')
  const [items,setItems]=useState([])
  const navigate = useNavigate();
    const API_URL = "mongodb+srv://bank:Bank%40123@cluster0.alh1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bank"

    useEffect( () => {
      axios.get("https://bankdb-azure.vercel.app/getAcc")
      .then(bank => setItems(bank.data))
      .catch(err => console.log(err))


    } , [])
    const handleClick = (id, username) => {
      const userData = { id: id ,userName: username};
      history('/users', { state: userData }); 
      
    };

    return (
      (items.length) ? (
          <div className='bg-hero  bg-cover h-screen flex flex-col  w-90'>
            <div className=' text-purple-950 bg-white p-2 font-bold text-lg w-full text-center  mx-auto'>
              Accounts & Cards
            </div>

            <div className='bg-purple-950 h-2 p-4 w-screen'>

            </div>
          <div className='bg-slate-500 text-purple-950 p-2 font-bold'>
            ACCOUNTS
          </div>

            <ul className='w-full bg-black font-dmsans '>

              {items.map((n) => (
                <li key={n.id} className=' bg-slate-300 flex py-2 my-0.5'
                onClick={() => handleClick(n.id,n.userName)}>

                  <div className='mx-2'>
      

                  <div className=' text-lg font-dmsans   text-gray-700 '
                  >
                      {n.userName}

                  </div>

                    <div className='text-lg  font-bold text-orange-700'>
                      1500.00
                    </div>
                      
                    </div>

                  <div className='absolute right-0 mr-7 my-0.5' 
                  >{n.id}</div>
      
      
                </li>
              ))}
            </ul>
          </div>
        ) : (<p className='empty'>Your List Is Empty </p>)
      )
}

export default AdminHome