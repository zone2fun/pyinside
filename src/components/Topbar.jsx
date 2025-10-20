import { Sunrise } from "lucide-react";
import { assets } from "../assets/assets.js";

export default function TopBar() {
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

        <div className="hidden md:flex mt-5 md:mt-0">
          <button className="mx-[20px] text-white bg-blue-800 px-2 py-2 rounded hover:bg-blue-600 transition">
            สมัครสมาชิก
          </button>
        </div>

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
