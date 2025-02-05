import {specialityData} from "./../assets/assets"
import { Link } from "react-router-dom"

function SpecialityMenu() {
  return (
    <div id="speciality" className="flex flex-col justify-center items-center mt-20">
        <h2 className="text-3xl font-semibold mb-4">Find by Speciality</h2>
        <p className="max-w-96 text-sm mb-10 text-center">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-20">
            {specialityData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0,0)} key={index} to={item.speciality==="Pediatricians"?"doctors/pediastrians":`/doctors/${item.speciality}`} className="hover:-translate-y-2 transition-all ease-in-out duration-500">
                        <img src={item.image} alt="" className="w-24 mb-2" />
                        <p className="text-[12px] w-30 font-semibold flex justify-center">{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu