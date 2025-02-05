import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function DoctorAppointment() {
  const {
    dtoken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="bg-gray-50 w-[95%] h-full px-7 py-4">
      <h4 className="text-xl mb-4 font-semibold">All Appointments</h4>
      <div className="bg-white flex flex-col border">
        <div className="hidden xl:flex justify-between px-4 py-3 border-bottom">
          <p className="w-5">#</p>
          <p className="w-48">Patient</p>
          <p className="w-16">Payment</p>
          <p className="w-[15px]">Age</p>
          <p className="w-48">Date & Time</p>
          <p>Fees</p>
          <p className="w-20">Actions</p>
        </div>
        {appointments.reverse().map((items, index) => (
          <div key={index} className="flex flex-col max-sm:gap-3 sm:flex-row justify-between px-4 py-3">
            <p className="max-lg:hidden w-5 flex justify-center items-center">
              {index + 1}
            </p>
            <div className="flex items-center gap-2 sm:w-8 xl:w-48 justify-start">
              <img
                className="w-8 rounded-full"
                src={items.userData.image}
                alt=""
              />
              <p className="ml-1 max-sm:flex hidden xl:flex">{items.userData.name}</p>
            </div>
            <p className="w-16">
              <span className="text-[11px] md:text-base border border-black flex justify-center items-center rounded-full">
                {items.payment ? "online" : "cash"}
              </span>
            </p>
            <p className="max-lg:hidden w-[15px] flex justify-center items-center">
              {calculateAge(items.userData.dob)}
            </p>
            <p className="md:w-48 flex items-center text-[11px] md:text-base">
              {slotDateFormat(items.slotDate)}, {items.slotTime}
            </p>
            <p className="max-md:hidden">
              {currency}
              {items.amount}
            </p>
            {items.cancelled ? (
              <div className="w-20 text-red-700 text-sm">Cancelled</div>
            ) : items.isCompleted ? (
              <div className="w-20 text-green-700 text-sm">Completed</div>
            ) : (
              <div className="flex w-20 items-center">
                <img
                  className="w-10 cursor-pointer"
                  onClick={() => cancelAppointment(items._id)}
                  src={assets.cancel_icon}
                  alt=""
                />
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
  );
}

export default DoctorAppointment;
