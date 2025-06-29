import {LuClock3} from 'react-icons/lu'
import {CiCalendar} from 'react-icons/ci'
import type {updataProps} from '../../types/updata'

const UpdateBanner = ({productName, launchDate, updateDate}: updataProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-100 p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">
      {/* 头部：产品/功能名称 */}
      <div className="mb-4 flex items-center gap-3 font-serif font-medium">
        <h1 className="text-3xl font-bold whitespace-nowrap text-slate-800 dark:text-white">
          The
          {<span className="text-yellow-500">{productName}</span>}
          Todo
        </h1>
      </div>
      {/* 信息区：包含推出时间和更新时间 */}
      <div className="flex flex-col gap-2 text-[16px] font-normal text-slate-600 md:flex-row md:items-center md:gap-8 dark:text-slate-300">
        {/* 推出时间 */}
        <div className="flex items-center gap-2">
          <CiCalendar className="text-lg" />
          <span>推出时间: {launchDate}</span>
        </div>
        <div className="block h-0.5 w-full rounded-full bg-slate-600 md:h-6 md:w-1"></div>
        {/* 更新时间 */}
        <div className="flex items-center gap-2">
          <LuClock3 className="text-lg" />
          <span>最后更新: {updateDate}</span>
        </div>
      </div>
    </div>
  )
}

export default UpdateBanner
