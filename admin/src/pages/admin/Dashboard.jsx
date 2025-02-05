
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import {assets} from "../../assets/assets.js"
import { AppContext } from '../../context/AppContext.jsx'

function Dashboard() {
  const {atoken,getDashData,cancelAppointment,dashData}=useContext(AdminContext)
  const {slotDateFormat}=useContext(AppContext)

  useEffect(()=>{
    if(atoken){
      getDashData()
    }
  },[atoken])
  return (
    <div className='px-7 py-4 flex flex-col gap-6'>
        <div className='flex gap-3 flex-wrap'>
          <div className='flex gap-8 px-6 bg-white items-center h-20 shadow shadow-3xl rounded-lg'>
            <img className='w-10' src={assets.doctor_icon} alt="" />
            <div className='flex flex-col'>
              <p className='font-semibold'>{dashData.doctors}</p>
              <p className='font-sm text-textColor text-sm'>Doctors</p>
            </div>
          </div>
          <div className='flex gap-8 px-6 bg-white items-center h-20 shadow shadow-3xl rounded-lg'>
            <img className='w-10' src={assets.appointments_icon} alt="" />
            <div className='flex flex-col'>
              <p className='font-semibold'>{dashData.appointments}</p>
              <p className='font-sm text-textColor text-sm'>Appointments</p>
            </div>
          </div>
          <div className='flex gap-8 px-6 bg-white items-center h-20 shadow shadow-3xl rounded-lg'>
            <img className='w-10' src={assets.patients_icon} alt="" />
            <div className='flex flex-col'>
              <p className='font-semibold'>{dashData.patients}</p>
              <p className='font-sm text-textColor text-sm'>Patients</p>
            </div>
          </div>
        </div>
        <div className='shadow shadow-3xl bg-white max-w-[573px] rounded-lg'>
          <div className='flex px-7 py-5 gap-3 items-center border-b'>
            <img src={assets.list_icon} alt="" />
            <p className='font-semibold'>Latest Appointments</p>
          </div>
          <div className='max-md:px-0 px-7 pb-5 flex flex-col'>
            {dashData&&dashData.latestAppointments.map((items,index)=>(
              <div key={index} className='flex justify-between items-center pt-5'>
                <div className='flex gap-4 items-center'>
                  <img className='h-10 rounded-full' src={items.docData.image}/>
                  <div className='flex flex-col'>
                    <p className='max-md:font-medium max-md:text-sm font-semibold'>{items.docData.name}</p>
                    <p className='text-sm text-textColor text-sm'><span className='max-sm:hidden'>Appointment on </span>{slotDateFormat(items.slotDate)}</p>
                  </div>
                </div>
                {items.cancelled?
                  <div className='w-14 text-[12px] items-center text-red-700 mr-2 text-right'>Cancelled</div> : items.isCompleted?<div className='w-14 text-[12px] items-center text-green-700 mr-2 text-right'>Completed</div> : <button className='w-14 flex justify-center items-center mr-2'><img className='w-9' onClick={()=>cancelAppointment(items._id)} src={assets.cancel_icon} alt="" /></button>
              }
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Dashboard