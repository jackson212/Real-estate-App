import React from 'react'

export default function Oath(){
  
    const handleGoogleClick = async ()=>{

         try {
            
            

         } catch (error) {
            console.log('could not sign in with google ')

         }


    }
    
    
    return(

       <button  
       type='button' className='bg-red-700  text-white  p-3 rounded-lg uppercase hover:capacity-95'>Continue with Google </button>

    );


}