import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const API_URL = "mongodb+srv://bank:Bank%40123@cluster0.alh1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bank";

  const history = useNavigate();
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
        setFilteredItem(bank.data.filter(item => item.id === userId));
      })
      .catch(err => console.log(err));
  }, [userId]);

  useEffect(() => {
    const totalAmount = filteredItem.reduce((sum, item) => sum + parseInt(item.cash)  , 0);
    setTotal(totalAmount);
  }, [filteredItem]);

  async function submit(e) {
    e.preventDefault();

    setError('');
    setSuccess(false);


    const id = items.length ? items[items.length - 1].id + 1 : 1;
    await axios.post("https://bankdb-azure.vercel.app/user", { description, cash, id, user });

    axios.get(URL+"getUser")
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
    <div>
      <h1>{user} {userName} Data</h1>

      {success && <p className="success-message">Data saved successfully!</p>}
      {error && <p className="error-message">{error}</p>}

      <form action="POST" className="data">
        <div className="lbl">
          <input
            required
            onChange={(e) => { setDescription(e.target.value) }}
            type="text"
            id="name"
            name="name"
            value={description}
            className="text_input"
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
            className="text_input"
          />
        </div>
        
        <div className="text_input">
          <input
            type="submit"
            onClick={submit}
            value="Save"
            className="btn_save"
          />
        </div>
      </form>

      <ul>
        <li className='hd'>
          <div className='item'>Description</div>
          <div className='item'>Amount</div>
        </li>
      </ul>

      <ul>
        {filteredItem.map(filteredItem => (
          <li key={filteredItem.id}>
            <div className='item'>{filteredItem.description}</div>
            <div className='item'>{filteredItem.cash}.00</div>
          </li>
        ))}
      </ul>

      <ul>
        <li className='hd'>
          <div className='item'>Total</div>
          <div className='item'>{total}.00</div>
        </li>
      </ul>
    </div>
  );
}

export default Users;
