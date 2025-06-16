import React, { useEffect, useState } from 'react'
import axios from 'axios'       //  to make HTTP requests
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth'


export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')  // Error state to handle login errors message
  const navigate = useNavigate()

  useEffect(()=>{
    if(isAuthenticated()){
      navigate('/')
    }
  },[navigate])
  const handleSubmit = async (e) => {  // async fn hold the entire process untill process is completed
    e.preventDefault()  // prevent the refresh of the page on submit because in html form by default it refreshes the page
    console.log('Login submitted:', { username, password })  // log the username and password to the console for debugging
      try{    // try is used when we work in Api,localstorage,JSON,token its prevent rh app crash
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password
      })
      const accesstoken=response.data.access
      localStorage.setItem('token', accesstoken)  // store the token in local storage user stay login even after page refresh
      
      localStorage.setItem('refresh', response.data.refresh)  // store the refresh token in local storage
      
      const userRes=await axios.get('http://localhost:8000/api/user/',{
        headers:{
          Authorization:`Bearer ${accesstoken}`,
        }
      })
      localStorage.setItem('user_info',JSON.stringify(userRes.data))
      setError("")
      navigate('/')  // redirect to home page after successful login
      } catch (error) {
        console.error('Login failed:', error.response)  // log the error to the console for debugging
      setError('Invalid username or password')  // if error occurs set the error message
    }}
  
  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-80'>
<img src="/images/login.svg" alt="Login" className="w-32 mx-auto mb-4" />
        <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
          {error && <p className='text-red-500'>{error}</p>}
        <input type="text" placeholder='Username'value={username} onChange={(e)=> setUsername(e.target.value)} className='w-full p-2 mb-4 border border-gray-300 rounded' required />
        <input type='password' placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)} className='w-full p-2 mb-4 border border-gray-300 rounded' required />
        <button type='submit' className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600'>Login</button>
      </form>
    </div>
  )
}
