import type { huangLiData } from "../types/huangli";
import type { timeRange } from "../types/timeRange";
import ShinyText from "./Reactbits/ShinyText";
const SiChen = ({data , sliceNum}:{data:huangLiData |null , sliceNum:timeRange}) => {
  return (
    <div>
        <dl className="px-6 divide-y divide-gray-700">
          {data?.data.todayJiXiong
            .slice(sliceNum.start,sliceNum.end)
            .map(({ siCheng, jiXiong, range }) => (
              <div key={siCheng} className="flex justify-between items-center ">
                {/* 左侧：凶吉 Badge */}
                <span
                  className={`
                px-3 py-1 font-bold rounded-full text-sm mr-4
                ${
                  jiXiong === "吉"
                    ? "bg-green-500 text-white "
                    : "bg-red-500 text-white"
                }
              `}
                >
                  {jiXiong}
                </span>
                {/* 右侧：时辰 + 时间段 */}
                <div>
                  <dt className={siCheng===sliceNum.now?"text-2xl font-extrabold text-teal-400 pl-6":"text-lg font-semibold text-white pl-6"}>
                    {siCheng}
                  </dt>
                  {/* <ShinyText text={siCheng} disabled={false} speed={3} className='text-lg font-semibold text-red-500'/> */}
                  <dd className="text-sm text-gray-400 ">{range}</dd>
                </div>
              </div>
            ))}
        </dl>
    </div>
  )
}

export default SiChen