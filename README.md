# Wanderly

Wanderly is a premium editorial travel application for discovering destinations, exploring famous places, checking live weather, asking travel questions, and generating structured itineraries.

## Features

- Cinematic video hero
- Destination explorer
- Destination search and filtering
- Destination detail pages
- Famous places
- Browser location detection
- Manual location search
- Real-time weather with OpenWeather
- Gemini AI travel assistant
- AI-generated itineraries
- Responsive design
- Favorites

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS tooling
- React Router
- Framer Motion
- Lucide React
- Gemini API
- OpenWeather API
- Unsplash
- MDN's externally hosted sample video used as the hero video source

## APIs

- **Gemini API:** powers the Wanderly AI travel assistant and generates validated, structured day-by-day itineraries.
- **OpenWeather API:** provides live destination and user-location weather, including temperature, feels-like temperature, conditions, humidity, wind, pressure, visibility, and weather icons.
- **Unsplash:** supplies remote destination and famous-place photography. Images use a graceful fallback when an external image genuinely fails to load.
- **Browser Geolocation API:** provides coordinates for the user's location-weather flow after permission is granted.

## Environment Variables

Create your own `.env` file in the project root. Never commit it or share its values.

```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_OPENWEATHER_API_KEY=your_openweather_key
```

`.env.example` contains these placeholders and can be copied to create the local file. Restart the Vite development server after changing environment variables.

## Local Setup

```bash
git clone <your-repository-url>
cd <your-repository-directory>
npm install
copy .env.example .env
npm run dev
```

On macOS or Linux, use `cp .env.example .env` instead of the Windows `copy` command. Add your own API keys to `.env` before using live Gemini and OpenWeather features.

## Build

```bash
npm run build
```

The production files are generated in `dist/`. The `dist/` directory and `node_modules/` are local build/dependency output and are excluded from Git.

## Deployment

Wanderly can be deployed to Vercel or another static hosting provider. Configure `VITE_GEMINI_API_KEY` and `VITE_OPENWEATHER_API_KEY` in the provider's project environment before building. The included `vercel.json` rewrites application routes to `index.html` so client-side routes work on refresh.

Because this is a Vite client application, `VITE_*` values are included in the browser bundle. For production, use provider restrictions, referrer controls, quotas, and server-side proxy/serverless functions where appropriate.

## Design Decisions

- **Premium editorial aesthetic:** warm ivory, charcoal, sage, and sand tones create a calm, image-led travel experience rather than a generic dashboard.
- **Typography:** serif display headings create an editorial voice while clean sans-serif text keeps navigation, forms, metadata, and weather information readable.
- **Responsive layout:** the hero, destination grid, detail pages, planner, assistant drawer, weather cards, and itinerary timeline adapt across desktop, tablet, and mobile widths.
- **Destination imagery:** curated remote Unsplash URLs keep destination and place photography external without adding local image assets.
- **Weather card:** live OpenWeather data is presented as a concise current-conditions summary with useful secondary details.
- **AI assistant:** the Gemini assistant is integrated as a travel companion with destination context, quick prompts, retry behavior, and user-friendly error states.
- **Itinerary timeline:** validated Gemini JSON is rendered as a readable day-by-day timeline with times, activities, locations, and descriptions.

## Screenshots

Screenshots are not included in this repository yet.

Suggested placeholders for a final submission:

- `[Add homepage screenshot]`
- `[Add destination explorer screenshot]`
- `[Add destination detail and weather screenshot]`
- `[Add AI planner and itinerary screenshot]`

## Assignment Requirements

- [x] Cinematic video-led homepage hero
- [x] Premium editorial visual design
- [x] Destination explorer with responsive cards
- [x] Destination search, region filters, travel-style/sort controls, and favorites
- [x] Destination detail pages with editorial content and metadata
- [x] Famous-place recommendation cards with external imagery
- [x] Real destination weather from OpenWeather
- [x] User-location weather using browser geolocation coordinates
- [x] Manual location search and graceful permission-denied handling
- [x] Gemini travel assistant for normal travel questions
- [x] Gemini structured itinerary generation
- [x] Validated itinerary JSON rendered through a timeline UI
- [x] Loading, empty, API-error, and image-fallback states
- [x] Responsive desktop, tablet, and mobile layouts
- [x] Keyboard focus states, semantic labels, and image alt text
- [x] External destination/place imagery without local hardcoded photographs
- [x] Environment-variable configuration with placeholder `.env.example`
- [x] `dist/`, `node_modules/`, and environment files excluded from Git
