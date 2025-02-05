import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import {NavLink} from "react-router-dom"
import { assets } from "../assets/assets";
import {useNavigate} from "react-router-dom"
import { DoctorContext } from "../context/DoctorContext";

function Sidebar() {
    const navigate= useNavigate();
    const {atoken}=useContext(AdminContext);
    const {dtoken}=useContext(DoctorContext)

  return (
    <div className="flex">
        {atoken&&<ul className="flex flex-col my-10 text-textColor text-sm font-semibold">
            <NavLink className={({isActive})=>`flex gap-3 items-center cursor-pointer max-sm:px-2 sm:pl-8 sm:pr-24 h-[48px] ${isActive?"bg-blue-100 border-r-4 border-primary":""}`} to={"/admin-dashboard"}>
                <img src={assets.home_icon} alt="" />
                <p className="max-sm:hidden">Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex gap-3 items-center cursor-pointer max-sm:px-2 sm:pl-8 sm:pr-24 h-[48px] ${isActive?"bg-blue-100 border-r-4 border-primary":""}`}  to={"/all-appointments"}>
                <img src={assets.appointment_icon} alt="" />
                <p className="max-sm:hidden">Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex gap-3 items-center cursor-pointer max-sm:px-2 sm:pl-8 sm:pr-20 h-[48px] ${isActive?"bg-blue-100 border-r-4 border-primary":""}`}  to={"/add-doctor"}>
                <img src={assets.add_icon} alt="" />
                <p className="max-sm:hidden">Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex gap-3 items-center cursor-pointer max-sm:px-2 sm:pl-8 sm:pr-20 h-[48px] ${isActive?"bg-blue-100 border-r-4 border-primary":""}`} to={"/doctor-list"}>
                <img src={assets.people_icon} alt="" />
                <p className="max-sm:hidden">Doctor List</p>
            </NavLink>
        </ul>}
        {dtoken&&<ul className="flex flex-col my-10 text-textColor text-sm font-semibold">
            <NavLink className={({isActive})=>`flex gap-3 items-center cursor-pointer max-sm:px-2 sm:pl-8 sm:pr-24 h-[48px] ${isActive?"bg-blue-100 border-r-4 border-primary":""}`} to={"/doctor-dashboard"}>
                <img src={assets.home_icon} alt="" />
                <p className="max-sm:hidden">Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex gap-3 items-center cursor-pointer max-sm:px-2 sm:pl-8 sm:pr-24 h-[48px] ${isActive?"bg-blue-100 border-r-4 border-primary":""}`}  to={"/doctor-appointments"}>
                <img src={assets.appointment_icon} alt="" />
                <p className="max-sm:hidden">Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex gap-3 items-center cursor-pointer max-sm:px-2 sm:pl-8 sm:pr-20 h-[48px] ${isActive?"bg-blue-100 border-r-4 border-primary":""}`}  to={"/doctor-profile"}>
                <img src={assets.add_icon} alt="" />
                <p className="max-sm:hidden">Profile</p>
            </NavLink>
        </ul>}
    </div>
  )
}

export default Sidebar