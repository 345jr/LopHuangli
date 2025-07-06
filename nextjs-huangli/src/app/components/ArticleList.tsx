'use client'; // 这是一个客户端组件，因为它需要处理状态切换

import React, { useState } from 'react';
import type { Article } from '@/src/app/lib/types';
import ArticleCard from './ArticleCard';

// 文章列表组件，包含热门和最新切换功能
interface ArticleListProps {
  hotArticles: Article[];
  latestArticles: Article[];
}

const ArticleList = ({ hotArticles, latestArticles }: ArticleListProps) => {
  const [activeTab, setActiveTab] = useState<'hot' | 'latest'>('hot');

  const articlesToShow = activeTab === 'hot' ? hotArticles : latestArticles;

  const tabButtonStyle = "w-full py-3 text-center font-semibold rounded-t-lg transition-colors";
  const activeTabStyle = "bg-white text-blue-600";
  const inactiveTabStyle = "bg-gray-100 text-gray-500 hover:bg-gray-200";

  return (
    <div className="mt-8 flex gap-8">
      {/* 切换 Tab */}
      <div className="w-32 flex-shrink-0">
        <button
          onClick={() => setActiveTab('hot')}
          className={`${tabButtonStyle} ${activeTab === 'hot' ? activeTabStyle : inactiveTabStyle}`}
        >
          热门文章
        </button>
        <button
          onClick={() => setActiveTab('latest')}
          className={`${tabButtonStyle} ${activeTab === 'latest' ? activeTabStyle : inactiveTabStyle}`}
        >
          最新文章
        </button>
      </div>

      {/* 文章列表 */}
      <div className="flex-1">
        {articlesToShow.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
        <div className="text-right mt-4">
          <a href="#" className="text-blue-600 hover:underline">
            查看更多
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;