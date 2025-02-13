import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get("country")
  const page = searchParams.get("page") || "1"

  if (!country) {
    return NextResponse.json({ error: "Country is required" }, { status: 400 })
  }

  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "News API key is not configured" }, { status: 500 })
  }

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&apiKey=${apiKey}`
    console.log("Fetching news from URL:", url)
    const response = await fetch(url)
    const data = await response.json()
    console.log("News API response:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}