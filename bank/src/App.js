import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import User_Login from './login_page/User_Login';
import Signup from './login_page/Signup';
import Home from './component/Home';
import AdminLogin from './login_page/adminLogin'
import AdminHome from './admin/AdminHome'
import Users from './adminViewUsers/users'
import '../src/output.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<User_Login/>} />
          <Route path="/Users" element={<Users/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Adminlogin" element={<AdminLogin/>}/>
          <Route path="/AdminHome" element={<AdminHome/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
