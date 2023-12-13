import { useContext } from "react"
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import axios from "axios"
const Menu = () => {
  const {user, setUser} = useContext(UserContext)
  const handleLogout = async() => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.get(URL + '/api/auth/logout', {withCredentials: true})
      setUser(null)
    } catch (error) {
      console.log(error);      
    }
  }
  return (
    <div className="bg-slate-800 z-10 flex w-[200px] flex-col items-start absolute top-12 right-56 rounded-md p-4 space-y-4">
      {!user && <h3 className="text-white cursor-pointer hover:text-gray-500 text-sm"><Link to={'/login'}>Login</Link></h3>}
      {!user && <h3 className="text-white cursor-pointer hover:text-gray-500 text-sm"><Link to={'/register'}>Register</Link></h3>}
      {user && <h3 className="text-white cursor-pointer hover:text-gray-500 text-sm"><Link to={'/'}>Home</Link></h3>}
      {user && <h3 className="text-white cursor-pointer hover:text-gray-500 text-sm"><Link to={'/profile/' + user._id}>Profile</Link></h3>}
      {user && <h3 className="text-white cursor-pointer hover:text-gray-500 text-sm"><Link to={'/write'}>Write</Link></h3>}
      {user && <h3 className="text-white cursor-pointer hover:text-gray-500 text-sm"><Link to={'/myblogs/' + user._id}>My blogs</Link></h3>}
      {user && <h3 onClick={handleLogout} className="text-white cursor-pointer hover:text-gray-500 text-sm">Logout</h3>}
    </div>
  )
}

export default Menu