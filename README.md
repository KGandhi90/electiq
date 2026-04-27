# 🗳️ ElectIQ

> Understanding India's Democracy, Simply.

[![Live Demo](https://img.shields.io/badge/Live-electiqq.vercel.app-E8650A?style=flat-square)](https://electiqq.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-KGandhi90/electiq-black?style=flat-square)](https://github.com/KGandhi90/electiq)
[![Made with Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=flat-square)](https://aistudio.google.com)
[![Analytics](https://img.shields.io/badge/Analytics-Google%20Analytics%204-orange?style=flat-square)](https://analytics.google.com)

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Google Services](#google-services)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Deployment](#deployment)

---

## Overview

ElectIQ is a civic education progressive web app that makes Indian elections easy to understand for every citizen — whether you're a first-time voter, a student, or just a curious Indian. It combines an interactive quiz, a deeply knowledgeable AI chatbot, and a clean editorial design to make democracy feel approachable.

**Live:** [electiqq.vercel.app](https://electiqq.vercel.app)  
**Repo:** [github.com/KGandhi90/electiq](https://github.com/KGandhi90/electiq)

---

## Problem Statement

Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.

Most civic education resources are either too dry, too complex, or buried inside government portals that are hard to navigate. Young and first-time voters especially lack a fast, friendly, and trustworthy place to learn about Indian democracy.

---

## Solution

ElectIQ solves this with three focused experiences:

**1. Election Quiz**
Ten carefully crafted questions covering everything from Lok Sabha seat counts to the history of NOTA. Every answer reveals a detailed explanation so users learn as they play — not just after they finish.

**2. AI Expert Chat**
A Gemini-powered chatbot with a deeply specialized system prompt covering the Indian Constitution, electoral law, political parties, landmark Supreme Court judgments, coalition politics, and every general election from 1952 to 2024. It answers nuanced questions that a generic AI cannot.

**3. Home Dashboard**
A newspaper-style masthead with live rotating facts, key election statistics, and direct entry points into the quiz and chat — designed to feel like a real civic product, not a student project.

---

## Features

| Feature | Description |
|---|---|
| 🧠 Election Quiz | 10 questions, instant correct/wrong reveal, detailed explanations, score tracking, share results |
| 🤖 AI Expert Chat | Gemini-powered with multi-turn memory, specialized Indian politics system prompt, graceful fallback |
| 📊 Rotating Facts | 8 rotating Indian election facts with smooth fade transition and dot navigation |
| 📱 PWA | Installable on mobile, works offline for static content |
| ♿ Accessible | ARIA labels, keyboard navigation, skip links, focus management, screen reader support |
| 📈 Analytics | Google Analytics 4 tracking quiz completions, chat usage, and user journeys |
| 💀 Error Boundary | Graceful crash handling with recovery UI |
| 🦴 Skeleton Loading | Shimmer skeleton on initial Home load |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| AI | Google Gemini API (gemini-2.0-flash) |
| Analytics | Google Analytics 4 (react-ga4) |
| Database/Auth | Firebase Firestore + Anonymous Auth |
| Icons | Lucide React |
| Fonts | Playfair Display · Inter · JetBrains Mono |
| PWA | vite-plugin-pwa |
| Deployment | Vercel |

---

## Google Services

ElectIQ integrates two Google services as core parts of the product — not as afterthoughts.

### 1. Google Gemini API
The AI chatbot is powered by `gemini-2.0-flash` with a custom system prompt that positions it as a specialized expert on:
- The Constitution of India (all articles and amendments)
- Every General Election from 1952 to 2024
- Major political parties, coalitions, and leaders
- Electoral law — Representation of the People Act, anti-defection law, Model Code of Conduct
- Landmark Supreme Court judgments on elections
- EVMs, VVPAT, NOTA, and electoral reforms

The system prompt enforces factual accuracy, political neutrality, concise mobile-friendly responses, and graceful handling of off-topic questions.

### 2. Google Analytics 4
Custom events are tracked at every meaningful user action:

| Event | Category | Action |
|---|---|---|
| Quiz started | Quiz | Started |
| Question answered | Quiz | Answered — Q3 Correct |
| Quiz completed | Quiz | Completed — Score: 7/10 |
| Quiz retaken | Quiz | Retaken |
| Score shared | Quiz | Shared |
| Chat message sent | Chat | MessageSent |
| Quick reply used | Chat | QuickReplyUsed |
| Feature card clicked | Home | FeatureClicked |
| Render error caught | App | RenderError |

### 3. Firebase Firestore & Auth
Firebase is used to build a global leaderboard system without requiring user sign-ups:
- **Anonymous Auth:** Automatically signs users in silently in the background when they complete a quiz.
- **Firestore:** Saves each completed quiz score and timestamp to the `quizScores` collection. It then queries the aggregate data to render a live distribution chart of how others scored worldwide.

---

## Project Structure

```
electiq/
├── public/
│   ├── icon-192.png
│   └── icon-512.png
│
├── src/
│   ├── api/
│   │   └── geminiApi.js        ← Gemini integration + system prompt
│   │
│   ├── components/
│   │   ├── ChatBubble.jsx      ← User and AI message bubbles
│   │   ├── ErrorBoundary.jsx   ← Crash recovery UI
│   │   ├── Navbar.jsx          ← Responsive nav with mobile menu
│   │   ├── QuizCard.jsx        ← Question + options + explanation
│   │   ├── SkeletonHome.jsx    ← Shimmer loading skeleton
│   │   └── StatusBadge.jsx     ← Colored tag component
│   │
│   ├── context/
│   │   └── AppContext.jsx      ← Global state with useMemo
│   │
│   ├── data/
│   │   └── mockData.js         ← All seed data
│   │
│   ├── hooks/
│   │   ├── useChat.js          ← Chat state + Gemini integration
│   │   ├── useFactStrip.js     ← Rotating facts logic
│   │   └── useQuiz.js          ← Complete quiz flow state
│   │
│   ├── pages/
│   │   ├── Chat.jsx            ← AI chatbot page
│   │   ├── Home.jsx            ← Dashboard + facts + entry points
│   │   └── Quiz.jsx            ← Start → Questions → Results
│   │
│   ├── utils/
│   │   ├── analytics.js        ← GA4 helper functions
│   │   └── helpers.js          ← Pure utility functions (JSDoc)
│   │
│   ├── App.jsx                 ← Router + GA page tracking
│   ├── main.jsx                ← Entry point + providers
│   └── index.css               ← Tailwind + global keyframes
│
├── .env.example
├── vercel.json
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- A free Gemini API key from [aistudio.google.com](https://aistudio.google.com/app/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/KGandhi90/electiq.git
cd electiq

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your keys to .env

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# Google Gemini API — required for AI chat
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Google Analytics 4 — optional, app works without it
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Firebase — required for live leaderboard
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> If `VITE_GEMINI_API_KEY` is not set, the chat falls back to keyword-based mock responses so the UI remains fully functional during development.

---

## Accessibility

ElectIQ is built with accessibility as a first-class concern, not an afterthought.

- **ARIA labels** on all interactive elements — quiz options, chat input, progress bar, fact strip dots
- **Keyboard navigation** — full Tab order, arrow keys for quiz options, Enter to send chat messages
- **Focus management** — focus moves to question text on next question, results heading on completion
- **Live regions** — `aria-live="polite"` on messages, quiz results, and fact strip
- **Skip link** — "Skip to main content" appears on first Tab press
- **Screen reader roles** — `role="log"` on chat, `role="radiogroup"` on quiz options, `role="alert"` on explanations
- **No color-only information** — quiz correct/wrong states use both color AND icons

---

## Performance

Optimizations applied:
- Manual chunk splitting (vendor, gemini, analytics)
- `React.memo` on pure display components
- `useCallback` and `useMemo` throughout hooks
- `useMemo` on AppContext value (static data, no re-renders)
- Google Fonts cached via Workbox `CacheFirst` strategy
- Skeleton loading prevents layout shift on Home

---

## Deployment

**Frontend:** Vercel  
**Live URL:** [electiqq.vercel.app](https://electiqq.vercel.app)
