import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

function AllDoctors() {
  const { doctors, atoken, getAllDoctors,changeAvailibility } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="px-7 py-4">
      <h4 className="text-xl mb-4 font-semibold">All Doctors</h4>
      <div className="w-full grid grid-cols-auto gap-6">
        {doctors.map((items, index) => (
          <div className="border border-blue-200 rounded-lg" key={index}>
            <div className="w-full bg-[#EAEFFF] cursor-pointer transition-all ease-in-out duration-500 hover:bg-primary rounded-t-lg mb-3">
              <img className="w-full rounded-lg" src={items.image} alt="" />
            </div>
            <div className="pl-4 mb-2">
              <p className="text-lg font-semibold">{items.name}</p>
              <p className="text-textColor text-sm mb-2">{items.speciality}</p>
              <label className="flex gap-2 cursor-pointer items-center">
                <input onChange={()=>changeAvailibility(items._id)} type="checkbox" className="w-3" checked={items.available} />
                <p className="text-sm">Available</p>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllDoctors;
