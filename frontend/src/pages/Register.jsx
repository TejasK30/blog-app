import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {URL} from '../url'

const Register = () => {
  const[username, setUsername] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[error, setError] = useState(false)
  const navigate = useNavigate()
  const handleRegister = async() => {
    try {
      const res = await axios.post(URL + '/api/auth/register',
      {username, email, password})
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate('/login')
    } catch (error) {
      setError(true)
      console.log(error);
    }
  }
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleRegister()
    }
  }
  return (
    <>
    <div className="w-full flex flex-col justify-center items-center h-[80vh]">
      <div className="flex flex-col items-center justify-center w-[80%] md:w-[25%] space-y-4">
        <h1 className="text-xl font-bold text-left">Create your account</h1>
          <input value={username} onChange={e => setUsername(e.target.value) } className="w-full px-4 py-2 border-2 border-slate-700 outline-none" type="text" placeholder="Create your username"/>
          <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-slate-700 outline-none" type="email" placeholder="Enter your email"/>
          <input value={password} onKeyDown={ e => handleKeyPress(e)} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-slate-700 outline-none" type="password" placeholder="Enter your password" />
          <button onClick={handleRegister} className="w-full p-3 text-lg font-bold text-slate-100 bg-slate-800 rounded-lg hover:bg-slate-600">Log in</button>
          {error && <h3 className='text-red-500 text-sm'>Something went wrong</h3>}
      </div>
      <div className="flex items-center justify-center space-x-4">
        <p>Already have an account ?</p>
        <h3><Link to={'/login'}>Login here</Link></h3>
      </div>
    </div>
    </>
  )
}

export default Register