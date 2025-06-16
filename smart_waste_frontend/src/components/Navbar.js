
import {Link, useNavigate,useLocation} from 'react-router-dom'
import {logout,isAdmin,isAuthenticated} from '../auth'

export const Navbar = () => {
    const navigate=useNavigate();
    const handlelogout=()=>{
        logout()           //clear user token from localstorage in auth.js
        navigate('/login') // redirect to user login
        

    }
    const location =useLocation()
        const isLoginpage= location.pathname==='/login'
        const isRegisterpage= location.pathname==='/register'
        const isHomepage = location.pathname === '/';
  return (
     <nav className='bg-green-700 py-4 sticky top-0 text-white shadow-lg'>
        <div className='container mx-auto flex justify-between items-center'>
            <Link to='/' className='text-2xl font-bold'>Smart waste system</Link>
            <div className='flex items-center'>
            {isAuthenticated() && (
               <div className='flex space-x-4'>
            {!isHomepage && (
                <Link to='/' className='p-3 py-2 hover:text-gray-300'>Home</Link>
            )}
            <Link to='/history' className='p-3 py-2 hover:text-gray-300'>History</Link>
            <Link to='/feedback' className='p-3 py-2 hover:text-gray-300'>Feedback</Link>
            {isAdmin() && 
                <Link to='/admin/log' className='p-3 py-2 hover:text-gray-300'>Admin Logs</Link>
            }
            <button onClick={handlelogout} className='p-3 py-2 rounded bg-white text-green-700 transition duration-200 hover:bg-red-600 hover:text-white'>Logout</button>
            </div> 
        )}
        {!isAuthenticated() && (
            < >
            {!isLoginpage && (
                <Link to='/login'><button className='bg-white mx-2 text-green-700  rounded py-2 px-4 hover:bg-green-100 transition'>Login</button></Link>
            )}
            {!isRegisterpage && (
                <Link to='/register'><button className='bg-white mx-2 text-green-700 rounded py-2 px-4 hover:bg-green-100 transition'>Register</button></Link>
            )}
            </>
        )}
        </div>
        </div>
     </nav>
  )
}
