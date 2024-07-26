import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { useDispatch, useSelector } from 'react-redux'

import {app} from '../firebase'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

const Profile = () => {

  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  const fileRef=useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [File,setFile] = useState(undefined)
  console.log(File)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [showlisterr,setlisterr]=useState(false)
  const[userListing,setUserListing]=useState([])
  console.log(formData)
  const dispatch = useDispatch();



  useEffect(()=>{
     if(File){
      handleFileUpload(File);
     }

  },[File])
 
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };




   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("datas",data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut= async()=>{
       
    try{
      dispatch( signOutUserStart())
      const res =await fetch('/api/auth/signout');
      const data = await res.json()

      console.log(data)
      if(data.success===false){
        dispatch(signOutUserFailure())

        return;
      }
           

    dispatch(signOutUserSuccess())

    }catch(error){
         dispatch(signOutUserFailure(error))    
 
    }


  }

  const handleShowListing =async()=>{
      
    try {
       setlisterr(false)
       const res = await fetch (`/api/user/listing/${currentUser._id}`)
       const data= await  res.json()
       if(data.success===false){

        setlisterr(true)
        return;
       } 


       setUserListing(data)
      
    } catch (error) {
      setlisterr(true)
    }

  }

  const handleDeleteList =async(id)=>{
     try{
    const res = await fetch(`/api/listing/delete/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
      if (data.success === false) {
        return;
      }

    
      setUserListing((prev)=>prev.filter((list)=>list._id!==id));

      

      
    } catch (error) {
       console.log(error.message);
    }



  }

 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      
     <h1 className='text-3xl font-semibold text-center my-7'> Profile</h1>

     <form    onSubmit={handleSubmit} className='flex flex-col gap-4'>
           <input type="file"
           
           onChange={(e)=>{

          return setFile(e.target.files[0])
 
           }}
           
           ref={fileRef} 
           hidden 
           accept='image/*'/>

           <img  onClick={ ()=>fileRef.current.click()}  src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />


            <p>
              {
                     
                     fileUploadError?(
              <span className='text-red-700'>There is an error for uploading file</span>)

              :filePerc>0 && filePerc<100?(
                   
                <span className='text-blue-500'>{`Uploading ..${filePerc}%`}</span>

              ):filePerc==100?(
                  
                <span className='text-green-500'> Image sucessfully uploaded</span>

              ):('')



              }
              
            </p>

           <input
          type='text'
          placeholder='username'
         defaultValue={currentUser.name}
          id='name'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          defaultValue={currentUser.email}
          placeholder='email'
          id='email'
       
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button
          // disabled={loading}
         className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >


          {/* {loading ? 'Loading...' : 'Update'} */} Update
        </button>
        <Link
          className='bg-red-800 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
   
     </form>

      <div className='flex justify-between mt-5'>

        <span onClick={handleDeleteUser} className='text-red-700  cursor-pointer'> Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700  cursor-pointer'> Sign Out</span>


      </div>

  <p className='text-red-900'>{error?error:''}</p>


  <button onClick={handleShowListing} className=' gap-4 bg-yellow-500 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Show listing </button>
        
        <p className='text-red-600'>{showlisterr?'no listing found':''}</p>


        {userListing&&userListing.length>0&&
        userListing.map((listing)=>(
          
          <div key={listing._id} className='border p-3 rounded-lg flex justify-center items-center gap-4'>
                   <Link to ={`/listing/${listing._id}`}>
                     
                   
                     <img className='h-16 w-16 object-contain rounded-lg it' src={listing.imageUrls[0]} alt="listing cover" />
                   
                    </Link>
                    <Link className='text-slate-600  font-semibold flex1 hover:underline truncate' to ={`/listing/${listing._id}`}>
                     
                   
                     <p >{listing.name}</p>
                   
                    </Link>

                    <div className='flex flex-col items-center'>
                            <button className='text-red-600 ' onClick={()=>handleDeleteList(listing._id)}> Delete</button>
                            
                            <Link to={`/update-listing/${listing._id}`}>
                            <button className='text-green-600 '> Edit</button>
                            </Link>


                            
                           


                    </div>

          </div>

        ))}


    </div>




  )
}

export default Profile