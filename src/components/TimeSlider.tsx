import CircularSlider from "@fseehawer/react-circular-slider";
import type { huangLiData } from "../types/huangli";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
const TimeSlider = ({ data }: { data: huangLiData | null }) => {
  // const rawShiChen = data?.data.lunarHour.toString().slice(-1)
  // const shiChen = `${rawShiChen}时`
  const shiChen = `${data?.data.lunarHour.toString().slice(-1)}时`;
  const shiChenArray = [
    "子时",
    "丑时",
    "寅时",
    "卯时",
    "辰时",
    "巳时",
    "午时",
    "未时",
    "申时",
    "酉时",
    "戌时",
    "亥时",
  ];
  const dataIndex = shiChenArray.findIndex((i) => i == shiChen);
  const getThemeColor = () => {
    const hour = data ? parseInt(data.time.split("-")[3]) : 0;
    const isDaytime = hour >= 6 && hour < 18;
    return {
      isDaytime,
      labelColor: isDaytime ? "#f5a623" : "#e0e0ff",
      progressColorFrom: isDaytime ? "#FFA726" : "#B3E5FC",
      progressColorTo: isDaytime ? "#FB8C00" : "#E1F5FE",
      trackColor: isDaytime ? "#FFF3E0" : "#ECEFF1",
    };
  };
  return (
    <div className="relative overflow-hidden">
      {/* 背景图 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/img/5.jpg')`,
        }}
      />
      {/* 主内容 */}
      <div className="relative flex justify-center w-full py-12 z-10">
        {getThemeColor().isDaytime ? (
          <IoSunny className="text-amber-500" size={60} />
        ) : (
          <FaMoon className="text-white" size={50} />
        )}
        <CircularSlider
          onChange={(value) => console.log(value)}
          label={`时辰运势:${data?.data.jiXiong}`}
          data={shiChenArray}
          dataIndex={dataIndex}
          knobDraggable={false}
          hideKnob={true}
          labelColor={getThemeColor().labelColor}
          progressColorFrom={getThemeColor().progressColorFrom}
          progressColorTo={getThemeColor().progressColorTo}
          trackColor={getThemeColor().trackColor}
        />
        <ul className="px-6">
          {data?.data.todayJiXiong.map((item, index) => (
            <li key={index} className="text-white font-bold">
              {item.siCheng}-{item.jiXiong} |时间段 :{item.range}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeSlider;
