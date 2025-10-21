import { Sunrise } from "lucide-react";
import { assets } from "../assets/assets.js";
import LoginButton from "./LoginButton.jsx";
import { useState } from "react";

export default function TopBar() {

  // เก็บสถานะของ user
  const [user, setUser] = useState({
    name: "Benny Tunner",
    avatar: "https://i.pravatar.cc/100?img=3",
  });

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="flex gap-3 justify-between md:flex-row md:justify-between items-center px-5 py-3 bg-green-700">
        <p className="text-white text-3xl flex flex-row items-center gap-1 drop-shadow-lg">
          <span className="flex items-center">
            <Sunrise className="mr-1" /> PHAYAOINSIDE
          </span>
        </p>

        <div className="hidden md:flex bg-white rounded-xl shadow-inner">
          <input
            className="bg-transparent p-2 focus:outline-0 text-gray-700"
            type="text"
            placeholder="ค้นหา"
          />
          <img className="w-8 mx-2" src={assets.search_icon} alt="" />
        </div>

        {/* Login Button */}


        <LoginButton  user={user} onLogout={()=>setUser(null)} // ลองเปลี่ยนเป็น null เพื่อดูปุ่มสมัครสมาชิก
        />

        <div className="flex items-end md:hidden">
          <img
            className="w-8 bg-white rounded-3xl"
            src={assets.mobile_menu}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
