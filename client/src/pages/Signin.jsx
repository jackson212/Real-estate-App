import React from 'react'
import loginimg from '../assets/img/img1.jpg'
import { FcGoogle } from "react-icons/fc";


const Signin = () => {
  return (
    

                

      <div className='relative w-full h-screen bg-zinc-900/90'>  
         
         <img  className=' absolute w-full h-full object-cover mix-blend-overlay'src ={loginimg} alt='/'/>
   
         <div className='flex  justify-center items-center h-full  '>
        <form className=' max-w-[400px] w-full mx-auto bg-white p-8'>
          <h2 className='text-4xl font-bold text-center py-6'>BRAND</h2>
          <div className=' flex  justify-center py-8'>
              
              <p className=' border  shadow-lg hover:shadow-xl px-6 py-2 relative flex  items-center'><FcGoogle />Google</p>
          </div>
          <div  className='flex flex-col mb-4'>  
          <label >Username</label>
            <input className='border  relative  bg-gray-100 p-2' type='text'/> 
   
          </div>
          <div  className='flex flex-col mb-4'> 
          <label >Password</label>
            <input className ="border  relative  bg-gray-100  p-2"type='password'/>
          </div>
          <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 relative text-white' >Sign in</button>
          
          <div>
           
          <p className='flex items-center'> <input className='mr-2' type='checkbox' /> remember me</p>
          <p className='flex items-center mt-8'>  Dont have account ? signup</p>
       
       </div>
   
           
   
        </form>
   
     </div>
               
      </div>
  )
}

export default Signin