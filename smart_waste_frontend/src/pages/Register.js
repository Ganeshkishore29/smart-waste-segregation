import React from 'react'
import { useState } from 'react'
import axios  from 'axios'      //  to make HTTP requests
import { useNavigate } from 'react-router-dom'
export const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [successful, setSuccessful] = useState(false)  
    const [error, setError] = useState('')  // is for if the backend view.py get any error like user already exists 
    const navigate = useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{ 
        const registerdata=await axios.post('http://localhost:8000/api/register/',{
            username,
            password
        })
        localStorage.setItem('token',registerdata.data.access)
        localStorage.setItem('refresh',registerdata.data.refresh)
        
        setError('')
        setSuccessful("User registered successfully",true) 
        setTimeout(() => {
          navigate('/')
        }, 1000);
    } catch (error) {
        setError('User already exists or invalid data') 
    }}

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-80'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>
        {error && <p className='text-red-500'>{error}</p>}
        {successful && <p className='text-green-500'>{successful}</p>}
        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-full p-2 mb-4 border border-gray-300 rounded' required />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-2 mb-4 border border-gray-300 rounded' required />
        <button type='submit' className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600'>Register</button>
      </form>
    </div>
  )
}
