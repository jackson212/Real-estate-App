import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './router/userRoute.js'
import AuthRoute from './router/authRouter.js'

dotenv.config()

mongoose.connect("mongodb+srv://jackson:R7n99WPYLChYqH1E@real-estate.auxdjie.mongodb.net/?retryWrites=true&w=majority&appName=real-estate").then(()=>{
  console.log("database is connected")

}).catch((err)=>{
   
   console.log(err)

})

const app =express()

app.use(express.json())
app.use('/api/user',UserRouter)
app.use('/api/auth',AuthRoute)

//
app.use((err,req,res,next)=>{

  const statusCode=err.statusCode ||500;
  const message =err.message||'internal server Error';
  return res.status(statusCode).json({
            
   success:false,
   statusCode,
   message
 

  })

})

app.listen(3000,()=>{
   console.log(`app is running `)
   
})