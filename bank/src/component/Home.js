import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import axios from 'axios';


const Home = () => {
  const location = useLocation()
  
  const API_URL = "mongodb+srv://bank:Bank%40123@cluster0.alh1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bank";

  const history = useNavigate();
  const user = location.state.id;

  const [description, setDescription] = useState('');
  const [cash, setCash] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get("https://bankdb-azure.vercel.app/getUser")
      .then(bank => {
        setItems(bank.data);
        setFilteredItem(bank.data.filter(item => item.id === user));
      })
      .catch(err => console.log(err));
  }, [user]);

  useEffect(() => {
    const totalAmount = filteredItem.reduce((sum, item) => sum + parseInt(item.cash), 0);
    setTotal(totalAmount);
  }, [filteredItem]);

  async function submit(e) {
    e.preventDefault();

    setError('');
    setSuccess(false);

    const id = items.length ? items[items.length - 1].id + 1 : 1;
    await axios.post("https://bankdb-azure.vercel.app/user", { description, cash, id, user });

    axios.get("https://bankdb-azure.vercel.app/getUser")
      .then(bank => {
        setItems(bank.data);
        setFilteredItem(bank.data.filter(item => item.id === user));
      })
      .catch(err => console.log(err));

    setSuccess(true);
    setDescription('');
    setCash('');
  }

  const userName = location.state.userName;

  return (
    <div>
      <h1>{user} {items[1].id} {userName} Data</h1>



  <div className='bg-slate-800 m-2 p-2'>
      <ul className='w-full bg-lime-200 mt-6 font-dmsans '>
        <li className=' py-5'>
          <div className='absolute -mt-2 left-10'>Description</div>
          <div className='absolute  -mt-2 right-10'>Amount</div>
        </li>
      </ul>

      <ul className='font-dmsans '>
        {filteredItem.map(filteredItem => (
          <li key={filteredItem.id}  className=' bg-transparent border-white text-white border-b-2 border-solid flex my-0.5 h-9'>

      <div className='mx-2 py-2 '>
      
      <div className='absolute -mt-2 left-10 text-lg font-dmsans  '>
        {filteredItem.description}

      </div>

        <div className='text-lg absolute -mt-2   font-bold 0  right-10'>
          {filteredItem.cash}.00
        </div>
          
        </div>

          </li>
        ))}
      </ul>

      <ul className='w-full bg-green-600 mt-6 font-dmsans '>
        <li className=' py-5'>
          <div className='absolute -mt-2 left-10'>Total</div>
          <div className='absolute  -mt-2 right-10'>{total}.00</div>
        </li>
      </ul>

    </div>





        
    </div>
  );
}

export default Home
