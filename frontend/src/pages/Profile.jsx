import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import ProfilePosts from '../components/ProfilePosts'
import axios from 'axios'
import { URL } from '../url'

const Profile = () => {

  const param=useParams().id
  const[username, setUsername] = useState('')
  const[email, setEmail] = useState('')
  const[updated, setUpdated] = useState(false)
  const {user,setUser}=useContext(UserContext)
  const [posts,setPosts]=useState([])
  const navigate = useNavigate()

  const fetchProfile= async() => {
    try{
      const res = await axios.get(URL + "/api/users/" + user._id)
      setUsername(res.data.username)
      setEmail(res.data.email)
      // setPassword(res.data.password)
    }
    catch(err){
      console.log(err)
    }
  }
  const fetchUserPosts=async ()=>{
    try{
      const res=await axios.get(URL+"/api/posts/user/"+user._id)
      setPosts(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const updateUser = async() => {
    setUpdated(false)
    try {
      const res = await axios.put(URL + '/api/users/' + user._id, {
        username,
        email,
      } , {withCredentials: true})
      setUser(res.data)
      setUpdated(true)
    } catch (error) {
      console.log(error);
      setUpdated(false)
    }
  }

  const deleteUser = async() => {
    try {
      const res = await axios.delete(URL + '/api/users/' + user._id, {withCredentials: true})
      setUser(null)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [param])

  useEffect(() => {
    fetchUserPosts()
  }, [param])

  return (
    <div className='px-8 mt-8 flex md:flex-row flex-col-reverse md:items-start'>
      <div className='flex flex-col md:w-[70%] w-full mt-8 md:mt-8'>
        <h1 className='text-xl font-bold mb-4'>Your posts</h1>
        {
          posts? posts.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          )) : <h3 className='bg-slate-700 mt-4'>You don&apos;t have any posts.</h3>
        }
      </div>
      <div className='md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end'>
        <div className='flex flex-col space-y-4 items-start'>
          <h1 className='text-xl font-bold mb-4'>Profile</h1>
          <input value={username} onChange={e => setUsername(e.target.value)} className='outline-none px-4 py-2' placeholder='Your username' type="text" />
          <input value={email} onChange={e => setEmail(e.target.value)} className='outline-none px-4 py-2' placeholder='Your Email' type="email" />
          {/* <input value={password} onChange={e => setPassword(e.target.value)} className='outline-none px-4 py-2' placeholder='Your Password' type="password" /> */}
          <div className='flex items-center space-x-4 mt-8'>
            <button onClick={updateUser} className='bg-slate-800 text-slate-100 hover:bg-slate-600 font-semibold px-4 py-2'>Update</button>
            <button onClick={deleteUser} className='bg-slate-800 text-slate-100 hover:bg-slate-600 font-semibold px-4 py-2'>Delete</button>
          </div>
          {updated && <h3 className='text-green-500 text-sm text-center mt-4'>User info updated successfully.</h3>}
        </div>
      </div>
    </div>
  )
}

export default Profile