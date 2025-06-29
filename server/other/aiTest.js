import OpenAI from "openai";

const openai = new OpenAI(
    {
        // 若没有配置环境变量，请用阿里云百炼API Key将下行替换为：apiKey: "sk-xxx",
        apiKey: 'sk-4933d482a42c440dabf8beaf1a7bc02d',
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    }
);

const completion = await openai.chat.completions.create({
    model: "qwen-plus", // 此处以qwen-plus为例，您可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
    messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "你是谁？"}
    ],
    stream: true,
    stream_options: {
        include_usage: true
    },
    // Qwen3模型通过enable_thinking参数控制思考过程（开源版默认True，商业版默认False）
    // 使用Qwen3开源版模型时，若未启用流式输出，请将下行取消注释，否则会报错
    // enable_thinking: false,
});

let fullContent = "";
console.log("流式输出内容为：")
for await (const chunk of completion) {
    // 如果stream_options.include_usage为true，则最后一个chunk的choices字段为空数组，需要跳过（可以通过chunk.usage获取 Token 使用量）
    if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
        fullContent = fullContent + chunk.choices[0].delta.content;
        console.log(chunk.choices[0].delta.content);
    }
}
console.log("\n完整内容为：")
console.log(fullContent);