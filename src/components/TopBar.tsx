import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
const TopBar = () => {
  const MENU = [
    { name: "老黄历", to: "/" },
    { name: "相关知识", to: "/knowledge" },
    { name: "更新", to: "/updata" },
  ];
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black shadow border-b-2 border-[oklch(44.3%_0.11_240.79)]">
      <div className="flex flex-row ">
        <FaCalendar
          className="mx-2 my-1.5 cursor-pointer text-slate-400 hover:text-white"
          size={30}
        />
        <span className="py-2 text-2xl font-bold text-white">LopCalendar</span>
      </div>
      <nav className="flex space-x-4">
        {MENU.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3 py-2 text-xl  font-bold transition-colors ${
                isActive ? "text-slate-400" : "text-white hover:text-gray-600"
              }`
            }
            end
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <FaGithub
          className="cursor-pointer text-white hover:text-slate-400"
          size={30}
        />
        <FaRegSmile
          className="cursor-pointer text-white hover:text-slate-400"
          size={30}
        />
      </div>
    </header>
  );
};

export default TopBar;
