import { useState } from "react"
import { banner } from "../assets/assets.js"



const SidebarLeft = () => {

   //const { banner, setBanner } = useState([])




  return (
   <div className="md:max-w-xl lg:max-w-xl min-h-screen border-r border-gray-400 p-2">
   <ul className="flex flex-col md:min-w-72 gap-4">
    {banner.slice(0, 4).map((item, index) => (
      <li key={index} className="relative rounded-md overflow-hidden shadow-md hover:cursor-pointer">
        {/* ป้าย "รับสมัครด่วน" */}
       
       {
         item.label && <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded animate-flag">
          รับสมัครด่วน
        </div>
       }

        

        {/* รูปภาพ */}
        <img
          className="w-full h-30 object-cover "
          src={item.url}
          alt={item.name}
        />

        {/* ชื่อข่าว */}
        <h1 className="text-lg font-semibold mt-2 text-center">{item.name}</h1>
      </li>
    ))}
  </ul>
</div>

  )
}
export default SidebarLeft