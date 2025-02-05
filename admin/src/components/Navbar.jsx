import { useContext } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../context/AdminContext"
import {useNavigate} from "react-router-dom"
import { DoctorContext } from "../context/DoctorContext";

function Navbar() {
    const {atoken,setatoken}=useContext(AdminContext);
    const {dtoken,setDtoken}=useContext(DoctorContext);
    const navigate=useNavigate()

    const logout=()=>{
        navigate("/")
        atoken && setatoken('')
        atoken && localStorage.removeItem('atoken');
        dtoken && setDtoken('')
        dtoken && localStorage.removeItem('dtoken');
    }

  return (
    <div className="w-full h-auto bg-white">
        <div className="my-4 flex justify-between items-center px-6 md:px-8 lg:px-10">
        <div className="flex gap-2 items-center">
            <img onClick={()=>navigate("/")} className="max-md:w-28 w-40 cursor-pointer" src={assets.admin_logo} alt="" />
            <div className="text-[11px] border border-textColor py-0.5 text-textColor px-2 rounded-full">{dtoken?"doctor":"admin"}</div>
        </div>
        <button onClick={logout} className="bg-primary text-white px-4 md:px-8 rounded-full py-2 text-sm font-semibold hover:bg-blue-700 transition-all ease-in-out duration-500">Logout</button>
        </div>
        <hr />
    </div>
  )
}

export default Navbar