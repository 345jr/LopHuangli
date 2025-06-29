import type {huangLiData} from '../../types/huangli'
import type {timeRange} from '../../types/timeRange'
const SiChen = ({
  data,
  sliceNum,
}: {
  data: huangLiData | null
  sliceNum: timeRange
}) => {
  return (
    <div>
      <dl className="divide-y divide-gray-700 px-3 sm:px-6">
        {data?.data.todayJiXiong
          .slice(sliceNum.start, sliceNum.end)
          .map(({siCheng, jiXiong, range}) => (
            <div key={siCheng} className="flex items-center justify-between">
              {/* 左侧：凶吉 Badge */}
              <span
                className={`my-1 rounded-full px-3 py-1 text-sm font-bold sm:mr-4 ${
                  jiXiong === '吉'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                } `}
              >
                {jiXiong}
              </span>
              {/* 右侧：时辰 + 时间段 */}
              <div className="flex flex-row sm:flex-col">
                <dt
                  className={
                    siCheng === sliceNum.now
                      ? 'pl-2 text-sm font-extrabold text-teal-400 sm:pl-6 sm:text-2xl'
                      : 'pl-2 text-xs font-semibold text-white sm:pl-6 sm:text-lg'
                  }
                >
                  {siCheng}
                </dt>
                <dd className="pl-0.5 text-sm text-slate-300">{range}</dd>
              </div>
            </div>
          ))}
      </dl>
    </div>
  )
}

export default SiChen
