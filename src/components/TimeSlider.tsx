import CircularSlider from "@fseehawer/react-circular-slider";
import type { huangLiData } from "../types/huangli";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import SiChen from "./SiChen";

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
    "占位符时"
  ]; 
  const test =[
    "Panda滑雪板",
    "东京塔下的猫咪",
    "夏日祭典的金鱼",
    "冲绳的菠萝冰沙",
    "北海道的雪人",
    "京都的抹茶拿铁",
    "大阪章鱼烧大师",
    "富士山日出之旅",
    "拉面自动贩卖机",
    "涩谷十字路口的鸽子",
    "秋叶原的手办模型",
    "新干线的光速传说",
    "居酒屋的深夜食堂",
    "温泉旅馆的榻榻米",
    "樱花盛开的公园"
  ]
  // const hour      = parseInt(data.time.split('-')[3], 10);   
  // const dataIndex = Math.min(Math.floor(hour / 2), 11);      
  const shiChen = `${data.data.lunarHour.toString().slice(-1)}时`; 
  console.log(shiChen)
  const dataIndex = shiChenArray.findIndex((i) => i == shiChen);
  console.log(typeof dataIndex)
  console.log(dataIndex)
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
      <div className="relative flex justify-center w-full py-12 z-10">
        <SiChen data={data} sliceNum={{start:0,end:6}}/>
        {getThemeColor().isDaytime ? (
          <IoSunny className="text-amber-500" size={60} />
        ) : (
          <FaMoon className="text-white" size={50} />
        )}
       
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
        
        
        <SiChen data={data} sliceNum={{start:6,end:12}}/>
      </div>
    </div>
  );
};

export default TimeSlider;
