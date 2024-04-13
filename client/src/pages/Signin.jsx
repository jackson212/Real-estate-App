import React, { useEffect, useState } from "react";
import loginimg from '../assets/img/img1.jpg'
import { FcGoogle } from "react-icons/fc";
import { Link,useNavigate } from 'react-router-dom'
import { signInStart,signInFailure, signinSuccess} from "../redux/user/userSlice";
import {  useDispatch, useSelector } from "react-redux";

const Signin = () => {
  
    const [formData,setFormData]=useState({});
    const {error,loading }=useSelector((state=>state.user))
    const  navigate =useNavigate()
    const  dispatch =useDispatch()
 
 
 

     const handleChange=(e)=>{
    
       e.preventDefault();
    
     setFormData(
       {
          ...formData,
          [e.target.id]:e.target.value,
       });
     
    
     };
     const handleSubmit= async (e)=>{
      e.preventDefault();
       try {
          
          dispatch(signInStart())
       
          const res= await fetch('/api/auth/signin',{
       
          method:'POST',
          headers:{
             'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
          
          
       
          })
        
          const data=await res.json();
          console.log(data)
        
          if(data.success==false){
       
            dispatch(signInFailure(data.message))
            return;
       
          }
          dispatch(signinSuccess(data));
          
          navigate('/')   
 
       } catch (error) {
        dispatch(signInFailure(error.message))
          
       }
         
     }
    
    console.log(formData) 
  return (
    

                

      <div className='relative w-full h-screen bg-zinc-900/90'>  
         
         <img  className=' absolute w-full h-full object-cover mix-blend-overlay'src ={loginimg} alt='/'/>
   
         <div className='flex  justify-center items-center h-full  '>
        <form className=' max-w-[400px] w-full mx-auto bg-white p-8' onSubmit={handleSubmit}>
          <h2 className='text-4xl font-bold text-center py-6'>BRAND</h2>
          <div className=' flex  justify-center py-8'>
              
              <p className=' border  shadow-lg hover:shadow-xl px-6 py-2 relative flex  items-center'><FcGoogle />Google</p>
          </div>
          <div  className='flex flex-col mb-4'>  
          <label >Username</label>
            <input className='border  relative  bg-gray-100 p-2' type='text' id="email" onChange={handleChange}/> 
   
          </div>
          <div  className='flex flex-col mb-4'> 
          <label >Password</label>
            <input className ="border  relative  bg-gray-100  p-2"type='text' id="password" onChange={handleChange}/>
          </div>
          <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 relative text-white' >Sign in</button>
          
          <div>
           
          <p className='flex items-center'> <input className='mr-2' type='checkbox' /> remember me</p>
          <p className='flex items-center mt-8'>  Dont have account ? signup</p>
       
       </div>
   
           
       {error&&<p className='text-red-600 mt-5'> {error}</p>}
        </form>
   
     </div>
               
      </div>
  )
}

export default Signin