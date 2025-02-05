import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Doctors() {
  let { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const [selection, setSelection] = useState(false);

  const applyFilterDoc = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilterDoc();
  }, [doctors, speciality]);

  return (
    <div className="flex flex-col">
      <p className="text-md text-textColor mb-6">
        Browse through the doctors Specialist.
      </p>
      <button
        className="md:hidden group relative text-textColor w-20 py-0.5 border border-gray-300 rounded-md mb-6"
        onClick={() => setSelection(!selection)}
      >
        <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center group-hover:bg-primary transition-all duration-500 ease-in-out"></span>
        <span className="relative z-10 group-hover:text-white  transition-all duration-500 ease-in-out">
          Filters
        </span>
      </button>
      <div className="flex flex-col md:flex-row gap-6 mb-20">
        <div
          className={`text-textColor flex flex-col mb-10  ${
            selection === false ? "hidden" : "block"
          } md:block`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`border border-gray-300 rounded-sm w-48 px-3 py-1 text-sm cursor-pointer relative overflow-hidden group mb-5 ${
              speciality === "General physician"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            {speciality !== "General physician" ? (
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center group-hover:bg-primary transition-all duration-500 ease-in-out"></span>
            ) : (
              ""
            )}
            <span className="relative z-10 group-hover:text-white  transition-all duration-500 ease-in-out">
              General physician
            </span>
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`border border-gray-300 rounded-sm w-48 px-3 py-1 text-sm cursor-pointer relative mb-5 overflow-hidden group ${
              speciality === "Gynecologist"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            {speciality !== "Gynecologist" ? (
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center group-hover:bg-primary transition-all duration-500 ease-in-out"></span>
            ) : (
              ""
            )}
            <span className="relative z-10 group-hover:text-white  transition-all duration-500 ease-in-out">
              Gynecologist
            </span>
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`border border-gray-300 rounded-sm w-48 px-3 py-1 text-sm cursor-pointer relative mb-5 overflow-hidden group ${
              speciality === "Dermatologist"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            {speciality !== "Dermatologist" ? (
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center group-hover:bg-primary transition-all duration-500 ease-in-out"></span>
            ) : (
              ""
            )}
            <span className="relative z-10 group-hover:text-white  transition-all duration-500 ease-in-out">
              Dermatologist
            </span>
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`border border-gray-300 rounded-sm w-48 px-3 py-1 text-sm cursor-pointer relative mb-5 overflow-hidden group ${
              speciality === "Pediatricians"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            {speciality !== "Pediatricians" ? (
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center group-hover:bg-primary transition-all duration-500 ease-in-out"></span>
            ) : (
              ""
            )}
            <span className="relative z-10 group-hover:text-white  transition-all duration-500 ease-in-out">
              Pediatricians
            </span>
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`border border-gray-300 rounded-sm w-48 px-3 py-1 text-sm cursor-pointer relative mb-5 overflow-hidden group ${
              speciality === "Neurologist"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            {speciality !== "Neurologist" ? (
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center group-hover:bg-primary transition-all duration-500 ease-in-out"></span>
            ) : (
              ""
            )}
            <span className="relative z-10 group-hover:text-white  transition-all duration-500 ease-in-out">
              Neurologist
            </span>
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`border border-gray-300 rounded-sm w-48 px-3 py-1 text-sm cursor-pointer relative mb-5 overflow-hidden group ${
              speciality === "Gastroenterologist"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            {speciality !== "Gastroenterologist" ? (
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center group-hover:bg-primary transition-all duration-500 ease-in-out"></span>
            ) : (
              ""
            )}
            <span className="relative z-10 group-hover:text-white  transition-all duration-500 ease-in-out">
              Gastroenterologist
            </span>
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
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
    </div>
  );
}

export default Doctors;
