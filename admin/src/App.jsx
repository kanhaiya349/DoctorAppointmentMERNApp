import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Appointments from "./pages/admin/Appointments";
import AddDoctor from "./pages/admin/AddDoctor";
import AllDoctors from "./pages/admin/AllDoctors";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboards from "./pages/doctor/DoctorDashboards";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import DoctorProfile from "./pages/doctor/DoctorProfile";

function App() {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  return atoken || dtoken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex items-start h-[140vh] md:h-[95vh]">
        <Sidebar />
        <p className="h-[100%] w-[1px] bg-gray-300 relative "></p>
        <div className="bg-gray-50 w-full min-h-screen max-sm:ml-[50px] ml-[250px] mt-[73px]">
          <Routes>
            {/* Admin Routes */}
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<Appointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<AllDoctors />} />
            {/* Doctor Routes */}
            <Route path="/doctor-dashboard" element={<DoctorDashboards />} />
            <Route path="/doctor-appointments"element={<DoctorAppointment />}/>
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
