import type { huangLiData } from "../types/huangli"
import { useEffect , useState } from "react"
import dayjs from "dayjs"

const Home = ({data}:{data:huangLiData | null}) => {
    const [time , setTime ] =useState(dayjs())
    useEffect(()=>{
        const timer = setInterval(() => {
            setTime(dayjs())
        }, 1000);
        return ()=>clearInterval(timer)
    },[])
  return (
    <div >
      <h1 className="text-xl font-bold my-2">今日黄历</h1>
      <h2 className="text-xl font-bold my-2">今日时间:{time.format("YYYY-MM-DD HH:mm:ss")}</h2>
      {data ? <h3 className="text-xl font-bold my-2">黄历时间:{data.data.lunarDay}</h3> : <p>加载中...</p>}
      {data ? <h3 className="text-xl font-bold my-2">干支时间:{data.data.ganZhiDay}</h3> : <p>加载中...</p>}
      {data ? <h3 className="text-xl font-bold my-2">时辰:{data.data.lunarHour}</h3> : <p>加载中...</p>}
      {data ? <h3 className="text-xl font-bold my-2">胎神:{data.data.fetus}</h3> : <p>加载中...</p>}
      {data ? <h3 className="text-xl font-bold my-2">星宿:{data.data.Zone}方{data.data.twentyEightStar}{data.data.animal}{data.data.luckStar}-{data.data.twentyEightStar}</h3> : <p>加载中...</p>}
      {data ? <h3 className="text-xl font-bold my-2">彭祖:{data.data.pengZu}</h3> : <p>加载中...</p>}
      {data ? <h3 className="text-xl font-bold my-2">五行:{data.data.sound}{data.data.duty}执位</h3> : <p>加载中...</p>}
      {data ? <h3 className="text-xl font-bold my-2">冲煞:{data.data.zodiac}日冲{data.data.chongToAnimal}  煞{data.data.shaDirection}</h3> : <p>加载中...</p>}
        <div className="flex flex-row"> 
            <h3>✅ 宜事项：</h3>
            <ul className="mx-4">
                {data?.data.taboosGood.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul>
            <h3>❌ 忌事项：</h3>
            <ul className="mx-4">
                {data?.data.taboosBad.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul>
            <h3>时辰吉凶</h3>  
            <ul className="mx-4">
                {data?.data.todayJiXiong.map((item,index)=>(
                    <li key={index} className="">{item.siCheng}-{item.jiXiong} |时间段 :{item.range}</li>                
                ))}
            </ul>  
        </div>  
    </div>
  );
};

export default Home