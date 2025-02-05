
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets.js' 

function Appointments() {
  const {atoken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext)
  const {calculateAge,slotDateFormat,currency}=useContext(AppContext)

  useEffect(()=>{
    if(atoken){
      getAllAppointments()
    }
  },[atoken])

  return (
    <div className='px-7 py-4'>
        <h4 className="text-xl mb-4 font-semibold">All Appointments</h4>
        <div className='bg-white flex flex-col border'>
          <div className='hidden xl:flex justify-between px-4 py-3 border-bottom'>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>
          {appointments.reverse().map((items,index)=>(
            <div key={index} className='flex flex-col max-sm:gap-3 sm:flex-row justify-between px-4 py-3'>
              <p className='sm:hidden lg:flex w-5 flex justify-center items-center'>{index+1}</p>
              <div className='flex items-center gap-2 w-8 xl:w-48 justify-start'>
                <img className='w-8 rounded-full sm:hidden xl:flex' src={items.userData.image} alt="" />
                <p className='text-sm md:text-base'>{items.userData.name}</p>
              </div>
              <p className='max-lg:hidden w-[15px] flex justify-center items-center'>{isNaN(calculateAge(items.userData.dob))?"N/A":calculateAge(items.userData.dob)}</p>
              <p className='md:w-48 flex items-center text-[11px] md:text-base md:ml-6'>{slotDateFormat(items.slotDate)}, {items.slotTime}</p>
              <div className='flex items-center justify-start gap-2 w-8 xl:w-48'>
                <img className='w-8 rounded-full sm:hidden xl:flex' src={items.docData.image} alt="" />
                <p className='text-sm md:text-base'>{items.docData.name}</p>
              </div>
              <p className='max-md:hidden'>{currency}{items.docData.fees}</p>
              {items.cancelled?
                <div className='text-red-700 text-[9px] font-medium w-5 md:text-[12px] md:w-16 flex items-center justify-center max-sm:ml-3'>Cancelled</div>:
                items.isCompleted?
                <div className='text-green-700 text-[9px] font-medium w-5 md:text-[12px] md:w-16 flex items-center justify-center max-sm:ml-3'>Completed</div>
                :<div onClick={()=>cancelAppointment(items._id)} className='w-16 sm:w-5 md:w-16 flex items-center justify-center max-sm:ml-3'><img className='w-10 sm:w-5 md:w-10 cursor-pointer' src={assets.cancel_icon} /></div>
            }
            </div>
          ))}
        </div>
    </div>
  )
}

export default Appointments