import { IoRocketOutline } from 'react-icons/io5';
import { HiOutlineRefresh } from 'react-icons/hi';

const UpdateBanner = ({ productName, launchDate, updateDate }:{productName:string,launchDate:string,updateDate:string}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
      {/* 头部：产品/功能名称 */}
      <div className="flex items-center gap-3 mb-4 font-medium font-serif">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          {productName}
        </h1>
      </div>
      {/* 信息区：包含推出时间和更新时间 */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2 font-normal text-[16px] text-slate-600 dark:text-slate-300">
        {/* 推出时间 */}
        <div className="flex items-center gap-2">
          <IoRocketOutline className="text-lg" />
          <span>推出时间: {launchDate}</span>
        </div>
        <div className='bg-slate-600 rounded-full w-full h-0.5 md:w-1 md:h-6 block'></div>
        {/* 更新时间 */}
        <div className="flex items-center gap-2">
          <HiOutlineRefresh className="text-lg" />
          <span>最后更新: {updateDate}</span>
        </div>
      </div>
    </div>
  );
};



export default UpdateBanner;