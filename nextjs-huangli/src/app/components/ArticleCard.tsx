import React from 'react';
import type { Article } from '@/src/app/lib/types';

// 单个文章卡片组件
interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <div className="py-4 border-b border-gray-200">
      <h3 className="text-xl font-semibold mb-1">{article.title}</h3>
      <p className="text-gray-600">{article.summary}</p>
    </div>
  );
};

export default ArticleCard;