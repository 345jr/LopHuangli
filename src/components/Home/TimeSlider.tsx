import CircularSlider from "@fseehawer/react-circular-slider";
import type { huangLiData } from "../../types/huangli";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import SiChen from "./SiChen";

import DanglingIcon from "../Animation/IconBall";

const TimeSlider = ({ data }: { data: huangLiData}) => {
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
    "占位符"
  ]; 
 
        
  const shiChen = `${data.data.lunarHour.toString().slice(-1)}时`; 
  const dataIndex = shiChenArray.findIndex((i) => i == shiChen);
  const getThemeColor = () => {
    const hour = data ? parseInt(data.time.split("-")[3]) : 0;
    const isDaytime = hour >= 6 && hour < 18;
    return {
      isDaytime,    
      labelColor: isDaytime ? "#f5a623" : "#B3E5FC",
      progressColorFrom: isDaytime ? "#FFA726" : "#42A5F5",
      progressColorTo: isDaytime ? "#FB8C00" : "#90CAF9",
      trackColor: isDaytime ? "#FFF3E0" : "#1A2B4C",
    };
  };
  const handleStretched = ()=>{
    console.log('你拉了它')
  }
  const handleRelaxed =()=>{
    console.log('你松开了它')
  }
  
  return (
    <div className="relative overflow-hidden">
      {/* 背景图 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/img/${
            getThemeColor().isDaytime ? 5 : 9
          }.jpg')`,
        }}
      />
      {/* 主内容 */}
      <div className="relative flex justify-center w-full py-2 sm:py-12 z-10">
        <SiChen data={data} sliceNum={{start:0,end:6,now:shiChen}}/>
        {getThemeColor().isDaytime ? (
          <IoSunny className="text-amber-500 animate-spin" size={60} />
        ) : (
          <FaMoon className="text-white" size={50} />
        )}
        <div className="hidden sm:block">
          <CircularSlider
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
        </div>
        <SiChen data={data} sliceNum={{start:6,end:12,now:shiChen}}/>
        <DanglingIcon 
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            onStretched={handleStretched}
            onRelaxed={handleRelaxed}
          />
      </div>
    </div>
  );
};

export default TimeSlider;
