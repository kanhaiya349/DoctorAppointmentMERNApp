import { useState } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddDoctor() {
  
  const [docImg,setDocImg]=useState(false);
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [experiance,setExperiance]=useState("1 Year")
  const [fees,setFees]=useState("")
  const [speciality,setSpeciality]=useState('General Physician')
  const [about,setAbout]=useState("")
  const [degree,setDegree]=useState("MBBS")
  const [address1,setAddress1]=useState("")
  const [address2,setAddress2]=useState("")

  const {backendURL,atoken} =useContext(AdminContext)

  const onSubmitHandler= async (e)=>{
    e.preventDefault();

    try{
      if(!docImg){
        return toast.error("Image not selected")
      }
      const formData=new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experiance',experiance)
      formData.append('fees',fees)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('about',about)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))

      const {data}=await axios.post(backendURL+'/api/admin/add-doctor',formData,{headers:{atoken}})

      if(data.success){
        setDocImg(false)
        setName("")
        setEmail("")
        setPassword("")
        setExperiance("1 year")
        setFees("")
        setSpeciality("General physician")
        setDegree("MBBS")
        setAbout("");
        setAddress1("")
        setAddress2("")
        toast.success(data.message)
      }
      else{
        toast.error(data.message);
      }

    }
    catch(error){
      toast.error(error);
    }

  }

  return (
    <div className="p-4">
      <h4 className="font-bold mb-4 lg:text-2xl xl:text-3xl">Add Doctor</h4>
      <form onSubmit={onSubmitHandler} className="flex flex-col bg-white p-5 border rounded-md sm:w[400px] md:w-[500px] lg:w-[700px] xl:w-[950px]">
        <label htmlFor="doc-img">
          <div className="flex gap-4 cursor-pointer items-center mb-5 w-[200px]">
            <img
              className="w-16 hover:scale-110 transition-hover ease-in-out duration-300 rounded-full"
              src={docImg?URL.createObjectURL(docImg):assets.upload_area}
              alt=""
            />
            <p className="text-textColor font-semibold hover:text-primary hover:underline">
              Upload doctor <br /> image
            </p>
          </div>
        </label>
        <input onChange={(e)=>{setDocImg(e.target.files[0])}} type="file" id="doc-img" hidden />
        <div className="flex flex-col md:flex-row mt-10 gap-6">
          <div className="flex flex-col w-full md:w-[45%]">
            <p className="text-textColor font-semibold">Doctor Name</p>
            <input
              type="text"
              className="border border-gray-300 px-2 py-1 w-full my-2"
              placeholder="Name"
              onChange={(e)=>setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="w-full md:w-[45%]">
            <p className="text-textColor font-semibold">Speciality</p>
            <select
              name=""
              id=""
              className="border border-gray-300 px-2 py-1 cursor-pointer w-full my-2"
              onChange={(e)=>setSpeciality(e.target.value)}
              value={speciality}
            >
              <option value="General physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[45%]">
            <p className="text-textColor font-semibold">Doctor Email</p>
            <input
              type="email"
              className="border border-gray-300 w-full px-2 py-1 my-2"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="w-full md:w-[45%]">
            <p className="text-textColor font-semibold">Degree</p>
            <input
              type="text"
              className="border border-gray-300 w-full px-2 py-1 my-2"
              placeholder="Degree"
              onChange={(e)=>setDegree(e.target.value)}
              value={degree}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col w-full md:w-[45%]">
            <div className="">
              <p className="text-textColor font-semibold">Set Password</p>
              <input
                type="password"
                className="border border-gray-300 w-full px-2 py-1 my-2"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div>
              <p className="text-textColor font-semibold">Experiance</p>
              <select className="border border-gray-300 w-full px-2 py-1 my-2 cursor-pointer" onChange={(e)=>setExperiance(e.target.value)} value={experiance} >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-[45%]">
            <p className="text-textColor font-semibold">Address</p>
            <input
              type="text"
              className="border border-gray-300 w-full px-2 py-1 mt-2"
              placeholder="Line1"
              onChange={(e)=>setAddress1(e.target.value)}
              value={address1}
              required
            />
            <input
              type="text"
              className="border border-gray-300 w-full px-2 py-1 my-2"
              placeholder="Line2"
              onChange={(e)=>setAddress2(e.target.value)}
              value={address2}
              required
            />
          </div>
        </div>
        <div className="w-full md:w-[45%]">
          <p className="text-textColor font-semibold">Fees</p>
          <input
            type="number"
            className="border border-gray-300 w-full px-2 py-1 my-2"
            placeholder="Doctor Fees"
            onChange={(e)=>setFees(e.target.value)}
            value={fees}
            required
          />
        </div>
        <div className="w-full">
          <p className="text-textColor font-semibold">About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="border border-gray-300 w-full my-2 px-2 py-1" rows="5" placeholder="Write about doctor" />
        </div>
        <button className="bg-primary p-3 text-white rounded-full w-[150px] hover:bg-blue-600 my-4 transition-all ease-in-out duration-500">Add Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor;
