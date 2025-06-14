import type { huangLiData } from "./types/huangli";
import { useEffect, useState } from "react";

import TopBar from "./components/Global/TopBar";
import Home from "./components/Home/Home";
import TimeSlider from "./components/Home/TimeSlider";
import Footer from "./components/Global/Footer";

const App = () => {
  const [data, setData] = useState<huangLiData | null>(null);

  useEffect(() => {
    fetch("http://199.115.229.247:8085/api/huangli")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch((e) => console.log(`加载失败 :${e}`));
  }, []);

  if (!data) {
    return <div className="text-center py-20">加载中…</div>;
  }
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
      </div>
    </div>
  );
};

export default App;
