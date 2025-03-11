import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
  const location = useLocation()
  
  const API_URL = "mongodb+srv://bank:Bank%40123@cluster0.alh1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bank";

  const userId = location.state.userId;

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
        setFilteredItem(bank.data.filter(item => item.id === userId));
      })
      .catch(err => console.log(err));
  }, [userId]);

  useEffect(() => {
    const totalAmount = filteredItem.reduce((sum, item) => sum + parseInt(item.cash), 0);
    setTotal(totalAmount);
  }, [filteredItem]);

  async function submit(e) {
    e.preventDefault();

    setError('');
    setSuccess(false);

    const id = items.length ? items[items.length - 1].id + 1 : 1;
    await axios.post("https://bankdb-azure.vercel.app/user", { description, cash, id, userId });

    axios.get("https://bankdb-azure.vercel.app/getUser")
      .then(bank => {
        setItems(bank.data);
        setFilteredItem(bank.data.filter(item => item.id === userId));
      })
      .catch(err => console.log(err));

    setSuccess(true);
    setDescription('');
    setCash('');
  }

  const userName = location.state.userName;
  const dvv = (cash) => { return <div className=' text-lg font-extrabold text-orange-500'>{cash}.00</div>}






  return (
    <div className='bg-blue-900 w-full h-screen -mb-3 font-dmsans'>
      <h1  className='text-white bg-purple-950 p-2 font-bold text-lg w-full h-10 text-center  mx-auto'>
       
        <div className='left-3 absolute '>
        ID: {userId} 
        </div> 

        <div className='right-10 absolute '>
        USER: {userName}
        </div> </h1>
      

      
      <div className='bg-slate-800  '>
      <ul className='w-full bg-green-600 mt- font-dmsans'>
        <li className='font-extrabold py-5 text-black'>
          <div className='absolute -mt-2 left-10'>Description</div>
          <div className='absolute  -mt-2 right-10'>Amount</div>
        </li>
      </ul>

      <ul className='font-extrabold '>
        

      {filteredItem.map((filteredItem) => (
                <li  key={filteredItem.id} className=' bg-slate-300 py-5 mb-0.5'>

                  <div className='absolute -mt-2 left-10 font-normal'>
      
                      {filteredItem.description}

                  </div>

                  
                  <div className=' absolute  -mt-2 right-10' >
                        {String(filteredItem.cash)[0] != '-' ? filteredItem.cash+".00"  : dvv(filteredItem.cash)  }
                    </div>
      

      
                </li>
              ))}
      </ul>

      <ul className='w-full left-0 right-0 sticky bg-green-600 mt-6 font-dmsans bottom-0'>
        <li className='flex h-10 py-2 bg-green-600 '>
          <div className=' absolute left-8'>Total</div>
          <div className='  absolute  right-10'>{total}.00</div>
        </li>
      </ul>


    </div>
    </div>
  );
}

export default Home
