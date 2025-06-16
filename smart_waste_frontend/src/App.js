
import { Route ,Routes} from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { useEffect } from 'react';
import { refreshAccessToken } from './auth';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { History } from './pages/History'; 
import { Feedback } from './pages/Feedback';
import { AdminLog } from './pages/AdminLogs';


function App() {
  useEffect(() => {
    const interval=setInterval(() => {
      refreshAccessToken()
    },4.5*60*1000)
    return ()=> clearInterval(interval) // Cleanup the interval on component unmount
  }
  ,[]); 
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/history' element={<History/>}></Route>
        <Route path='/feedback' element={<Feedback/>}></Route>
        <Route path='/admin/log' element={<AdminLog/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
