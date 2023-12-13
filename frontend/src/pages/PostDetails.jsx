/* eslint-disable no-unused-vars */
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import Comment from '../components/Comment'
import axios from 'axios'
import { URL, IF } from '../url'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Loader from '../components/Loader'

const PostDetails = () => {
  const postId = useParams().id
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [loader, setLoader] = useState(false)
  const {user} = useContext(UserContext)
  const navigate  = useNavigate()
  useEffect(() => {
    fetchPosts()
    fetchComments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  const fetchPosts = async() => {
    try {
      const res= await axios.get(URL+"/api/posts/"+postId)
      setPost(res.data)
      setLoader(false)
    } catch (error) {
      console.log(error);
      setLoader(true)
    }
  }

  const fetchComments = async() => {
    try {
      const res= await axios.get(URL+"/api/comments/post/"+postId)
      setComments(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  
  const handleDeletePost=async ()=>{
    try{
      const res = await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }

  const postComment = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post(URL + '/api/comments/write', 
      {
        comment : comment, 
        author: user.username,
        postId: postId,
        userId: user._id
      }, {withCredentials: true})
    } catch (error) {
      console.log(error);
    }

    window.location.reload(true)
  }

  return (
    <>
    {loader ? <div className='h-[80vh] flex items-center justify-center w-full'>
        <Loader />
      </div> : <div className='px-8 mt-8'>
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold text-slate-800 md:text-2xl">
          {post.title}
        </h1>
        <div className='flex items-center justify-center space-x-2'>
          {user?._id === post?.userId && <>
          <p className='cursor-pointer' onClick={() => navigate('/edit/' + postId)} ><BiEdit /></p>        
          <p className='cursor-pointer' onClick={handleDeletePost}><MdDelete /></p> 
          </>}
          
        </div>
      </div>
      <div className='flex items-center justify-between mt-2 md:mt-4'>
        <p>@{post.username}</p>
        <div className="flex space-x-2 text-sm">
        <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
        <p>{new Date(post.createdAt).toString().slice(16, 24)}</p>
        </div>        
      </div>
      <img src={IF + post.photo}className="mx-auto mt-8" alt="" />
      <p>{post.desc}</p>
      <div className="flex items-center mt-8 space-x-4 font-semibold">
        <p>Categories:</p>
        <div className="flex justify-center items-center space-x-2">
        {post.categories?.map((c,i)=>(
          <>
          <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
          </>
          
        ))}
          
        </div>
      </div>
      <div className='flex flex-col mt-4'>
        {/* comments section */}
        <h3 className='mt-6 mb-4 font-semibold'>Comments</h3>
          {
            comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))
          }
        <div>
        <div className='w-full flex flex-col mt-4 md:flex-row'>
          <input onChange={ e => setComment(e.target.value) } type="text" placeholder='Write a comment' className='md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0'/>
          <button onClick={e => postComment(e)} className='bg-slate-800 text-sm text-slate-100 px-4 py-2 md:w-[20%] mt-4 md:mt-0'>Post</button>
        </div>
        </div>
      </div>
    </div>}
    </>
  )
}

export default PostDetails