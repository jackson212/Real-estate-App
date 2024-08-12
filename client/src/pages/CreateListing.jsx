import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
 } from 'firebase/storage';
import { app } from '../firebase';

function CreateListing() {
   const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();
const [files,setFiles]=useState([])
const [error,setError]=useState(false)
const [loading,setLoading]=useState(false)


const [formData, setFormData] = useState({
   imageUrls: [],
   name:'',
   description:'',
   address:'',
   type: 'rent',
   bedrooms: 1,
   bathrooms: 1,
   regularPrice: 50,
   discountPrice: 0,
   offer: false,
   parking: false,
   furnished: false,
   userRef:''
 });
console.log(formData)

const [imgerr,setimgerr]=useState(false);
 
const [uploading,setuplaoding]=useState(false);



const handlechangeall=(e)=>{

   if(e.target.id=='sale' || e.target.id=='rent'){
       
     setFormData({
      ...formData,
      type:e.target.id
     })

   }
   if(e.target.id=='parking' || e.target.id=='furnished' || e.target.id=='offer'){
       
      setFormData({
       ...formData,
       [e.target.id]:e.target.checked
      })
 
    }


    if(e.target.type=='number' || e.target.type=='text' || e.target.type=='textarea'){
       
      setFormData({
       ...formData,
       [e.target.id]:e.target.value
      })
 
    }

}

const handleImageSubmit = (e)=>{

   console.log(formData)
   if(files.length>0&&files.length+ formData.imageUrls.length<7){

      setuplaoding(true)
      setimgerr(false)
      const promises =[];

      for(let i=0;i< files.length;i++){
           
         promises.push(storeImage(files[i]))


         

      }

Promise.all(promises).then((url)=>{
   setFormData({...formData,imageUrls:formData.imageUrls.concat(url)})
 
   setimgerr(false);
   setuplaoding(false)

}).catch((err)=>{
   setimgerr('erroe upload failed (2mb is maximum)', err)
   setuplaoding(false)
   
})


   }else{
      setimgerr("uploading image should be less than 6")
      setuplaoding(false)
   }

}





  const storeImage =async(file)=>{
return new Promise((resolve,reject)=>{
    
   const storage= getStorage(app);
   const fileName= new Date().getTime()+ file.name;
   
   const storageRef= ref(storage,fileName)

   const uploadTask=uploadBytesResumable(storageRef,file)

   uploadTask.on(
      "state_changed",
      (snapshot)=>{
         
         const progress= (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
         console.log(`upload is ${progress}% done`)

      },
      (error)=>{

         reject(error)
      },
      ()=>{

         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{

            resolve(downloadURL);
         })
       }

         )
      }
   )

}

  

const handleremoveimg=(index)=>{
 
   setFormData({
 
    ...formData,
    imageUrls: formData.imageUrls.filter((_,i) => i!==index)
   

   })
   

}

const onhandelSubmit= async(e)=>{

  e.preventDefault();
   
  try {

   if(formData.imageUrls.length<=0) return setError("Upload atleast one image")

   

   setLoading(true)
   setError(false)
   const res = await fetch('/api/listing/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        userRef: currentUser._id,
      }),
    });
    console.log(res)


   const data = await res.json();
   setLoading(false)
   if(data.success==false){
      setError(data.message)
   }


     navigate(`/listing/${data._id}`)

  } catch (error) {
   
   setError(error.message)
   setLoading(false)
  }


}

  return (
    <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>
      Create a Listing
    </h1>

    <form onSubmit={onhandelSubmit} className='flex flex-col sm:flex-row gap-4'>

      <div className='flex flex-col gap-4 flex-1'>
      
      <input type="text" 
      placeholder='Name' 
      className='border p-3 rounded-lg' 
      id="name" 
      maxLength="62" 
      minLength="2" 
      required 
      onChange={handlechangeall}
      value={formData.name}/>


      <textarea 
      type="text" 
      placeholder='Description' 
      className='border p-3 rounded-lg' 
      id="description" 
      maxLength="62" 
      minLength="5" 
      required   
      onChange={handlechangeall} 
      value={formData.description}/>


      <input type="text" 
      placeholder='address'
      className='border p-3 rounded-lg' 
      id="address"
      maxLength="62" 
      minLength="5" 
      required 
      onChange={handlechangeall} 
      value={formData.address}/>




      <div className='flex gap-6 flex-wrap'>
         <div className='flex gap-2'>
                <input type="checkbox"  id='sale' className='w-5' onClick={handlechangeall} checked={formData.type=='sale'} />
                <span>sale</span>
         </div>
         <div className='flex gap-2'>
                <input type="checkbox"  id='rent' className='w-5'  onClick={handlechangeall} checked={formData.type=='rent'} />
                <span>Rent</span>
         </div>
         <div className='flex gap-2'>
                <input type="checkbox"  id='parking' className='w-5'  onClick={handlechangeall} checked={formData.parking}/>
                <span>parking available</span>
         </div>
         <div className='flex gap-2'>
                <input type="checkbox"  id='furnished' className='w-5' onClick={handlechangeall} checked={formData.furnished} />
                <span>Furnished</span>
         </div>
         <div className='flex gap-2'>
                <input type="checkbox"  id='offer' className='w-5'  onClick={handlechangeall} checked={formData.offer}/>
                <span>Offer</span>
         </div>
      </div>

      <div className='flex flex-wrap gap-6'>
         <div className='flex items-center gap-2'> 
             <input type="number"  id='bedrooms' min="1" max="10"  required
              className='p-3 border  border-gray-300  rounded-lg'
              onChange={handlechangeall} checked={formData.bedrooms}
             />
          <p>Beds</p>

         </div>
         <div className='flex items-center gap-2'> 
             <input type="number"  id='bathrooms' min="1" max="10"  required
              className='p-3 border  border-gray-300  rounded-lg'
              onChange={handlechangeall} value={formData.bathrooms}
             />
          <p>Baths</p>

         </div>
         <div className='flex items-center gap-2'> 
             <input type="number"  id='regularPrice' min="50" max="10000000"  required
              className='p-3 border  border-gray-300  rounded-lg'
              onChange={handlechangeall} value={formData.regularPrice}
             />
         
          <div  className='flex flex-col items-center'>
             <p>Regular Price</p>
             <span className=' text-xs'>($ /month)</span>

               


          </div>
 
         </div>
         {formData.offer&&(
             <div className='flex items-center gap-2'> 
             <input type="number"  id='discountPrice' min="50" max="100000"  required
              className='p-3 border  border-gray-500  rounded-lg'

              onChange={handlechangeall} value={formData.discountPrice}
             />
         
          <div  className='flex flex-col items-center'>
             <p>Discounted Price</p>
             <span className='text-xs'>($ /month)</span>

          </div>
 

         </div>
            
         )}
        
      </div>
      
      </div>

      <div className='flex flex-col gap-4 flex-1'>

        <p className='font-semibold'> Images:  <span className='font-normal text-gray-700 ml-2'></span></p>
         <div className='flex gap-4'>
          <input onChange={(e)=>setFiles(e.target.files) } 
          className="p-3 border border-gray-300 rounded w-full"  
          type="file" 
          id="images" 
          accept='image/*' 
          multiple />
         <button 
         onClick={handleImageSubmit}
         type='button'
         disabled={uploading}
         className='p-3 
         text-green-700 border 
         border-b-red-950
          rounded  
          uppercase 
          hover:shadow-lg 
          disabled:opacity-80:'>{uploading?"uplaoding...":'uplaod'}</button>
          
         </div>
         <p className='bg-red-700  text-white'>

{imgerr&&imgerr}
</p>

{

formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>(
  <div key={url} className='flex justify-between p-3 border items-center'>
     
    <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />

    <button onClick={()=>handleremoveimg(index)}  className='p-3 text-red-700 rounded-lg hover:opacity-65'>Delete</button>
       




  </div>
))



}
            
         <button  className='p-3 bg-red-400 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'  >{loading?'Creating..':"Create Listing"}</button>
         <p className='text-red-500'>{error}</p>
      </div>





    
    </form>
   
   
    </main>
  )
}
export default CreateListing
