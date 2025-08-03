# Wizz Cloud AI v1.2 Dev

## Setup
1. Add your OpenRouter API key in Vercel dashboard or `.env` file:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

2. Files go in root (no subfolders needed).
3. Deploy via Vercel as a static + serverless hybrid.

## Scripts
- `memory.js`, `rules.js`, `wizzCore.js` — browser-side logic
- `wizz.js` — serverless AI fetch handler
- `vercel.json` — defines API routes and static fallback
- `version.txt` — build version tracker

Enjoy 🚀
