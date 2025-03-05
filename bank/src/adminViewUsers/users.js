import React, { useState, useEffect } from 'react';
import './userStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const API_URL = "mongodb+srv://bank:Bank%40123@cluster0.alh1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bank";

  const history = useNavigate();
  const location = useLocation();
  const user = location.state.id;

  const [description, setDescription] = useState('');
  const [cash, setCash] = useState('');
  const [cash2, setCash2] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  const [success, setSuccess] = useState(false);
  

  const URL ="https://bankdb-azure.vercel.app/";

  const URL2 ="https://bankdb-azure.vercel.app/";

  useEffect(() => {
    axios.get(URL + "getUser")
      .then(bank => {
        setItems(bank.data);
        setFilteredItem(bank.data.filter(item => item.id === user));
      })
      .catch(err => console.log(err));
  }, [user]);

  useEffect(() => {
    const totalAmount = filteredItem.reduce((sum, item) => sum + parseInt(item.cash)  , 0);
    setTotal(totalAmount);
  }, [filteredItem]);

  async function submit(e) {
    e.preventDefault();

    setError('');
    setSuccess(false);


    const id = items.length ? items[items.length - 1].id + 1 : 1;
    await axios.post(URL + "user", { description, cash, id, user });

    axios.get(URL+"getUser")
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
    <div className='bg-blue-900 w-full h-screen -mb-3 font-dmsans'>
      <h1 className='text-white p-4 font-dmsans font-bold w-full text-lg  text-center'>  {user} {userName}'s Data </h1>


      <div className=' h-1 w-full bg-black'> </div>

      {success && <p className="text-green-400">Data saved successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form action="POST" className="data">
          <div className='grid'>
          <input
            required 
            onChange={(e) => setDescription(e.target.value) }
            type="text"
            id="name"
            name="name"
            value={description}
            className="p-3 m-2 border-b-2 bg-transparent text-white border-solid border-0 focus:border-b-2  focus:border-none border-white"
            placeholder="Description"
            
          />


          <input
            required 
            onChange={(e) => { setCash(e.target.value) }}
            type="number"
            id="phone"
            name="phone"
            value={cash}
            placeholder="Cash"
            className="p-3 m-2 border-b-2 text-white bg-transparent border-solid border-0 focus:border-0 border-white"
           
          />
        </div>
        
        <div className="grid">
          <input
            type="submit"
            onClick={submit}
            value="Save"
            className="bg-orange-600 p-2 rounded-lg text-white m-2 "
          />
        </div>
      </form>


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

export default Users;
