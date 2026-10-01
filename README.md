# Briefly — Personal News Intelligence

Calm, story-first daily briefing. One evolving story card per event, progressive disclosure, fact-level no-repeat memory, and a single clearly-labelled possible future — never speculative branches.

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Local seed data (`src/lib/data/stories.ts`, 12 stories)
- `localStorage` for theme, session scope, saved stories, reading history, seen facts
- No API keys, scraping, or auth

## Run locally
```bash
cd briefly
npm install
npm run dev
# open http://localhost:3000
```

## Build
```bash
npm run build
npm start
```

## Deploy to Vercel
1. Push this folder to a Git repo (or drag-import in Vercel dashboard).
2. In Vercel: **New Project → Import** the repo.
3. Framework preset: **Next.js**. Build command: `npm run build`. Output: `.next`.
4. No environment variables needed. Deep links work out of the box with App Router.

## Routes
- `/` Daily Briefing · `/catch-up` · `/explore` · `/story/[storyId]` · `/story/[storyId]/evolution` · `/saved` · `/interests` · `/settings` · `/about`

## Key logic (`src/lib/utils/storage.ts`)
- `getUnseenFacts` / `getStoryUpdateView` / `markFactAsSeen` / `rankStories`
- Session scope (`sessionScope`) never mutates permanent interests unless "Follow" is tapped.
- Fact IDs are stable; Quick Take marks seen on view, deeper levels mark seen only when expanded.
