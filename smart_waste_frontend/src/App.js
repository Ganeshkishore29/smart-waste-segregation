
import { Route ,Routes} from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { useEffect } from 'react';
import { refreshAccessToken } from './auth';

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
      </Routes>
    </div>
  );
}

export default App;
