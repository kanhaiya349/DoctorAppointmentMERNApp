import { useContext } from "react";
import { useState } from "react"
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

function Login() {
    const [state,setState]=useState("Admin");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const {setatoken,backendURL}=useContext(AdminContext)
    const {setDtoken}=useContext(DoctorContext)

    const submitHandler= async (e)=>{
        e.preventDefault();
        try{
            if(state==="Admin"){
                const {data}=await axios.post(backendURL+'/api/admin/login',{email,password});
                if(data.success){
                    localStorage.setItem('atoken',data.token);
                    setatoken(data.token)
                }
                else{
                    toast.error(data.message);
                }
            }
            else{
                const {data}=await axios.post(backendURL+'/api/doctor/login',{email,password});
                if(data.success){
                    localStorage.setItem('dtoken',data.token);
                    setDtoken(data.token)
                }
                else{
                    toast.error(data.message);
                }
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

  return (
    <form className="flex justify-center items-center w-full h-[80vh]" onSubmit={submitHandler}>
       <div className="shadow-3xl w-[350px] p-9 rounded-lg">
            <h5 className="text-2xl font-semibold text-textColor mb-5 text-center"><span className="text-primary">{state}</span> Login</h5>
            <div className="flex flex-col">
                <p className="text-sm text-textColor mb-1">Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} placeholder={state==="Admin"?"admin@prescripto.com":""} type="email" value={email} className="border border-gray-300 mb-2 rounded-md h-9 pl-1" />
            </div>
            <div className="flex flex-col">
                <p className="text-sm text-textColor mb-1">Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" value={password} placeholder={state==="Admin"?"qwerty@123":""} className="border border-gray-300 mb-2 rounded-md h-9 pl-1" />
            </div>
            <button className="bg-primary w-full my-4 py-2 rounded-md text-white">Login</button>
            <div className="mt-2 text-sm text-textColor">
                {state==="Admin"?
                    <p>Doctor Login? <span className="ml-1 text-primary underline cursor-pointer hover:text-yellow-500 transition-all ease-in-out 500 " onClick={()=>setState("Doctor")} >click here</span></p>   :
                    <p>Admin Login? <span className="ml-1 text-primary underline cursor-pointer hover:text-yellow-500 transition-all ease-in-out 500 " onClick={()=>setState("Admin")} >click here</span></p> 
                }
            </div>
        </div> 
    </form>
  )
}

export default Login