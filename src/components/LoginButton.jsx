import { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, User, Bookmark, FileText } from "lucide-react";

const LoginButton = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
 

  // ปิด dropdown เมื่อคลิกนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <div className="hidden md:flex mt-5 md:mt-0">
        <button className="mx-[20px] text-white bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium shadow-sm">
          เข้าสู่ระบบ
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative hidden md:flex mt-5 md:mt-0 items-center z-50"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition"
      >
        <img
          src={user.avatar || "https://i.pravatar.cc/40"}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-medium text-gray-800">{user.name}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-200 origin-top ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col text-gray-700">
          <li className="hover:bg-gray-100 cursor-pointer px-4 py-3 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-700" />
            จัดการโปรไฟล์
          </li>
          <li className="hover:bg-gray-100 cursor-pointer px-4 py-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-700" />
            โพสต์ของฉัน
          </li>
          <li className="hover:bg-gray-100 cursor-pointer px-4 py-3 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-700" />
            ปักหมุดเอาไว้
          </li>
          <li
            onClick={onLogout}
            className="hover:bg-red-50 cursor-pointer px-4 py-3 flex items-center gap-2 text-red-600 border-t border-gray-100"
          >
            <LogOut className="w-4 h-4" />
            ออกจากระบบ
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginButton;
