import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import { UserContextProvider } from './context/UserContext'
import MyBlogs from './pages/MyBlogs'

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/write' element={<CreatePost/>}/>
          <Route path='/edit/:id' element={<EditPost/>}/>
          <Route path='/myblogs/:id' element={<MyBlogs/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/posts/post/:id' element={<PostDetails/>}/>
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  )
}

export default App