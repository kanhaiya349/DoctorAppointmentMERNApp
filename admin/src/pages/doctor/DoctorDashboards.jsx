
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";

function DoctorDashboards() {
  const {
    dtoken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken]);

  return (
    dashData && (
      <div className="bg-gray-50 w-[95%] h-full px-7 py-4 flex flex-col gap-6">
        <div className="flex gap-3 flex-wrap">
          <div className="flex gap-5 px-6 bg-white items-center h-20 shadow shadow-3xl rounded-lg">
            <img className="w-10" src={assets.earning_icon} alt="" />
            <div className="flex flex-col">
              <p className="font-semibold">
                {currency}
                {dashData.earnings}
              </p>
              <p className="font-sm text-textColor text-sm">Earnings</p>
            </div>
          </div>
          <div className="flex gap-5 px-6 bg-white items-center h-20 shadow shadow-3xl rounded-lg">
            <img className="w-10" src={assets.appointments_icon} alt="" />
            <div className="flex flex-col">
              <p className="font-semibold">{dashData.appointments}</p>
              <p className="font-sm text-textColor text-sm">Appointments</p>
            </div>
          </div>
          <div className="flex gap-5 px-6 bg-white items-center h-20 shadow shadow-3xl rounded-lg">
            <img className="w-10" src={assets.patients_icon} alt="" />
            <div className="flex flex-col">
              <p className="font-semibold">{dashData.patients}</p>
              <p className="font-sm text-textColor text-sm">Patients</p>
            </div>
          </div>
        </div>
        <div className="shadow shadow-3xl bg-white max-w-[573px] rounded-lg">
          <div className="flex px-7 py-5 gap-3 items-center border-b">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointments</p>
          </div>
          <div className="max-md:px-0 px-7 pb-5 flex flex-col">
            {dashData &&
              dashData.latestAppointments.map((items, index) => (
                <div
                  key={index}
                  className="flex flex-col max-sm:gap-3 sm:flex-row justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-2 justify-start">
                    <img className="w-8 rounded-full"src={items.userData.image}alt=""/>
                    <div className='flex flex-col'>
                        <p className='max-md:font-medium max-md:text-sm font-semibold'>{items.userData.name}</p>
                        <p className='text-sm text-textColor text-sm'><span className='max-sm:hidden'>Appointment on </span>{slotDateFormat(items.slotDate)}</p>
                    </div>
                  </div>

                  {items.cancelled ? (
                    <div className="w-20 text-red-700 text-sm text-right">Cancelled</div>
                  ) : items.isCompleted ? (
                    <div className="w-20 text-green-700 text-sm text-right">Completed</div>
                  ) : (
                    <div className="flex w-20 items-center">
                      {items.payment?<div className="text-sm text-green-700 mr-2">Paid</div>:<img
                        className="w-10 cursor-pointer"
                        onClick={() => cancelAppointment(items._id)}
                        src={assets.cancel_icon}
                        alt=""
                      />}
                      <img
                        className="w-10 cursor-pointer"
                        onClick={() => completeAppointment(items._id)}
                        src={assets.tick_icon}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
}

export default DoctorDashboards;
