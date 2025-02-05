import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import {toast} from "react-toastify"
import axios from "axios";

function DoctorProfile() {
  const { dtoken, profileData, setProfileData, getProfileData,backendUrl } =useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit,setIsEdit]=useState(false)

  const updateProfile=async ()=>{
    try{
        const updateDate={
            address:profileData.address,
            fees:profileData.fees,
            available:profileData.available
        }

        const {data} = await axios.post(backendUrl+'/api/doctor/update-profile',updateDate,{headers:{dtoken}})
        if(data.success){
            toast.success(data.message)
            setIsEdit(false)
            getProfileData()
        }
        else{
            toast.error(data.message)
        }
    }
    catch(error){
        toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  return (
    profileData && (
      <div className="bg-gray-50 w-[95%] h-full p-4 flex flex-col">
        <img
          className="w-64 rounded-lg bg-primary/80 relative"
          src={profileData.image}
          alt=""
        />
        <div className="bg-white pl-10 pt-16">
          <p className="text-3xl font-semibold mb-1">{profileData.name}</p>
          <div className="flex gap-1 text-textColor font-semibold mb-2">
            <p className="text-sm">{profileData.degree} - </p>
            <p className="text-sm">{profileData.speciality}</p>
            <p className="border rounded-full px-2 ml-1 text-[10px] flex items-center">{profileData.experiance}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold mb-1">About:</p>
            <p className="text-textColor mb-2">{profileData.about}</p>
          </div>
          <div className="flex gap-1 mb-2">
            <p className="font-semibold mb-1">Appointment Fee:</p>
            <p className="text-textColor font-semibold">
              {currency}
              {isEdit?<input type="number" className="border border-textColor w-16 rounded-md pl-1" onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees} />:profileData.fees}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold mb-1">Address:</p>
            <div className="flex flex-col text-sm mb-2 gap-2">
                <p>{isEdit?<input type="text" className="border border-textColor pl-1 rounded-md py-0.5" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1} />:profileData.address.line1}</p>
                <p>{isEdit?<input type="text" className="border border-textColor pl-1 rounded-md py-0.5" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/>:profileData.address.line2}</p>
            </div>
          </div>
          <div className="flex gap-2 mb-5">
            <input type="checkbox" id="docAvail" checked={profileData.available} onChange={()=>isEdit&&setProfileData(prev=>({...prev,available:!prev.available}))} className="cursor-pointer" />
            <label htmlFor="docAvail" className="font-semibold text-sm cursor-pointer">Available</label>
          </div>
          {isEdit?
            <button onClick={updateProfile} className="text-start border border-black rounded-full px-4 py-0.5 text-textColor font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all ease-in-out duration-500 ">Save</button>
            :
            <button onClick={()=>setIsEdit(true)} className="text-start border border-black rounded-full px-4 py-0.5 text-textColor font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all ease-in-out duration-500 ">Edit</button>
          }
        </div>
      </div>
    )
  );
}

export default DoctorProfile;
