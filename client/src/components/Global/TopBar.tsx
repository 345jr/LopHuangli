import {NavLink} from 'react-router-dom'
import {FaGithub} from 'react-icons/fa'
import {FaCalendar} from 'react-icons/fa'

const TopBar = () => {
  const MENU = [
    {name: '老黄历', to: '/'},
    {name: '相关知识', to: '/knowledge'},
    {name: '更新', to: '/updata'},
  ]
  return (
    <header className="flex items-center justify-between border-b-2 border-[oklch(44.3%_0.11_240.79)] bg-black px-2 py-1 shadow sm:px-6 sm:py-4">
      <div className="flex flex-row">
        <FaCalendar
          className="mx-2 my-1.5 cursor-pointer text-slate-400 hover:text-white"
          size={30}
        />
        <span className="hidden py-2 text-2xl font-bold text-white sm:inline">
          LopCalendar
        </span>
      </div>
      <nav className="flex space-x-4">
        {MENU.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({isActive}) =>
              `px-1 py-0.5 text-sm font-bold transition-colors sm:px-3 sm:py-2 sm:text-xl ${
                isActive ? 'text-slate-400' : 'text-white hover:text-gray-600'
              }`
            }
            end
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <a href="https://github.com/345jr/LopHuangli/tree/main">
          <FaGithub
            className="cursor-pointer text-white hover:text-slate-400"
            size={30}
          />
        </a>
      </div>
    </header>
  )
}

export default TopBar
