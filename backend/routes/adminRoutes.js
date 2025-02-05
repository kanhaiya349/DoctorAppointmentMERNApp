import express from "express";
import { addDoctor ,adminDashboard,allDoctors,appointmentCancel,appointmentsAdmin,loginAdmin } from "../controllers/adminControllers.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorControllers.js";
console.log("Multer module imported successfully!");


const adminRouter=express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-doctor',authAdmin,allDoctors)
adminRouter.post('/change-availibility',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter