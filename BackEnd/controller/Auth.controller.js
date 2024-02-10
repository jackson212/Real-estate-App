import  User from '../models/user.model.js'
import bcryptjs from 'bcrypt';
import { errorHandler } from '../util/err.js';



export const  signup= async(req,res,next)=>{
  
  const{name,email,password}=req.body
  
  const hashedPassword=await  bcryptjs.hashSync(password,10);
  
  const newSignup= new User({name,email,password :hashedPassword})
  
  try{
  
    await newSignup.save()
  
    res.status(201).json({
     message:"well done"
    })
  
  }catch(error){
    next(error)
  
  }
} 