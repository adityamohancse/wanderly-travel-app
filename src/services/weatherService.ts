export type WeatherResult = {
  temp: number
  condition: string
  feels: number
  humidity: number
  wind: number
  visibility: number
  pressure: number
  icon: string
  city?: string
  fallback?: boolean
}

function weatherError(status: number) {
  if (status === 401 || status === 403) return 'Weather service authentication failed. Please check the API configuration.'
  if (status === 404) return 'Weather location was not found.'
  if (status === 429) return 'Weather service rate limit reached. Please try again shortly.'
  if (status >= 500) return 'Weather service is temporarily unavailable. Please try again shortly.'
  return `Weather request failed (HTTP ${status}).`
}

export async function getWeather(coords: [number, number]): Promise<WeatherResult> {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!key || key === 'your_openweather_key') throw new Error('OpenWeather API key is not configured')
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(coords[0])}&lon=${encodeURIComponent(coords[1])}&units=metric&appid=${encodeURIComponent(key)}`)
  if (!res.ok) throw new Error(weatherError(res.status))
  const data = await res.json()
  if (!data.main || !data.weather?.[0]) throw new Error('Invalid weather response')
  return { temp: Math.round(data.main.temp), condition: data.weather[0].description, feels: Math.round(data.main.feels_like), humidity: data.main.humidity, wind: Math.round(data.wind.speed * 3.6), visibility: Math.round((data.visibility ?? 10000) / 1000), pressure: data.main.pressure, icon: data.weather[0].icon, city: data.name }
}
