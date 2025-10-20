import { assets } from "../assets/assets.js"
import { NavLink, useLocation } from "react-router-dom"
import { Sunrise } from 'lucide-react';
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import RunningAnnouncement from "./RunningAnoucement.jsx";



const Navbar = () => {

    const location = useLocation()

    const { getNewsCategory, newsCategory } = useContext(AppContext)


    useEffect(()=>{
      getNewsCategory()
    },[])



  return (
      <div className="w-full lg:w-2/3 mx-auto">
        {/* Top bar green */}
       <div className="flex gap-3 justify-between md:flex-row md:justify-between items-center px-5 py-3 bg-primary">
          
 
          <p className="text-white text-3xl text-shadow-xs flex flex-row items-center gap-1"><span className="text-white flex items-center"><Sunrise/>PHAYAOINSIDE</span></p>
         <div className="hidden md:flex md:justify-between bg-white rounded-xl">
             <input className="bg-transparent p-2 focus:outline-0" type="text" placeholder="ค้นหา" />
              <img className="w-8 mx-2" src={assets.search_icon} alt="" />

         </div>

         <div className="hidden md:flex mt-5 md:mt-0">
             <button className="mx-[20px] text-white bg-blue-800 px-2 py-2 rounded hover:cursor-pointer hover:bg-blue-600">สมัครสมาชิก</button>
         </div>
         <div className="flex flex-wrap items-end md:hidden">
            <img className="w-8 bg-white rounded-3xl" src={assets.mobile_menu} alt="" />
         </div>
    </div>
  
          {/* Menu top */}

          <div className="hidden md:flex justify-center px-5 py-5">
             
              <ul className="flex flex-wrap w-full justify-center gap-4 md:w-full text-xl">
               <NavLink to={'/'}>
                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.home_icon} alt="" />
                    <p className="text-red-600">หน้าแรก</p>                   
                 </li>
                  </NavLink>
                  <NavLink to={'/news'}>
                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.news_icon} alt="" />                    
                    <p className="text-orange-600">ข่าวสารประชาสัมพันธ์</p>                    
                 </li>
                 </NavLink>
                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.bed_icon} alt="" />
                    <p className="text-yellow-500">ท่องเที่ยวและที่พัก</p>
                 </li>
                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.shop_icon} alt="" />
                    <p className="text-green-500">ร้านค้า</p>
                 </li>
                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.job_icon} alt="" />
                    <p className="text-blue-400">ค้นหางาน</p>
                 </li>
                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.advertising_icon} alt="" />
                    <p className="text-blue-700">ลงโฆษณา</p>
                 </li>
                        
              
          
            
              </ul>

          </div>

          {/* Sub menu */}

          {
            location.pathname.startsWith("/news") ? (
              
                    <div className="hidden rounded-md md:flex w-full justify-center lg:w-2/3 mx-auto px-5 py-2 bg-accent">
              <ul className="flex justify-center gap-3">
               {
                  newsCategory.map((item,index)=>(
                   
                     <li key={index}>{item}</li>

                  ))
               }
                 
                
              </ul>
           </div>

            ) : (
   <RunningAnnouncement/>
)
}

        

      </div>
  )
}
export default Navbar