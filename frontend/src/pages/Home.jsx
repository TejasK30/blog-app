import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { URL } from '../url'
import {Link, useLocation} from 'react-router-dom'
import HomePosts from "../components/HomePosts"
import Loader from '../components/Loader'
import { UserContext } from "../context/UserContext"

const Home = () => {
  const [noResults, setNoResults] = useState(false)
  const {search} = useLocation()
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(false)
  const {user} = useContext(UserContext)

  const fetchPosts = async() => {
    try {
      setLoader(true)
      const res = await axios.get(URL + '/api/posts/' + search, {withCredentials: true}) 
      setPosts(res.data)
      if(res.data.length === 0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
    } catch (error) {
      setLoader(true)
      console.log(error);      
    }
  }

  useEffect(() => {
    fetchPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <>
      <div className="px-8 md:px-[200px]">
        {loader ? <div className=" h-[40vh] flex items-center justify-center "><Loader /></div> : !noResults ? posts.map((post) => (
          <>
          <Link to={user ? `/posts/post/${post._id}` : '/login'}>
            <HomePosts key={post._id} post={post}/>
          </Link>
          </>

        )) : <h3 className="text-center font-bold mt-16">No results available for search </h3>}
      </div>
    </>
    )
}

export default Home