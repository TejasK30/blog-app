import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'

const Login = () => {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[error, setError] = useState(false)
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const handleLogin = async() => {
    try {
      const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      setUser(res.data)
      navigate("/")
    } catch (error) {
      setError(true)
      console.log(error);
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleLogin()
    }
  }

  return (
    <>
    <div className="w-full flex flex-col justify-center items-center h-[80vh]">
      <div className="flex flex-col items-center justify-center w-[80%] md:w-[25%] space-y-4">
        <h1 className="text-xl font-bold text-left">Log in to your account</h1>
          <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-slate-700 outline-none" type="email" placeholder="Enter your email"/>
          <input onKeyDown={ e => handleKeyPress(e)} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-slate-700 outline-none" type="password" placeholder="Enter your password" />
          <button onClick={handleLogin} className="w-full p-3 text-lg font-bold text-slate-100 bg-slate-800 rounded-lg hover:bg-slate-600">Log in</button>
          {error && <h3 className='text-red-500 text-sm'>Something went wrong</h3>}
      </div>
      <div className="flex items-center justify-center space-x-4">
        <p>New here ?</p>
        <h3><Link to={'/register'}>Register here</Link></h3>
      </div>
    </div>
    </>
  )
}

export default Login