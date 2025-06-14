import type { huangLiData } from "../../types/huangli";
import type { timeRange } from "../../types/timeRange";
const SiChen = ({
  data,
  sliceNum,
}: {
  data: huangLiData | null;
  sliceNum: timeRange;
}) => {
  return (
    <div>
      <dl className="px-3 sm:px-6 divide-y divide-gray-700">
        {data?.data.todayJiXiong
          .slice(sliceNum.start, sliceNum.end)
          .map(({ siCheng, jiXiong, range }) => (
            <div key={siCheng} className="flex justify-between items-center ">
              {/* 左侧：凶吉 Badge */}
              <span
                className={`
                px-3 py-1 my-1 font-bold rounded-full text-sm sm:mr-4
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
              <div className="flex flex-row sm:flex-col">
                <dt
                  className={
                    siCheng === sliceNum.now
                      ? "text-sm sm:text-2xl font-extrabold text-teal-400 pl-2 sm:pl-6"
                      : "text-xs sm:text-lg font-semibold text-white pl-2 sm:pl-6"
                  }
                >
                  {siCheng}
                </dt>
                <dd className="text-sm pl-0.5 text-slate-300 ">{range}</dd>
              </div>
            </div>
          ))}
      </dl>
    </div>
  );
};

export default SiChen;
