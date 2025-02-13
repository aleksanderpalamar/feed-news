import type { Article } from "@/types/articles"
import Image from "next/image"
import Link from "next/link"

interface NewsCardProps {
  article: Article
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="bg-zinc-800 shadow-lg rounded-lg overflow-hidden">
      <Image
        src={article.urlToImage || "/news.jpg"}
        alt={article.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{article.title}</h2>
        <p className="text-zinc-600 text-base mb-4">{article.description}</p>
        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white 
          font-bold py-2 px-4 rounded"
        >
          Read more
        </Link>
      </div>
    </div>
  )
}