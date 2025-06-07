import { Link } from "react-router-dom";
import { AnimatedMarkdown } from 'flowtoken';

const NotFoundPage = () => {
  const text = `首选推荐：Vercel AI SDK (ai/react)
这不只是一个动画库，而是一个完整的、为构建 AI 应用（尤其是聊天应用）量身打造的工具集。它为你处理了几乎所有与 LLM 后端通信和前端状态管理的复杂工作。

为什么它是最佳选择？

为流式传输而生：它的核心 hook（如 useChat, useCompletion）就是专门为处理流式响应设计的。
状态管理自动化：你无需手动管理加载状态、错误状态、消息列表等，SDK 全部帮你搞定。
无缝集成 Markdown：可以极其方便地与 react-markdown 等库结合使用。
社区生态强大：有大量的示例、教程和周边库，例如 Vercel 官方的 Generative UI 组件库，可以直接使用带动画效果的聊天组件。
如何实现带动画的 Markdown 输出？
你需要组合两个库：ai/react (处理数据) 和 react-markdown (渲染MD)。动画效果则通过我们之前讨论的“缓冲区”模式来实现，而 Vercel 的示例和社区已经有了很多成熟的实现。

下面是一个**“几乎可以拿来即用”**的完整示例，展示了如何 Vercel AI SDK 实现一个带打字机动画的聊天机器人界面。`
  return (
    <>
      <div>页面找不到</div>
      <Link to={"/"}>
        <button>返回</button>
      </Link>
      <div className="prose lg:prose-md prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent">
            <AnimatedMarkdown 
            content={text}
            animation="blurIn"
            animationDuration="1s"
            animationTimingFunction="ease-in-out"/>
      </div> 
    </>
  );
};

export default NotFoundPage;
