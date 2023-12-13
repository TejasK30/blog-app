import { useContext, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Menu from './Menu';

const Navbar = () => {
  const [prompt, setPrompt] = useState('')
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const {user} = useContext(UserContext) // Change the type according to your actual data type

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      navigate(prompt ? '?search=' + prompt : navigate('/'))
    }
  }

  const showMenu = () => {
    setMenu(!menu)
  }

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog-app</Link>
        </h1>
        <div className="flex items-center justify-center space-x-0">
          <p onClick={ () => navigate(prompt ? '?search=' + prompt : navigate('/')) } className='cursor-pointer'>
            <BsSearch />
          </p>
          <input value={prompt} onChange={ e => setPrompt(e.target.value) } onKeyDown={e => handleKeyPress(e)} className="outline-none px-3" placeholder="search a post" type="text" />
        </div>
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? <h3><Link to={'write'}>Write</Link></h3> : <h3><Link to={'/login'}>Login</Link></h3>}
          {user ? <div onClick={showMenu}>
            <p className='text-lg cursor-pointer'><FaBars/></p> 
            {menu && <Menu/> } 
            </div> : <h3><Link to="/register">Register</Link></h3>}
        </div>

        <div onClick={showMenu} className='md:hidden '>
          <p className='text-lg cursor-pointer'><FaBars/></p>
          { menu && <Menu /> }
          {/* if menu is true then show menu component */}
        </div>
      </div>
    </>
  );
};

export default Navbar;


//ts code
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BsSearch } from 'react-icons/bs';

// const Navbar: React.FC = () => {
//   const user: boolean = true; // Change the type according to your actual data type

//   return (
//     <>
//       <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
//         <h1 className="text-lg md:text-xl font-extrabold">
//           <Link to="/">Blog-app</Link>
//         </h1>
//         <div className="flex items-center justify-center space-x-0">
//           <p>
//             <BsSearch />
//           </p>
//           <input className="outline-none px-3" placeholder="search a post" type="text" />
//         </div>
//         <div className="flex items-center justify-center space-x-2 md:space-x-4">
//           {user ? <h3><Link to={'write'}>Write</Link></h3> : <h3><Link to={'/login'}>Login</Link></h3>}
//           {user ? <h3>Profile</h3> : <h3><Link to="/register">Register</Link></h3>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
