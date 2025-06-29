import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
export default async function getAiMessageNo(req, res, next) {
  try {
    const openai = new OpenAI({
      // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });

    // 获取客制化的答案
    const userQuestion = req.query.q || "你是谁？";
    const model = req.query.model || "qwen-plus";

    const completion = await openai.chat.completions.create({
      model: model, //此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userQuestion },
      ],
      enable_search: true,
    });
    
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({ content: completion.choices[0].message.content });
    res.end()
  } catch (error) {
    next(error);
    res.end()
  }
}
