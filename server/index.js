import express from "express";
import cors from "cors";
import getHuangliMiddleware from "./MiddleWare/CalHuangLi.js";
import getAiMessage from "./MiddleWare/AiChat.js";
import getAiMessageNoStream from './MiddleWare/AiChatNoStream.js'
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js'

//使用UTC时间避免时间混乱
dayjs.extend(utc);
const app = express();
app.use(cors())
//获取黄历信息
app.get("/api/huangli", getHuangliMiddleware, (req, res) => {
  const now = dayjs().utc().format("YYYY-MM-DD-HH-mm-ss");
  res.json({ info: "今日黄历", time: now, data: res.locals.huangliData });
});
//ai问答流式
app.get("/api/aliyunaiStream" ,getAiMessage)
//ai问答非流式
app.get('/api/aliyunai' ,getAiMessageNoStream)

app.listen(3000, () => {
  console.log("服务已启动,端口3000正在监听....");
});
