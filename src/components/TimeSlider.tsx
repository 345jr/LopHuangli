import CircularSlider from "@fseehawer/react-circular-slider"
import type { huangLiData } from "../types/huangli"


const TimeSlider = ({data}:{data:huangLiData|null}) => {
  // const rawShiChen = data?.data.lunarHour.toString().slice(-1)
  // const shiChen = `${rawShiChen}时`
  const shiChen =`${data?.data.lunarHour.toString().slice(-1)}时`
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
    "亥时"
  ];
  const dataIndex = shiChenArray.findIndex(i=>i==shiChen)
  return (
    <div className="flex justify-center w-full mt-5">
		<CircularSlider 
        onChange={value => console.log(value)}
        label={`运势:${data?.data.jiXiong}`}
        data={shiChenArray}
        dataIndex={dataIndex}
        hideLabelValue={false}
        />
	</div>
  )
}

export default TimeSlider