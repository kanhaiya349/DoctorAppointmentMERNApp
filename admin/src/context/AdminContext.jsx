import { createContext,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider=(props)=>{
    const [atoken,setatoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const [doctors,setDoctors]=useState([])
    const [appointments,setAppointments]=useState([])
    const [dashData,setDashData]=useState(false)

    const backendURL=import.meta.env.VITE_BACKEND_URL
    const getAllDoctors=async ()=>{
        try{
            const {data}=await axios.get(backendURL+'/api/admin/all-doctor',{headers:{atoken}})
            if(data.success){
                setDoctors(data.doctor)
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    const changeAvailibility= async (docId)=>{
        try{
            const {data}=await axios.post(backendURL+'/api/admin/change-availibility',{docId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    const getAllAppointments=async ()=>{
        try{
            const {data}=await axios.get(backendURL+'/api/admin/appointments',{headers:{atoken}})
            if(data.success){
                setAppointments(data.appointments);
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    const cancelAppointment=async (appointmentId)=>{
        try{
            const {data}=await axios.post(backendURL+'/api/admin/cancel-appointment',{appointmentId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
                getDashData()
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    const getDashData=async()=>{
        try{
            const {data}=await axios.get(backendURL+'/api/admin/dashboard',{headers:{atoken}})
            if(data.success){
                setDashData(data.dashData)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    const value={
        atoken,setatoken,
        backendURL,doctors,
        getAllDoctors,changeAvailibility,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider