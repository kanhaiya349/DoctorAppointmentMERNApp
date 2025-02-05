import { assets } from "../assets/assets"

function Header() {
  return (
    <div className="bg-primary flex flex-col md:flex-row justify-between px-6 md:px-8 lg:px-16 rounded-xl pt-6 mt-20">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col gap-5 justify-center items-center md:items-start m-auto">
            <p className=" text-3xl lg:text-4xl xl:text-5xl text-white font-semibold leading-tight">Book Appointment <br /> With Trusted Doctors</p>
            <div className="flex flex-col md:flex-row items-center gap-5 mt-1">
                <img className="w-28 h-full" src={assets.group_profiles}/>
                <p className="text-white text-sm">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            </div>
            <a href="#speciality" className="mx-auto md:mx-0 w-full my-2 mb-2 py-3 rounded-full flex justify-center items-center bg-white gap-2 text-sm text-[#404040] hover:scale-110 transition-all ease-in-out duration-700">
                <p>Book Appointment</p>
                <img className="w-3" src={assets.arrow_icon} />
            </a>
        </div>
        {/* Right Side */}
        <div className="md:w-1/2 relative flex items-end">
            <img src={assets.header_img} className="w-full rounded-lg object-cover" alt="" />
        </div>
    </div>
  )
}

export default Header