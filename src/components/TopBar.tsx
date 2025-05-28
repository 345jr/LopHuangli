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
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex flex-row ">
        <FaCalendar
          className="mx-2 my-1.5 cursor-pointer text-gray-600 hover:text-gray-900"
          size={30}
        />
        <span className="py-2 text-2xl font-bold text-yellow-500">LopCalendar</span>
      </div>
      <nav className="flex space-x-4">
        {MENU.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-3 py-2 text-xl  font-bold transition-colors ${
                isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"
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
          className="cursor-pointer text-gray-600 hover:text-gray-900"
          size={30}
        />
        <FaRegSmile
          className="cursor-pointer text-gray-600 hover:text-gray-900"
          size={30}
        />
      </div>
    </header>
  );
};

export default TopBar;
