"use client"

import { useState, useEffect } from "react"
import type { Article } from "@/types/articles"
import { NewsList } from "@/components/NewsList"
import { Loader } from "lucide-react"


export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [location, setLocation] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    // Get user's location
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetch(`/api/location?lat=${latitude}&lon=${longitude}`)
            .then((res) => res.json())
            .then((data) => {
              console.log("Detected country:", data.country)
              setLocation(data.country)
            })
        },
        (error) => {
          console.error("Error getting location:", error.message)
          setLocation("us") // Default to BR if geolocation fails
        },
      )
    } else {
      console.log("Geolocation is not supported")
      setLocation("us") // Default to BR if geolocation is not supported
    }
  }, [])

  useEffect(() => {
    const fetchNews = async () => {
      if (!location) return
      console.log("Fetching news for country:", location)
      const res = await fetch(`/api/news?country=${location}&page=${page}`)
      const data = await res.json()
      console.log("Fetched news data:", data)
      if (data.articles && Array.isArray(data.articles)) {
        setArticles((prevArticles) => [...prevArticles, ...data.articles])
      } else {
        console.error("Invalid news data received:", data)
      }
    }

    fetchNews()
  }, [location, page])

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">News Feed for {location?.toUpperCase()}</h1>
      {articles.length > 0 ? <NewsList articles={articles} /> : (
        <Loader className="animate-spin w-6 h-6 mx-auto" />
      )}
      <div className="mt-8 text-center">
        <button onClick={loadMore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Load More
        </button>
      </div>
    </main>
  )
}