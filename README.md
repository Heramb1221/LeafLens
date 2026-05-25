# LeafLens

> Instant plant identification powered by Google Gemini Vision AI.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Gemini AI](https://img.shields.io/badge/Google-Gemini%20Vision-orange?style=for-the-badge&logo=google)
![Status](https://img.shields.io/badge/Status-Experimental%20Prototype-purple?style=for-the-badge)

---

# About The Project

LeafLens is a full-stack web application that integrates Google Gemini's multimodal vision capabilities to identify plant species from photographs.

Users can:

- Upload an image from their device
- Capture a photo directly using the camera
- Submit the image for AI-powered plant identification

The application processes the image through the Gemini Vision API and returns structured botanical information including:

- Species name
- Scientific name
- Plant family
- Care requirements
- Native region
- Common uses
- Botanical facts

The project explores practical multimodal AI integration patterns, particularly:

- Prompt engineering for structured JSON output
- Validation and normalization of AI-generated responses
- Browser camera integration using the MediaDevices API
- Client-side PDF generation workflows

Beyond the identification feature, the repository also contains UI prototypes for:

- Community forum
- Species encyclopedia
- Plant gallery
- Botanical quiz
- Peer-to-peer plant exchange

This is a portfolio-grade learning project built to explore AI integration in a modern web application context rather than a production SaaS platform.

---

# Live Demo

| Resource | Link |
|---|---|
| Frontend | [Live Demo](https://leaf-lens-peach.vercel.app/) |

---

# Project Type

Full Stack Web Application — AI/ML Integration, Computer Vision, Consumer Tool

---

# Project Status

**Experimental Prototype / Learning Project**

The core plant identification workflow is fully functional. Community, gallery, encyclopedia, quiz, and exchange modules are currently UI prototypes using mock data.

This project was built primarily to explore:

- Gemini Vision API integration
- Prompt engineering
- Next.js App Router architecture
- AI response validation pipelines
- Camera and media handling in the browser

---

# Why I Built This

I built LeafLens to understand how to build reliable applications on top of non-deterministic AI systems.

The project helped me explore:

- Structured prompt engineering
- AI response validation
- Multimodal Gemini Vision workflows
- Camera APIs in the browser
- Next.js App Router architecture
- Client-side PDF generation

I chose plant identification because it provides immediate and visually verifiable AI output, making the integration feel tangible and practical.

---

# Features

## Core Features

- Camera capture using MediaDevices API
- Image upload support (JPEG, PNG, WebP)
- AI-powered plant identification
- Confidence score generation
- Plant care recommendations
- Botanical context and fun facts
- PDF export functionality
- Plant of the Day generation

---

## UI/UX Features

- Dark/light mode
- Animated transitions using Framer Motion
- Responsive mobile-first design
- Scroll-driven parallax effects
- Loading animations during AI inference

---

## Prototype Features

- Community forum UI
- Plant gallery
- Species encyclopedia
- Botanical quiz
- Plant exchange marketplace

---

# Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| Next.js 14 | App Router, API routes |
| React 18 | Component architecture |
| TypeScript | Static typing |
| Tailwind CSS | Styling system |
| Framer Motion | Animations |
| Lucide React | Icons |

---

## Backend / API

| Technology | Purpose |
|---|---|
| Next.js API Routes | Backend endpoint handling |
| @google/genai | Gemini SDK integration |

---

## AI / ML

| Technology | Purpose |
|---|---|
| Gemini 2.0 Flash | Multimodal plant identification |
| Prompt Engineering | Structured JSON extraction |
| Validation Layer | AI response normalization |

---

## PDF Generation

| Technology | Purpose |
|---|---|
| html2canvas | DOM-to-image rendering |
| jsPDF | Client-side PDF generation |

---

## Infrastructure

| Technology | Purpose |
|---|---|
| Vercel | Hosting |
| ESLint | Linting |
| PostCSS | CSS processing |

---

# Architecture

LeafLens follows a thin-client architecture where media capture happens in the browser while AI inference is delegated to Gemini through a Next.js API route.

```text
Browser
   │
   ├── Camera Capture
   ├── Image Upload
   └── React UI
            │
            ▼
POST /api/identify
            │
            ▼
Next.js API Route
            │
            ▼
Gemini Utility Layer
            │
            ▼
Google Gemini Vision API
```

---

## Request Lifecycle

```text
1. User uploads/captures image
2. FileReader converts image to base64
3. Request sent to /api/identify
4. Gemini receives image + prompt
5. AI returns structured JSON
6. Validation layer normalizes response
7. React state updates
8. Result UI renders
```

---

# Folder Structure

```text
leaflens/
├── app/
│   ├── api/
│   │   └── identify/
│   │       └── route.ts
│   ├── utils/
│   │   └── gemini.ts
│   ├── community/
│   ├── encyclopedia/
│   ├── exchange/
│   ├── gallery/
│   ├── guide/
│   ├── quiz/
│   ├── contact/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── public/
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

# Installation

## Prerequisites

- Node.js 18.17+
- Google Gemini API key

---

## Clone Repository

```bash
git clone https://github.com/heramb1221/leaflens.git
cd leaflens
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

```bash
cp .env.example .env.local
```

---

## Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

> For production, the API key should be server-side only and not exposed using the `NEXT_PUBLIC_` prefix.

---

# Usage

## Plant Identification

1. Open the application
2. Upload an image or capture a photo
3. Submit the image for identification
4. View:
   - Species information
   - Care requirements
   - Botanical facts
   - Confidence score
5. Export the result as PDF if needed

---

## Exploring Prototype Features

Navigation links provide access to:

- Plant Guide
- Community Forum
- Gallery
- Encyclopedia
- Quiz
- Exchange Marketplace

These sections currently use mock data only.

---

# API Documentation

## POST `/api/identify`

Accepts a base64-encoded plant image and returns structured botanical information.

---

## Example Request

```http
POST /api/identify
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,..."
}
```

---

## Example Response

```json
{
  "name": "Monstera Deliciosa",
  "scientificName": "Monstera deliciosa",
  "family": "Araceae",
  "confidenceScore": 0.94
}
```

---

# Screenshots

| View | Screenshot |
|---|---|
| Home Upload Interface | <img width="1897" height="873" alt="image" src="https://github.com/user-attachments/assets/97873c5a-6ecd-4767-92be-20f6efde6adc" /> |
| Community Forum | <img width="1902" height="869" alt="image" src="https://github.com/user-attachments/assets/6e4863af-287c-4ac1-8c4c-39622ffc270c" /> |
| Dark Mode | <img width="1902" height="851" alt="image" src="https://github.com/user-attachments/assets/5a7cfec9-38e6-45dd-a8a3-5f9c963513ab" /> |

---

# Performance Considerations

## Optimizations

- `useMemo` for filtered guide results
- Tree-shakeable Lucide icons
- Deferred Framer Motion rendering
- Lazy animation initialization

---

## Known Bottlenecks

| Issue | Impact |
|---|---|
| Large monolithic components | Increased re-render surface |
| Base64 image overhead | Larger request payloads |
| Scroll-driven JS animations | Performance cost on low-end devices |
| Unused dependencies | Larger install size |

---

# Security Considerations

## Current State

| Area | Status |
|---|---|
| Authentication | Not implemented |
| Rate limiting | Not implemented |
| Input validation | Minimal |
| XSS mitigation | Protected via React |
| CSP headers | Not configured |

---

# Tradeoffs & Limitations

| Decision | Tradeoff |
|---|---|
| Direct Gemini calls | Simpler development but weaker security |
| Base64 uploads | Simpler pipeline but larger payloads |
| Mock community data | Faster UI development without backend complexity |
| Heavy animation usage | Better visuals but higher bundle cost |

---

# Challenges Faced

- Parsing structured JSON from AI output
- Cross-device camera behavior
- Base64 payload overhead
- Framer Motion animation lifecycle management

---

# What I Learned

- Practical multimodal AI integration
- Prompt engineering techniques
- Validation of probabilistic AI outputs
- Next.js App Router architecture
- Browser camera/media lifecycle handling
- Tradeoffs in client-side PDF generation

---

# Future Scope

## Engineering Improvements

- Server-only Gemini API key
- Request rate limiting
- Shared navigation component
- React error boundaries
- Client-side image compression
- Unit testing

---

## Product Expansion

- Database integration
- Authentication system
- Persistent community features
- Identification history
- Shareable plant profiles

---

# Contributing

This is primarily a personal portfolio project, but suggestions and discussions are welcome.

```bash
# Fork repository
git checkout -b feature/your-feature-name

# Commit changes
git commit -m "feat: your feature"

# Push branch
git push origin feature/your-feature-name
```

Open a Pull Request with a clear description of the change.

---

# License

Distributed under the MIT License.

See `LICENSE` for details.

---

# Contact

**Heramb Chaudhari**

[![GitHub](https://img.shields.io/badge/GitHub-Heramb1221-black?style=for-the-badge&logo=github)](https://github.com/Heramb1221)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Heramb%20Chaudhari-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/heramb-chaudhari)

[![Email](https://img.shields.io/badge/Email-hchaudhari1221%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:hchaudhari1221@gmail.com)

---

Built to explore multimodal AI integration and modern full-stack web application architecture using Next.js and Google Gemini Vision AI.
