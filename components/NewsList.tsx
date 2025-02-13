import type { Article } from "@/types/articles"
import NewsCard from "./NewsCard"

interface NewsListProps {
  articles: Article[]
}

export const NewsList = ({ articles }: NewsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  )
}