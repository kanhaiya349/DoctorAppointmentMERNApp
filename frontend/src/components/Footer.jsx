import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"

function Footer() {
    const navigate=useNavigate();
  return (
    <div className="flex flex-col">
        <div className="border-b mb-5 pb-6 border-grey-300 flex flex-col md:flex-row justify-between">
            <div className="md:w-1/3">
                <img onClick={()=>{navigate("/");scrollTo(0,0)}} src={assets.logo} alt="" className="w-40 mb-5 cursor-pointer" />
                <p className="text-sm text-[#5C5C5C] font-normal">Prescripto is a cutting-edge doctor appointment booking platform designed to connect patients with healthcare professionals seamlessly. Our mission is to simplify healthcare access by providing a user-friendly interface for scheduling consultations, managing medical records, and ensuring hassle-free communication between doctors and patients.</p>
            </div>
            <div className="lg:ml-20">
                <h5 className="text-xl font-semibold mb-5 mt-10 md:mt-0">COMPANY</h5>
                <p onClick={()=>{navigate("/");scrollTo(0,0)}} className="text-sm text-[#5C5C5C] font-semibold mb-2 cursor-pointer hover:text-primary transition-all ease-in-out duration-500">Home</p>
                <p onClick={()=>{navigate("/about");scrollTo(0,0)}} className="text-sm text-[#5C5C5C] font-semibold mb-2 cursor-pointer hover:text-primary transition-all ease-in-out duration-500">About us</p>
                <p onClick={()=>{navigate("/contact");scrollTo(0,0)}} className="text-sm text-[#5C5C5C] font-semibold mb-2 cursor-pointer hover:text-primary transition-all ease-in-out duration-500">Contact</p>
                <p onClick={()=>{navigate("/privacy");scrollTo(0,0)}} className="text-sm text-[#5C5C5C] font-semibold mb-2 cursor-pointer hover:text-primary transition-all ease-in-out duration-500">Privacy Policy</p>
            </div>
            <div className="lg:mr-20">
                <p className="text-xl font-semibold mb-5 mt-10 md:mt-0">GET IN TOUCH</p>
                <p onClick={()=>window.location.href="tel:+919508920251"} className="text-sm text-[#5C5C5C] font-semibold mb-2 cursor-pointer hover:text-primary hover:underline decoration-primary transition-all ease-in-out duration-500">+91-95089-20251</p>
                <p onClick={()=>window.location.href="mailto:kanhaiyashuklagarg@gmail.com"} className="text-sm text-[#5C5C5C] font-semibold mb-2 cursor-pointer hover:text-primary hover:underline decoration-primary transition-all ease-in-out duration-500">kanhaiyashuklagarg@gmail.com</p>
            </div>
        </div>
        <div className="flex justify-center items-center mb-5 text-sm text-[#5C5C5C] font-semibold">Copyright 2024 @ Prescripto - All Right Reserved.</div>
    </div>
  )
}

export default Footer