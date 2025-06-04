import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Counter from "../Reactbits/Counter";
const ShowNowTime = () => {
  const [time, setTime] = useState(dayjs());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-row justify-center">
      <h2 className="text-3xl font-bold py-6 px-2">
        当前时间:{time.format("YYYY-MM-DD HH:mm")} :
      </h2>
      <Counter
        value={parseInt(time.format('ss'))}
        places={[10, 1]}
        fontSize={80}
        padding={5}
        gap={10}
        textColor="black"
        fontWeight={900}
        gradientFrom="white"
      />
    </div>
  );
};

export default ShowNowTime;
