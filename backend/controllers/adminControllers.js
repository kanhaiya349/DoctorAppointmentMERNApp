import validator from "validator"
import bcrypt from "bcryptjs"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const addDoctor=async (req,res)=>{
    try{
        const {name,email,password,speciality,degree,experiance,about,fees,address}=req.body
        const imageFile=req.file

        if(!name||!email||!password||!speciality||!degree||!experiance||!about||!fees||!address){
            return res.json({success:false,message:"Missing Details"});
        }

        //validating Email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"})
        }
        
        //validating password
        if(password.length<8){
            return res.send({success:false,message:"Invalid Password"})
        }

        //encrypting doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl=imageUpload.secure_url

        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experiance,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})

    }catch(error){
        res.json({success:false,message:error.message})
    }
}

//API for admin login
const loginAdmin=async (req,res)=>{
    try{
        const {email,password}=req.body

        if(email===process.env.ADMIN_EMAIL&& password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

//API for all doctors
const allDoctors=async (req,res)=>{
    try{
        const doctor=await doctorModel.find({}).select('-password')
        res.json({success:true,doctor})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

//API to get all appointments
const appointmentsAdmin=async (req,res)=>{
    try{
        const appointments=await appointmentModel.find({});
        res.json({success:true,appointments})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

//API for appointment cancellation
const appointmentCancel = async (req, res) => {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
  
    //Updation
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
  
    //Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);
    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
  
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true,message: "Appointment Cancelled" });
};
  
//API to get dashboard data for admin panel
const adminDashboard= async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})

        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}