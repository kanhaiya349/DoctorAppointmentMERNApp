import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyAppointments() {
  const { backendUrl,token } = useContext(AppContext);
  const [appointments,setAppointments]=useState([])
  const [isCancelled, setIsCancelled] = useState(new Set());
  const months=["","Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const navigate=useNavigate()

  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split("_")
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments=async ()=>{
    try{
      const {data} =await axios.get(backendUrl+'/api/user/appointment',{headers:{token}})

      if(data.success){
        setAppointments(data.appointments.reverse())
        const cancelledSet= new Set(data.appointments.filter(appt=>appt.cancelled).map(appt=>appt._id))
        setIsCancelled(cancelledSet)
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }
  const cancelAppointment= async(appointmentId)=>{
    try{
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        setIsCancelled((prev) => new Set(prev).add(appointmentId));
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }

  const initPay=(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response)
        try{
            const {data}=await axios.post(backendUrl+'/api/user/verify-razorpay',response,{headers:{token}})
            if(data.success){
              getUserAppointments()
              navigate('/my-appointments')
            }
        }
        catch(error){
          toast.error(error.message)
        }
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorPay=async (appointmentId)=>{
    try{
      const {data}= await axios.post(backendUrl+'/api/user/payment-Razorpay',{appointmentId},{headers:{token}})
      if(data.success){
        initPay(data.order)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])

  return (
    <div className="mb-20 flex flex-col mt-10">
      <h5 className="text-textColor text-lg font-semibold">
        My Appointments
      </h5>
      <div className="flex flex-col py-5">
        {appointments.map((item, index) => (
          <div key={index} className="flex flex-col">
            <p className="w-full h-[1px] bg-gray-300 mb-5"></p>
            <div className="flex gap-5 mb-5">
              <img
                className="max-h-20 sm-max-h-24 md:max-h-28 lg:max-h-32 xl:max-h-36 bg-blue-100 rounded-lg"
                src={item.docData.image}
                alt=""
              />
              <div className="flex flex-col md:flex-row w-full justify-between">
                <div className="flex flex-col">
                  <p className="font-semibold">{item.docData.name}</p>
                  <p className="text-sm text-textColor mb-1">
                    {item.docData.speciality}
                  </p>
                  <p className="text-sm text-textColor font-semibold">
                    Address:
                  </p>
                  <p className="text-sm text-textColor">{item.docData.address.line1}</p>
                  <p className="text-sm text-textColor mb-1">
                    {item.docData.address.line2}
                  </p>
                  <p className="text-sm text-textColor">
                    <span className="font-semibold">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                <div className="h-full mt-3">
                  {!isCancelled.has(item._id) ? (
                    <div className="flex h-full flex-col justify-end gap-3">
                      {item.payment&&!item.isCompleted&&<button className={`text-sm border w-32 sm:w-44 border-gray-200 px-5 py-2 rounded-sm bg-blue-50`}>Paid</button>}
                      {!item.isCompleted&&<button
                        onClick={()=>appointmentRazorPay(item._id)}
                        className={`text-sm border w-32 sm:w-44 border-gray-200 px-5 py-2 ${item.payment?"hidden":""} rounded-sm hover:bg-primary hover:text-white transition-all ease-in-out duration-500`}
                      >
                        Pay Online
                      </button>}
                      {!item.isCompleted&&<button
                        onClick={() => cancelAppointment(item._id)}
                        className={`text-sm border w-32 sm:w-44 border-gray-200 px-5 py-2 ${item.payment?"hidden":""} rounded-sm hover:bg-red-600 hover:text-white transition-all ease-in-out duration-500`}
                      >
                        Cancel Appointment
                      </button>}
                      {item.isCompleted&&<button
                      className={`text-sm border w-32 sm:w-48 border-green-600 text-green-600 px-5 py-2 rounded-sm cursor-default`}
                    >
                      Completed
                    </button>}
                    </div>
                  ) : (
                    <div>
                      {!item.isCompleted&&<button
                      className={`text-sm border w-32 sm:w-48 border-red-600 text-red-600 px-5 py-2 rounded-sm cursor-default`}
                    >
                      Appointment Cancelled
                    </button>}
                    {item.isCompleted&&<button
                      className={`text-sm border w-32 sm:w-48 border-green-600 text-green-600 px-5 py-2 rounded-sm cursor-default`}
                    >
                      Completed
                    </button>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
