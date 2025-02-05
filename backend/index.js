import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDb from "./config/mongoDb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoutes.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoutes.js"

//app config
const app=express()
const port=process.env.PORT||4000
connectDb()
connectCloudinary()
//middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get("/",(req,res)=>{
    res.send("API working");
})

app.listen(port,()=>console.log("working at",port));