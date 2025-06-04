import TopBar from "./TopBar"
import Footer from "./Footer"
import { useState } from "react"
import PassData from "./PassData"
const Knowledge = () => {
  const [count , setCount] = useState(0)
  const [randNum , setRandNum] =useState(0)
  const handleRandNum = (num:any) =>{
  setRandNum(num)
  }
  return (
    <div>
      <TopBar />
      <>
      <div>组件传递数据练习!</div>
      <button onClick={()=>{setCount(count+1)}}>APP组件 点击+1</button>
      <p>APP计数器{count}</p>
      <PassData count={count} randNum={handleRandNum}>你好啊你好啊</PassData>
      <p>passData传递过来的随机数 {randNum}</p>
    </>
      <Footer />
    </div>
  )
}

export default Knowledge