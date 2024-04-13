import React, { useState } from 'react'
import loginimg from '../assets/img/img1.jpg'
import { ConnectionStates } from 'mongoose';
import { Link,useNavigate } from 'react-router-dom'



const Signup = () => {
   const [formData,setFormData]=useState({});
   const[error,setError]=useState(null);
   const[loading,setLoading]=useState(false);
   const  navigate =useNavigate()
   



    const handleChange=(e)=>{
   
      e.preventDefault();
   
    setFormData(
      {
         ...formData,
         [e.target.id]:e.target.value,
      });
    
   
    };
    const handleSubmit= async (e)=>{

      try {
         e.preventDefault();
         setLoading(true)
      
         const res= await fetch('/api/auth/signup',{
      
         method:'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify(formData)
         
         
      
         })
      
      
      
         const data=await res.json();
         
      
      
         if(data.success==false){
      
          setError(data.message);
          setLoading(false);
          return;
      
         }
         setLoading(false);  
         setError(null);
         navigate('/signin')       
         
      } catch (error) {
         setLoading(false);  
         setError(error.message);
         
      }
       

   
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

            <button  disabled ={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  disabled:opacity-80'>{loading?"Laoding...":"Sign Up" }</button>

        </form>
        <div className='flex gap-2 mt-5'>
         <p>Have an account</p> 
         <Link to ={'/signin'}>
            <span className='text-blue-700'> signin </span>
      
         </Link>

        </div>
         
         {error&&<p className='text-red-600 mt-5'> {error}</p>}
     </div>             
       
  
    )}

export default Signup