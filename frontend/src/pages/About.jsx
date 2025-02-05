import { assets } from "../assets/assets"

function About() {
  return (
    <div className="flex flex-col">
        <h2 className="text-center text-2xl font-semibold my-10"><span className="text-textColor">ABOUT</span> US</h2>
        <div className="flex flex-col gap-10 md:flex-row mb-20">
          <img className="md:max-h-[350px] rounded-lg" src={assets.about_image} alt="" />
          <div className="flex flex-col min-h-[350px] justify-center">
            <p className="text-sm text-textColor mb-6">Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p className="text-sm text-textColor mb-6">Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
            <h6 className="mb-6 text-sm font-semibold">Our Vision</h6>
            <p className="text-sm text-textColor">Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-10">WHY <span className="text-textColor">CHOOSE US</span></h3>
        <div className="flex w-full flex-col md:flex-row mb-24">
          <div className="group flex flex-col p-5 md:w-1/3 h-[200px] justify-center items-center border border-gray-300 cursor-pointer hover:bg-primary text-textColor hover:text-white transition-all ease-in-out duration-500">
            <h6 className=" font-semibold mb-8 text-start">EFFICIENCY:</h6>
            <p className="text-sm">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="group flex flex-col p-5 md:w-1/3 h-[200px] justify-center items-center border border-gray-300 cursor-pointer hover:bg-primary text-textColor hover:text-white transition-all ease-in-out duration-500">
            <h6 className=" font-semibold mb-8">CONVENIENCE:</h6>
            <p className="text-sm">Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="group flex flex-col p-5 md:w-1/3 h-[200px] justify-center items-center border border-gray-300 cursor-pointer hover:bg-primary text-textColor hover:text-white transition-all ease-in-out duration-500">
            <h6 className=" font-semibold mb-8">PERSONALIZATION:</h6>
            <p className="text-sm">Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
    </div>
  )
}

export default About