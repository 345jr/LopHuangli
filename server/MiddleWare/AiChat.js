import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
export default async function getAiMessage(req, res, next) {
  try {
    const openai = new OpenAI({
      // 若没有配置环境变量，请用阿里云百炼API Key将下行替换为：apiKey: "sk-xxx",
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });

    // 获取客制化的答案
    const userQuestion = req.query.q || "你是谁？";
    const model = req.query.model || "qwen-plus";
    
    // 设置响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const completion = await openai.chat.completions.create({
      model: model, // 此处以qwen-plus为例，您可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userQuestion },
      ],
      stream: true,
      enable_search:true,
      stream_options: {
        include_usage: true,
      },
      // Qwen3模型通过enable_thinking参数控制思考过程（开源版默认True，商业版默认False）
      // 使用Qwen3开源版模型时，若未启用流式输出，请将下行取消注释，否则会报错
      // enable_thinking: false,
    });

    let fullContent = "";
    for await (const chunk of completion) {
      // 如果stream_options.include_usage为true，则最后一个chunk的choices字段为空数组，需要跳过（可以通过chunk.usage获取 Token 使用量）
      if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
        const content = chunk.choices[0].delta.content;
        fullContent += content;
        res.write(content);
      } else {
        // console.log(`本次模型调用信息->模型: ${chunk.model} token使用情况: ${chunk.usage.total_tokens}`)       
      }
    }
    res.end()
  } catch (err) {
    next(err);
    res.end()
  }
}
