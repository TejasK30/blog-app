import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import {URL} from '../url'
import { UserContext } from '../context/UserContext'

const EditPost = () => {

  const postId = useParams().id
  const[title, setTitle] = useState('')
  const[desc, setDesc] = useState('')
  const[file, setFile] = useState('')
  const[category, setCategory] = useState("")
  const[categories, setCategories] = useState([])
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  const addCategory = () => {
    let updatedCategories = [...categories]
    updatedCategories.push(category)
    setCategory("")
    setCategories(updatedCategories)
  }

  const deleteCategory = (i) => {
    let updatedCategories = [...categories]
    updatedCategories.splice(i)
    setCategories(updatedCategories)
  }

  const fetchPost = async() => {
    try {
      const res = await axios.get(URL + '/api/posts/' + postId)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setCategories(res.data.categories)
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate=async (e)=>{
    e.preventDefault()
    const post={
      title,
      desc,
      username:user.username,
      userId:user._id,
      categories
    }

    if(file){
      const data=new FormData()
      const filename=Date.now()+file.name
      data.append("img",filename)
      data.append("file",file)
      post.photo=filename
      // console.log(data)
      //img upload
      try{
        // eslint-disable-next-line no-unused-vars
        const imgUpload=await axios.post(URL+"/api/upload",data)
        // console.log(imgUpload.data)
      }
      catch(err){
        console.log(err)
      }
    }
    //post upload
    try{
      const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
      navigate("/posts/post/"+res.data._id)
      // console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      addCategory()
    }
  }

  const handleKeyPressSubmit = (e) => {
    if(e.key === 'Enter'){
      handleUpdate(e)
    }
  }

  useEffect(()=>{
    fetchPost()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[postId])

  return (
    <>
    <div className="px-6 md:px-[200px] mt-8">
      <h1 className="font-bold md:text-2xl text-xl">Update a post</h1>
      <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
        <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Enter a post title" className="px-4 py-2 outline-none" />
        <input onChange={ e => setFile(e.target.files[0])} type="file" className="px-4" />
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input onKeyDown={ e => handleKeyPress(e)} value={category} onChange={(e) => setCategory(e.target.value)} type="text" className="px-4 py-2 outline-none" placeholder="Enter post category" />            
            <div onClick={addCategory} className="bg-slate-800 text-slate-100 px-4 py-2 font-semibold cursor-pointer">Add</div>
          </div>
          {/* Categories */}
          <div className='flex px-4 mt-3'>
            {categories?.map((c, i) => (
              <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                <p>{c}</p>
                <p onClick={() => deleteCategory(i)} className="text-slate-100 bg-slate-800 rounded-full cursor-pointer p-1 text-sm"><ImCross /></p>
              </div>
            ))}
          </div>
          <textarea onKeyDown={e => handleKeyPressSubmit(e)} value={desc} onChange={e => setDesc(e.target.value)} cols="30" rows="15" className='px-4 py-2 outline-none' placeholder='Enter post Description'></textarea>
          <button onClick={handleUpdate} className='bg-slate-800 w-full md:w-[20%] mx-auto text-slate-100 font-semibold px-4 py-2 text-lg md:text-xl'>Post</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default EditPost