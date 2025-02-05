import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment() {
  const { docId } = useParams();
  const { doctors, currSymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState([]);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate=useNavigate()

  const fetchDocInfo = async () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  const bookAppointment= async ()=>{
    if(!token){
      toast.warn('Login to book appointment');
      return navigate('/login')
    }
    try{
      const date=docSlots[slotIndex][0].dateTime

      let day=date.getDate()
      let month=date.getMonth()+1 
      let year=date.getFullYear()

      const slotDate=day+"_"+month+"_"+year

      const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(
          currDate.getHours > 10 ? currDate.setHours() + 1 : 10
        );
        currDate.setMinutes(currDate.getMinutes > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currDate < endTime) {
        let formatedTime = currDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day=currDate.getDate()
        let month=currDate.getMonth()+1;
        let year=currDate.getFullYear()
        const slotDate=day+"_"+month+"_"+year
        const slotTime=formatedTime

        const isSlotAvailable=docInfo.slots_booked[slotDate]&&docInfo.slots_booked[slotDate].includes(slotTime)?false:true

        if(isSlotAvailable){
          timeSlots.push({
            dateTime: new Date(currDate),
            time: formatedTime,
          });
        }
        currDate.setMinutes(currDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:gap-5 mb-12">
          <div className="md:w-[300px] md:h-[300px] bg-primary flex flex-end rounded-lg flex-shrink-0 mb-[-80px] md:mb-0">
            <img className="w-full rounded-lg" src={docInfo.image} alt="" />
          </div>
          <div className="bg-white z-1 realtive w-[97%] md:w-full bottom-[100px] border border-gray-400 rounded-lg p-8 mx-auto mb-0">
            <div className="flex gap-2 items-center mb-2">
              <h3 className="text-3xl md:text-2xl lg:text-3xl font-semibold">
                {docInfo.name}
              </h3>
              <img
                className="w-5 relative bottom-[-2px]"
                src={assets.verified_icon}
                alt=""
              />
            </div>
            <div className="flex md:gap-1 lg:gap-2 gap-2 text-textColor font-medium">
              <p className="text-sm lg:text-md">{docInfo.degree}</p>
              <p className="text-sm lg:text-md">-</p>
              <p className="text-sm lg:text-md">{docInfo.speciality}</p>
              <button className="text-[11px] md:text-[10px] lg:text-[11px] border border-gray-300 rounded-full px-3 py-0">
                {docInfo.experiance}
              </button>
            </div>
            <div className="mt-4">
              <p className="flex gap-1 text-sm font-semibold mb-2">
                About
                <img
                  className="w-3 relative bottom-[-1px]"
                  src={assets.info_icon}
                  alt=""
                />
              </p>
              <p className="text-sm text-textColor mb-8">{docInfo.about}</p>
            </div>
            <div>
              <p className="flex gap-1 text-textColor font-semibold">
                Appointment Fee:{" "}
                <span className="text-black">
                  {currSymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:ml-[320px] mb-20">
          <section className="text-textColor font-semibold mb-4">Booking Slot</section>
          <div className="flex gap-5 mb-7 flex-shrink-0 overflow-auto scrollbar-hide">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div className={`border border-gray-300 flex flex-col items-center justify-center h-24 min-w-16 rounded-full text-textColor cursor-pointer ${index===slotIndex?"bg-primary text-white":""}`} onClick={()=>setSlotIndex(index)} key={index}>
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex gap-5 flex-shrink-0 overflow-auto scrollbar-hide">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p className={`min-w-28 cursor-pointer text-textColor flex justify-center py-2 px-2 border border-gray-300 rounded-full ${item.time===slotTime?"bg-primary text-white":""}`} onClick={()=>setSlotTime(item.time)} key={index}>{item.time.toLowerCase()}</p>
              ))}
          </div>
          <button onClick={bookAppointment} className="bg-primary px-10 py-3 rounded-full mt-6 text-white hover:scale-110 transition-all ease-in-out duration-500">Book an Appointment</button>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointment;
