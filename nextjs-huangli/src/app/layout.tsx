import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/src/app/components/Sidebar"; // 引入侧边栏

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "我的博客",
  description: "一个使用 Next.js 构建的博客",
};

// 根布局，定义了网站的整体结构
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-[#696969] p-8">
          <Sidebar /> {/* 左侧边栏是固定的 */}
          <main className="flex-1 ml-8 bg-[#D3D3D3]">
            {children} {/* 右侧主内容区是动态的 */}
          </main>
        </div>
      </body>
    </html>
  );
}