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
          <div className='contented'>
            <ul>
              {items.map((n) => (
                <li key={n.id}
                onClick={() => handleClick(n.id,n.userName)}
                
                >
      
                  <div className='label2'
                  >
                      {n.userName}
                      
                      
                  </div>

                  <div className='label2' 
                  >{n.id}</div>
      
      
                </li>
              ))}
            </ul>
          </div>
        ) : (<p className='empty'>Your List Is Empty </p>)
      )
}

export default AdminHome