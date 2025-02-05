import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext";

function TopDoctors() {
    const navigate=useNavigate();
    const {doctors}=useContext(AppContext)
  return (
    <div className="flex flex-col items-center mt-10">
        <h3 className="text-3xl font-semibold mb-4">Top Doctors to Book</h3>
        <p className="text-center text-sm mb-10">Simply browse through our extensive list of trusted doctors.</p>
        <div className="w-full grid grid-cols-auto gap-6">
            {doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className="border border-[#C9D8FF] flex flex-col rounded-xl cursor-pointer hover:-translate-y-3 transition-all ease-in-out duration-500" key={index}>
                    <img src={item.image} className="bg-[#EAEFFF] rounded-t-xl mb-4" alt="" />
                    <div className="flex items-center gap-2 ml-3">
                        <p className={`w-2 h-2 ${item.available?"bg-green-500":"bg-gray-500"} rounded-full`}></p>
                        <p className={`text-green-500 ${item.available?"text-green-500":"text-gray-500"} text-sm`}>{item.available?"Available":"Not Available"}</p>
                    </div>
                    <p className="ml-3 text-lg font-semibold">{item.name}</p>
                    <p className="ml-3 text-sm mb-4 text-[#5C5C5C] font-medium">{item.speciality}</p>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate("/doctors"),scrollTo(0,0)}} className="my-16 shadow-3xl px-4 py-2 rounded-full text-[#5C5C5C] bg-[#EAEFFF] font-semibold hover:bg-blue-400 hover:text-white transition-all ease-in-out duration-500">Show More</button>
    </div>
  )
}

export default TopDoctors