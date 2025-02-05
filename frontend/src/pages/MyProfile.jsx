import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";


function MyProfile() {
  const { userData, setUserData, token, backendUrl, loadUserProfile } =useContext(AppContext);
  const [image,setImage]=useState(false)

  const [isEdit, setIsEdit] = useState(false);

  const updateUserProfile=async ()=>{
    try{
      const formData=new FormData()
      
      formData.append('userId',userData._id)
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      image && formData.append('image',image)

      const {data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        await loadUserProfile()
        setImage(false)
        setIsEdit(false)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }

  }

  return (
    userData && (
      <div className="mb-20 flex flex-col">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer mb-8">
              <img className="w-40 rounded opacity-75" src={image?URL.createObjectURL(image):userData.image} alt="" />
              <img className="w-10 absolute bottom-14 right-14" src={image?'':assets.upload_icon} alt="" />
            </div>
            <input type="file" id="image" onChange={(e)=>setImage(e.target.files[0])} hidden/>
          </label>
        ) : (
          <div className="mb-8">
            <img className="w-40 rounded-lg" src={userData.image} alt="" />
          </div>
        )}

        <h4 className="text-3xl font-semibold mb-1.5">
        {isEdit ? (
              <input
                className="bg-blue-50 border border-gray-300 rounded-md pl-1 py-1"
                type="text"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                value={userData.name}
                required
              />
            ) : (
              userData.name
            )}</h4>
        <p className="w-full h-[1px] mb-4 bg-gray-400"></p>
        <p className="text-lg underline text-textColor mb-2">
          Contact Information
        </p>
        <div className="w-full">
          <p className="text-sm flex w-5/6 sm:w-1/2 lg:w-1/3 xl:1/4 justify-between mb-2 text-primary">
            <span className="text-black">Email id:</span>
            {userData.email}
          </p>
          <p className="text-sm flex w-5/6 sm:w-1/2 lg:w-1/3 xl:1/4 justify-between mb-2">
            <span>Phone:</span>
            {isEdit ? (
              <input
                className="bg-blue-50 border border-gray-300 rounded-md pl-1 py-1"
                type="tel"
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                value={userData.phone}
                required
              />
            ) : (
              userData.phone
            )}
          </p>
          <p className="text-sm flex w-5/6 sm:w-1/2 lg:w-1/3 xl:1/4 justify-between mb-2">
            <span>Address:</span>
            <span className="flex flex-col gap-0.5">
              {isEdit ? (
                <input
                  className="bg-blue-50 border border-gray-300 rounded-md pl-1 py-1"
                  type="text"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      address: { ...userData.address, line1: e.target.value },
                    })
                  }
                  value={userData.address.line1}
                />
              ) : (
                <div>{userData.address.line1}</div>
              )}
              {isEdit ? (
                <input
                  className="bg-blue-50 border border-gray-300 rounded-md pl-1 py-1"
                  type="text"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      address: { ...userData.address, line2: e.target.value },
                    })
                  }
                  value={userData.address.line2}
                />
              ) : (
                <div className="mt-1">{userData.address.line2}</div>
              )}
            </span>
          </p>
        </div>
        <p className="text-lg underline text-textColor my-2">
          Basic Information
        </p>
        <div>
          <p className="text-sm flex w-5/6 sm:w-1/2 lg:w-1/3 xl:1/4 justify-between mb-2">
            <span>Gender:</span>
            {isEdit ? (
              <select
                className="border border-gray-400"
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
                value={userData.gender}
              >
                <option value="">No Select</option>
                <option value="Male">Male</option>
                <option value="Femal">Female</option>
                <option value="Prefer Not to say">Prefer not to say</option>
              </select>
            ) : (
              userData.gender
            )}
          </p>
          <p className="text-sm flex w-5/6 sm:w-1/2 lg:w-1/3 xl:1/4 justify-between mb-2">
            <span>Birthday:</span>
            {isEdit ? (
              <input
                type="date"
                onChange={(e) =>
                  setUserData({ ...userData, dob: e.target.value })
                }
                value={userData.dob}
              />
            ) : (
              userData.dob
            )}
          </p>
        </div>
        <div className="mt-4">
          <button
            onClick={() => setIsEdit(true)}
            className={`${
              isEdit ? "hidden" : ""
            } border border-blue-300 px-5 py-1 hover:bg-primary hover:text-white transition-all ease-in-out duration-500 rounded-full`}
          >
            Edit
          </button>
          <button
            onClick={updateUserProfile}
            className={`${
              isEdit ? "" : "hidden"
            } border border-blue-300 px-5 py-1 hover:bg-primary hover:text-white transition-all ease-in-out duration-500 rounded-full`}
          >
            Save
          </button>
        </div>
      </div>
    )
  );
}

export default MyProfile;
