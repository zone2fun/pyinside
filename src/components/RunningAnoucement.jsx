import { Megaphone } from "lucide-react";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const RunningAnnouncement = () => {


     const { getHotNews, hotNews } = useContext(AppContext)


     useEffect(()=>{

         getHotNews()

     },[])
    

  const repeatedAnnouncements = [...hotNews, ...hotNews]; // ทำซ้ำเพื่อ seamless

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 select-none group">
      {/* ขอบ fade ซ้าย–ขวา */}
      <div className="pointer-events-none absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-blue-600 to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-indigo-700 to-transparent z-10" />

      {/* ข้อความวิ่ง */}
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        {repeatedAnnouncements.map((item, index) => (
          <p
            key={index}
            className="flex items-center text-sm md:text-base font-medium px-4 flex-shrink-0"
          >
            {/* <Megaphone className="inline-block w-5 h-5 mx-2 text-yellow-300 flex-shrink-0" /> */}
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RunningAnnouncement;
