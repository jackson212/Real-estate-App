import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './router/userRoute.js'
dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("database is connected")

}).catch((err)=>{
   
   console.log(err)

})

const app =express()

app.use('/api/user',UserRouter)

app.listen(3000,()=>{
   console.log(`app is running on port ${process.env.PORT}`)
   
})


