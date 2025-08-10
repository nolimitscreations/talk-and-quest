# Talk & Quest (MVP + iPad mic + PWA)
A calm, kid-friendly speech + reading practice web app for Samuel & Spencer.

## Run locally
1. Install Node.js 18+
2. In a terminal:
```bash
npm install
npm run dev
```
3. Open http://localhost:3000

## Azure Speech (iPad-ready mic)
This project includes an API route that securely mints a short-lived token for the browser mic.
1. Create an Azure Speech resource (Key & Region).
2. In your Vercel project (or `.env.local` for local testing), set:
```
AZURE_SPEECH_KEY=YOUR_KEY
AZURE_SPEECH_REGION=YOUR_REGION   # e.g., eastus, westus2, etc.
```
3. Restart the dev server. In the app, use the **🎙️ Say it (Azure)** button.
- On iPad/Safari you’ll now get working speech recognition (served over HTTPS when deployed).

## PWA (Add to Home Screen)
- `public/manifest.json` + `public/sw.js` make this installable.
- On iPad/iPhone: open your deployed URL in Safari → Share → Add to Home Screen.
- Works offline for previously visited pages/assets.

## What’s inside
- Next.js (Pages router) + simple CSS
- Local-first progress (localStorage only)
- Activities:
  - Repeat After Me (Azure mic + fallback) + TTS
  - Sight-Word Sprint
  - Fluency Story + gentle questions
- Sticker rewards for finishing activities
- Parent/SLP dashboard with tiny trends

## Content
Edit `data/quests.json` to add words, stories, questions, rewards.

## Deploy (Vercel)
- Push to GitHub → Import on Vercel → Add Environment Variables:
  - `AZURE_SPEECH_KEY`
  - `AZURE_SPEECH_REGION` (e.g., `eastus`)
- Redeploy → Visit the HTTPS URL on your iPad → Add to Home Screen.

## Notes
- If Azure is not configured, the Azure mic button will alert, and the fallback mic (Web Speech) will still be visible (best in Chrome desktop). Kids can always practice out loud.
- Nothing is uploaded or stored server-side except the temporary token exchange with Azure.

## Profiles & Quiet Mode
- Use the profile switcher in the header (Samuel / Spencer / Guest). Each profile has separate local progress.
- Toggle **Quiet Mode** in the header for calmer pacing (slower TTS, reduced prompts).

## Practice Builder
- Visit `/builder` to generate a custom session from target sounds and 4th‑grade sight words.
- Copy the JSON into `data/quests.json` if you want it to appear on the Home screen permanently.

## Data files you can edit
- `data/targets.json` — target sound lists (R, L, S, SH, CH, TH).
- `data/sightwords_grade4.json` — 4th‑grade sight words.
