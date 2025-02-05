import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Banners() {
  const navigate=useNavigate();
  const {token}=useContext(AppContext)
  return (
    <div className="flex flex-col md:flex-row justify-between sm:px-6 md:px-10 lg:px-14 items-center bg-primary mb-48 rounded-xl pt-6 mt-10">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col justify-center items-center">
            <p className="text-4xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white !leading-relaxed">Book Appointment With 100+ Trusted Doctors</p>
            {!token?<button onClick={()=>{navigate("/login");scrollTo(0,0)}} className="bg-white w-[170px] py-3 rounded-full my-10 text-[#5C5C5C] font-semibold hover:scale-110 transition-all ease-in-out duration-500">Login</button>:""}
        </div>
        {/* Right Side */}
        <div className="md:w-1/2 relative flex justify-end items-end mr-24 md:mr-0">
            <img src={assets.appointment_img} className="w-96" alt="" />
        </div>
    </div>
  )
}

export default Banners