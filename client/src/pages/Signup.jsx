import React, { useState } from 'react'
import loginimg from '../assets/img/img1.jpg'
import { ConnectionStates } from 'mongoose';




const Signup = () => {
   const [formData,setFormData]=useState({});
   const[error,setError]=useState(null);
   const[loading,setLoading]=useState(false);

   
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

   const res= await fetch('/api/auth/signup',{

   method:'POST',
   headers:{
      'Content-Type':'application/json'
   },
   body:JSON.stringify(formData)
   
   

   })



   const data=await res.json();
   

   console.log(data)
    }
   
   console.log(formData) 
  return(
   
     <div className='max-w-lg mx-auto p-3'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>

        <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
         
            <input type='text' placeholder='username' className='border p-3 rounded-lg' id="name" onChange={handleChange}/>
            <input type='text' placeholder='email' className='border p-3 rounded-lg' id="email"  onChange={handleChange}/>
            <input type='text' placeholder='password' className='border p-3 rounded-lg' id="password" onChange={handleChange}/>

            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  disabled:opacity-80'>Sign Up</button>

        </form>

     </div>             
   
  
    )}

export default Signup