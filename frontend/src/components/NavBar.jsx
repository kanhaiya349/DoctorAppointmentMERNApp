import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

function NavBar() {
  const navigate = useNavigate();
  const {token,setToken,userData}=useContext(AppContext);
  const [dropDownMenu, setDropDownMenu] = useState(false);

  const logout=()=>{
    setToken(false)
    localStorage.removeItem('token')
    navigate("/")
    scrollTo(0,0)
  }

  return (
    <div className="flex justify-between py-5 mb-5 items-center text-sm border-b border-b-[#ADADAD]">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Prescripto_logo"
        className="w-40 cursor-pointer"
      />
      <ul className="hidden md:flex md: items-center flex gap-5 font-medium transition-all ease-in-out duration-500">
        <NavLink to={"/"}>
          <li className="hover:font-bold">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="hover:font-bold">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="hover:font-bold">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="hover:font-bold">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <a href="https://doctorappointmentmernapp-admin.onrender.com" target="_blank" rel="noopener noreferrer">
          <li className="border px-4 py-1 rounded-full text-[12px] hover:scale-110 transition-all ease-in-out duration-500">
            Admin Panel
          </li>
        </a>
      </ul>
      <div className="flex text-center items-center gap-4">
        {token ? (
          <div className="flex h-full item-center gap-2 cursor-pointer relative group">
            <img
              src={userData.image}
              className="w-7 rounded-full cursor-pointer"
              alt="User"
            />
            <img src={assets.dropdown_icon} className="w-2.5" />
            <div
              className={`pt-10 absolute top-0 right-0 h-[170px] w-40 text-left rounded-lg text-[15px] font-semibold hidden group-hover:block`}
            >
              <div className="z-10 bg-white shadow-3xl flex flex-col item-center h-[100%]">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="flex items-center hover:bg-secondary pl-4 h-1/3"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="flex items-center hover:bg-secondary pl-4 h-1/3"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => logout()}
                  className="flex items-center hover:bg-secondary pl-4 h-1/3"
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary h-[100%] text-white px-5 md:px-8 md:py-3 text-[12px] rounded-full hover:bg-blue-700 transition-all ease-in-out duration-500"
          >
            Log in
          </button>
        )}
        <div onClick={() => setDropDownMenu(!dropDownMenu)}>
          <img className="md:hidden w-5" src={assets.menu_icon} alt="" />
          {dropDownMenu ? (
            <div
              className={`${
                dropDownMenu ? "fixed w-full" : "h-0 w-0"
              } md:hidden bg-white right-0 top-0 bottom-0 overflow-hidden z-20 transition-all ease-in-out duration-500`}
            >
              <div className="p-4 flex w-full justify-between mb-10">
                <img className="w-40" src={assets.logo} alt="" />
                <img
                  onClick={() => setDropDownMenu(false)}
                  className="w-10"
                  src={assets.cross_icon}
                  alt=""
                />
              </div>
              <ul className="h-[200px] text-lg font-semibold flex flex-col">
                <NavLink
                  to={"/"}
                  className={
                    ({ isActive }) =>
                      isActive
                        ? "bg-secondary text-white font-bold p-2 rounded" 
                        : "hover:bg-secondary hover:text-white font-medium p-2 rounded" 
                  }
                >
                  <li className="active:bg-secondary active:text-white">
                    Home
                  </li>
                </NavLink>
                <NavLink
                  to={"/doctors"}
                  className={
                    ({ isActive }) =>
                      isActive
                        ? "bg-secondary text-white font-bold p-2 rounded" 
                        : "hover:bg-secondary hover:text-white font-medium p-2 rounded" 
                  }
                >
                  <li>All Doctors</li>
                </NavLink>
                <NavLink
                  to={"/about"}
                  className={
                    ({ isActive }) =>
                      isActive
                        ? "bg-secondary text-white font-bold p-2 rounded" 
                        : "hover:bg-secondary hover:text-white font-medium p-2 rounded" 
                  }
                >
                  <li>About</li>
                </NavLink>
                <NavLink
                  to={"/contact"}
                  className={
                    ({ isActive }) =>
                      isActive
                        ? "bg-secondary text-white font-bold p-2 rounded"
                        : "hover:bg-secondary hover:text-white font-medium p-2 rounded"
                  }
                >
                  <li>Contact</li>
                </NavLink>
                <a
                  href="https://doctorappointmentmernapp-admin.onrender.com" target="_blank" rel="noopener noreferrer"
                  className={
                    ({ isActive }) =>
                      isActive
                        ? "bg-secondary text-white font-bold p-2 rounded"
                        : "hover:bg-secondary hover:text-white font-medium p-2 rounded"
                  }
                >
                  <li>Admin Panel</li>
                </a>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
