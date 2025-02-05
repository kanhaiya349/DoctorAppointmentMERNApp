import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function RelatedDoctors({ docId, speciality }) {
  const { doctors } = useContext(AppContext);
  const [doctor, setDoctor] = useState([]);
  const navigate = useNavigate();
  const findDoc = () => {
    const docData = doctors.filter(
      (doc) => doc.speciality === speciality && doc._id !== docId
    );
    setDoctor(docData);
  };
  useEffect(() => {
    findDoc();
  }, [doctors, docId, speciality]);
  return (
    <div className="mb-20">
      <h3 className="text-3xl font-semibold mb-5 text-center">
        Related Doctors
      </h3>
      <p className="text-center text-sm mb-5">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-6">
        {doctor.map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-[#C9D8FF] flex flex-col rounded-xl cursor-pointer hover:-translate-y-3 transition-all ease-in-out duration-500"
            key={index}
          >
            <img
              src={item.image}
              className="bg-[#EAEFFF] rounded-t-xl mb-4"
              alt=""
            />
            <div className="flex items-center gap-2 ml-3">
              <p
                className={`w-2 h-2 ${
                  item.available ? "bg-green-500" : "bg-gray-500"
                } rounded-full`}
              ></p>
              <p
                className={`text-green-500 ${
                  item.available ? "text-green-500" : "text-gray-500"
                } text-sm`}
              >
                {item.available ? "Available" : "Not Available"}
              </p>
            </div>
            <p className="ml-3 text-lg font-semibold">{item.name}</p>
            <p className="ml-3 text-sm mb-4 text-[#5C5C5C] font-medium">
              {item.speciality}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedDoctors;
