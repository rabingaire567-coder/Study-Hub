# Study Hub - Education for All (Nepal)

Study Hub is a Nepal-focused educational platform aligned with the theme "Education for All". It features comprehensive location data for all 7 provinces and 77 districts of Nepal, AI-powered tutoring (Google Gemini), problems & solutions research, offline-first learning resources, and professional UI/UX with animations.

## Features

- **Nepal-Focused**: Detailed data for all provinces (Koshi, Madhesh, Bagmati, Gandaki, Lumbini, Karnali, Sudurpashchim), 77 districts with region context (Mountain, Hill, Terai)
- **AI Integration**: Google Gemini AI tutor with Nepal-specific context, supports Nepali and English
- **Problems & Solutions**: Research-based analysis of education challenges in Nepal with practical solutions
- **Learning Resources**: Curated offline-first, low-bandwidth resources mapped to local contexts
- **Professional Design**: Modern UI with Tailwind CSS, Framer Motion animations, responsive design
- **Offline-First**: Uses static JSON + localStorage, works without internet
- **Inclusive**: Accessibility, gender equity, multilingual support

## Tech Stack

- React + TypeScript + Vite
- React Router DOM
- Tailwind CSS (styling)
- Framer Motion (animations)
- Static JSON data
- localStorage for preferences (API key, progress)

## Getting Started

```bash
cd study-hub
npm install
npm run dev
```

## Build

```bash
npm run build
```

## AI Setup

1. Go to [Google AI Studio](https://aistudio.google.com/apikey) to generate a Gemini API key
2. Open AI Tutor page in the app and enter your API key
3. Key is stored locally in browser's localStorage only

## Project Info

- Name: Study Hub
- Theme: Education for All
- Focus: Nepal (all provinces, districts, tiny location details)
- AI: Google Gemini API integration
- Data: Static JSON (offline-friendly)
- Storage: localStorage
- Deployment: GitHub Pages ready

Built with ❤️ for Nepal.