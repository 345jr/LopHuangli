import type { huangLiData } from "./types/huangli";
import { useEffect, useState } from "react";

import { Flex, Spin } from "antd";

import TopBar from "./components/Global/TopBar";
import Home from "./components/Home/Home";
import TimeSlider from "./components/Home/TimeSlider";
import Footer from "./components/Global/Footer";
import {
  saveHuangLiStorage,
  getHuangLiStorage,
} from "./components/util/SessionStorage";
import UpBall from "./components/Global/UpBall";

const App = () => {
  const [data, setData] = useState<huangLiData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheData = getHuangLiStorage("huangli-data");
        if (cacheData) {
          setData(cacheData);
          console.log("使用缓存数据");
          return;
        }
        fetch("/api/huangli")
          .then((r) => r.json())
          .then((d) => {
            setData(d);
            saveHuangLiStorage("huangli-data", d);
            return d;
          })
          .catch((e) => console.log(`加载失败 :${e}`));
      } catch (e) {
        console.log("网络请求存在问题 :", e);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
    <>
      <Flex align="center" gap="middle">
        <Spin size="large" tip='获取数据中...'/>
      </Flex>
    </> 
  )}

  return (
    <div className="relative">
      <TopBar />
      <div className="relative z-10">
        {/* Aurora 背景层只覆盖主内容区 */}
        <div className="absolute inset-0 z-0 pointer-events-none h-full w-full">
          {/* 这里可以放背景的组件 */}
        </div>
        {/* 主内容区 */}
        <TimeSlider data={data}></TimeSlider>
        <Home data={data}></Home>
        <Footer />
        <UpBall />
      </div>
    </div>
  );
};

export default App;
