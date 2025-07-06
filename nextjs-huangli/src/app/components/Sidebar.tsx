import React from 'react'

// 左侧边栏组件
const Sidebar = () => {
  return (
    <aside className="flex w-1/4 min-w-[280px] bg-[#D3D3D3] flex-col gap-8 border-r p-8">
      {/* 个人介绍区域 */}
      <div className="text-center">
        <div className="mx-auto mb-4 h-24 w-24 rounded-full"></div>
        <h2 className="text-xl font-semibold">个人介绍区域</h2>
      </div>

      {/* 个人详细介绍 */}
      <div className="h-[306px]">
        <h3 className="mb-2 border-b pb-2 font-bold">个人详细介绍</h3>
        <p className="text-sm text-gray-600">
          这里是一段关于博主的详细介绍。他热衷于 Web 开发，专注于
          JavaScript、React 和 Next.js 技术栈。
        </p>
      </div>

      {/* 联系方式 */}
      <div className="h-[168px]">
        <h3 className="mb-2 border-b pb-2 font-bold">联系方式</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>Email: your.email@example.com</li>
          <li>GitHub: your-github</li>
          <li>Twitter: @your-twitter</li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
