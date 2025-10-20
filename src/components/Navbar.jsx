import { assets } from "../assets/assets.js"
import { NavLink, useLocation } from "react-router-dom"
import { Sunrise } from 'lucide-react';
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import RunningAnnouncement from "./RunningAnoucement.jsx";
import TopBar from "../components/Topbar.jsx";



const Navbar = () => {

    const location = useLocation()

    const { getNewsCategory, newsCategory, getTravelCategory, travelCategory } = useContext(AppContext)


    useEffect(()=>{
      getNewsCategory(),
      getTravelCategory()
    },[])



  return (
      <div className="w-full lg:w-2/3 mx-auto">

       {/* Top bar green */}
 
      <TopBar/>

  
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
                 <NavLink to={'/travel'}>
                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.bed_icon} alt="" />
                    <p className="text-yellow-600">ท่องเที่ยวและที่พัก</p>
                 </li>
                 </NavLink>
                 <NavLink to={'/shop'}>
                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.shop_icon} alt="" />
                    <p className="text-green-500">ร้านค้า</p>
                 </li>
                 </NavLink>
                 <NavLink to={'/jobs'}>
                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.job_icon} alt="" />
                    <p className="text-blue-400">ค้นหางาน</p>
                 </li>
                 </NavLink>

                 <NavLink to={'/advertisement'}>

                 <li className="flex items-center gap-2 py-2 px-4 rounded-2xl hover:bg-gray-100 hover:cursor-pointer">
                    <img className="w-4" src={assets.advertising_icon} alt="" />
                    <p className="text-blue-700">ลงโฆษณา</p>
                 </li>
                 </NavLink>
              
          
            
              </ul>

          </div>

          {/* Sub menu */}

          {
            location.pathname.startsWith("/news") 
            ? (
              
                    <div className="hidden rounded-md md:flex w-full justify-center lg:w-2/3 mx-auto px-5 py-2 bg-orange-600/75">
              <ul className="flex justify-center items-center gap-3" id="sub-menu">
              
               {
                  newsCategory.map((item,index)=>(
                     <NavLink to={`/news/${item}`}><li key={index}>{item}</li></NavLink>
                     

                  ))
               }
                 
                
              </ul>
           </div>

            ) 
            : location.pathname.startsWith("/travel") 
               ? (
                  
                    <div className="hidden rounded-md md:flex w-full justify-center lg:w-2/3 mx-auto px-5 py-2 bg-yellow-500/75">
                    <ul className="flex justify-center items-center gap-4" id="sub-menu">
              
               {
                  travelCategory.map((item_travel,index_travel)=>(
                     <NavLink to={`/travel/${item_travel}`}><li key={index_travel}>{item_travel}</li></NavLink>
                     

                  ))
               }
                 
                
              </ul>
           </div>
               )
               
               : (
                 <RunningAnnouncement/>
                 )
}

        

      </div>
  )
}
export default Navbar