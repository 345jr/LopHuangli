import type {huangLiData} from './types/huangli'
import {useEffect, useState} from 'react'
import axios from 'axios'

import {Spin} from 'antd'

import TopBar from './components/Global/TopBar'
import Home from './components/Home/Home'
import TimeSlider from './components/Home/TimeSlider'
import Footer from './components/Global/Footer'
import {
  saveHuangLiStorage,
  getHuangLiStorage,
} from './components/util/SessionStorage'
import UpBall from './components/Global/UpBall'
import Banner from './components/Home/Banner'

const App = () => {
  const [data, setData] = useState<huangLiData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheData = getHuangLiStorage('huangli-data')
        if (cacheData) {
          setData(cacheData)
          console.log('使用缓存数据')
          return
        }
        axios
          .get('/api/huangli')
          .then((d) => {
            setData(d.data)
            saveHuangLiStorage('huangli-data', d.data)
            return d
          })
          .catch((e) => console.log(`加载失败 :${e}`))
      } catch (e) {
        console.log('网络请求存在问题 :', e)
      }
    }
    fetchData()
  }, [])

  if (!data) {
    return (
      <>
        <div className="h-screenl flex w-screen items-center justify-center">
          <Spin size="large" tip="获取数据中..." />
        </div>
      </>
    )
  }

  return (
    <div className="relative">
      <TopBar />
      <div className="relative z-10">
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
          {/* 这里可以放背景的组件 */}
        </div>
        {/* 主内容区 */}
        <TimeSlider data={data}></TimeSlider>
        <Banner />
        <Home data={data}></Home>
        <Footer />
        <UpBall />
      </div>
    </div>
  )
}

export default App
