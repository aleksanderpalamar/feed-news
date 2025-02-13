import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
    )
    const data = await response.json()
    console.log("Geolocation API response:", data)
    return NextResponse.json({ country: data.countryCode.toLowerCase() })
  } catch (error) {
    console.error("Error fetching location:", error)
    return NextResponse.json({ error: "Failed to fetch location", country: "br" }, { status: 500 })
  }
}