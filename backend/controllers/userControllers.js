import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //validating Email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    //validating password
    if (password.length < 8) {
      return res.send({ success: false, message: "Invalid Password" });
    }

    //encrypting doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to update user profile
const updateUser = async (req, res) => {
  try {
    const { userId, gender, name, phone, address, dob } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !gender || !dob) {
      return res.json({ success: false, message: "Details Missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      gender,
      dob,
      address: JSON.parse(address),
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }
    let slots_booked = docData.slots_booked;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked; //because we are sending docData directly to appointmentModel where slots_booked is not needed, It will just takes the space
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API for my-appointments
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to cancel appointment
const cancelAppointment = async (req, res) => {
  const { userId, appointmentId } = req.body;

  //verify appointment user
  const appointmentData = await appointmentModel.findById(appointmentId);
  if (appointmentData.userId !== userId) {
    return res.json({ success: false, message: "Unauthorized Action" });
  }

  //Updation
  await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

  //Releasing doctor slot
  const { docId, slotDate, slotTime } = appointmentData;
  const docData = await doctorModel.findById(docId);
  let slots_booked = docData.slots_booked;
  slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);

  await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  res.json({ success: true, message: "Appointment Cancelled" });
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//API for payment of appointments
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment is either cancelled or not found",
      });
    }

    //creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 8660,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    }
    const order=await razorpayInstance.orders.create(options)
    res.json({success:true,order})
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to verify payment of razorpay
const verifyRazorPay=async (req,res)=>{
  try{
    const {razorpay_order_id}=req.body
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status==='paid'){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:true,message:"Payment Successful"})
    }
    else{
      res.json({success:false,message:"Payment Failed"})
    }
  }
  catch(error){
    res.json({success:false,message:error.message})
  }
}

export {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorPay,
};
