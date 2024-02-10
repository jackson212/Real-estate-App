import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  
  
  return (
   
    <header  className='top-0 left-0 w-full py-3 px-0 text-left bg-blue-200 font-normal leading-6 text-neutral -800 shadow-md'>
     

        <div className='flex justify-between items-center max-w-6xl  mx-auto '>
        
        <h1 className='font-bold text-sm  sm:text-xl flex flex-wrap'>
          <span className ="text-orange-400">Real estate</span>
          <span className="text-neutral-500">. MarketPlace</span>
        </h1>
        

         <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-500 '/>
         </form>

     <ul className='flex  gap-4'>
     <Link to="/">
           <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to="/about">
           <li className='hidden sm:inline  text-slate-700 hover:underline'>About</li>
           </Link>
           <Link to="/signin">
           <li className='text-slate-700 hover:underline'>signin</li> 
           </Link>
           <Link to="/signup">
           <li className='text-slate-700 hover:underline'>signup</li> 
           </Link>
     </ul>


        </div>

    </header>
  )
}

export default Header