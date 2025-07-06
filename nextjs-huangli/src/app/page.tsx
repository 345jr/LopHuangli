import BlogBanner from "@/src/app/components/BlogBanner";
import ArticleList  from "@/src/app/components/ArticleList";
import { getHotArticles, getLatestArticles } from "@/src/app/lib/data";

// 博客主页 (这是一个 Server Component)
export default async function HomePage() {
  
  const hotArticles = await getHotArticles();
  const latestArticles = await getLatestArticles();
  
  return (
    <div>
      <BlogBanner />
      <ArticleList  hotArticles={hotArticles} latestArticles={latestArticles} />
    </div>
  );
}