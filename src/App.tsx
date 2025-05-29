import type { huangLiData } from "./types/huangli"
import TopBar from "./components/TopBar"
import Home from "./components/Home"
import TimeSlider from "./components/TimeSlider"
import { useEffect, useState } from "react"


const App = () => {
  const [data , setData] =useState<huangLiData | null>(null)
  
  useEffect(()=>{
          fetch("http://localhost:3000/api/huangli")
          .then(r=>r.json())
          .then(d=>setData(d))
          .catch(e=>console.log(`加载失败 :${e}`))          
      },[])
  return (
    <div>
      <TopBar></TopBar>
      <TimeSlider data={data} ></TimeSlider>
      <Home data={data}></Home>
      </div>
  )
}

export default App