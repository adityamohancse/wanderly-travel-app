export type ItineraryRequest = { destination: string; days: number; style: string; interests?: string }

export type ChatMessage = { role: 'user' | 'ai'; text: string }

export type Itinerary = {
  destination: string
  country?: string
  duration: number
  summary?: string
  days: { day: number; title: string; activities: { time: string; title: string; location: string; description: string }[] }[]
}

const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

function geminiError(status: number) {
  if (status === 401) return 'Gemini authentication failed. Please check the API configuration.'
  if (status === 403) return 'Gemini API access was denied. Check API permissions and billing.'
  if (status === 404) return 'The configured Gemini model is unavailable.'
  if (status === 429) return 'Gemini quota or rate limit reached. Please try again shortly.'
  if (status === 503) return 'Gemini is temporarily unavailable. Please try again shortly.'
  if (status >= 500) return `Gemini service error (HTTP ${status}). Please try again shortly.`
  return `Gemini request failed (HTTP ${status}).`
}

async function askGemini(prompt: string, responseMimeType?: string) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key || key === 'your_gemini_key') throw new Error('Gemini API key is not configured')
  let response: Response
  try {
    response = await fetch(`${endpoint}?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.6, ...(responseMimeType ? { responseMimeType } : {}) }
      })
    })
  } catch {
    throw new Error('Unable to reach Gemini. Check your connection and try again.')
  }
  if (!response.ok) throw new Error(geminiError(response.status))
  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Gemini returned an empty response')
  return text
}

export async function askTravelAssistant(question: string, destination?: { name: string; country: string; places: string[] }) {
  const context = destination ? `The user is viewing ${destination.name}, ${destination.country}. Key places: ${destination.places.join(', ')}.` : 'The user has not selected a destination yet.'
  return askGemini(`You are Wanderly AI, a concise and practical travel assistant. ${context} Answer this question in 2-4 useful sentences. Do not invent precise facts when uncertain. Question: ${question}`)
}

export async function generateItinerary(request: ItineraryRequest) {
  const prompt = `You are Wanderly AI. Return only JSON matching this shape: {"destination":string,"country":string,"duration":number,"summary":string,"days":[{"day":number,"title":string,"activities":[{"time":string,"title":string,"location":string,"description":string}]}]}. Create a realistic ${request.days}-day ${request.style} itinerary for ${request.destination}. Interests: ${request.interests || 'general highlights'}. Keep 3-5 activities per day.`
  const text = await askGemini(prompt, 'application/json')
  const jsonStart = text.indexOf('{')
  const jsonEnd = text.lastIndexOf('}')
  if (jsonStart < 0 || jsonEnd <= jsonStart) throw new Error('Gemini returned invalid itinerary JSON')
  let parsed: Itinerary
  try {
    parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as Itinerary
  } catch {
    throw new Error('Gemini returned invalid itinerary JSON')
  }
  if (!parsed.destination || !Number.isFinite(parsed.duration) || parsed.duration !== request.days || !Array.isArray(parsed.days) || parsed.days.length !== request.days ||
      parsed.days.some(day => !Number.isFinite(day.day) || !day.title || !Array.isArray(day.activities) ||
        day.activities.some(activity => !activity.time || !activity.title || !activity.location || !activity.description))) {
    throw new Error('Gemini returned an incomplete itinerary')
  }
  return parsed
}
