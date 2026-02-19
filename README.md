# CoachBrain (Step 1)

Minimal internal transcript ingestion tool built with **Next.js App Router + TypeScript + Supabase Postgres**.

## What this ships

- `POST /api/ingest-transcript` to ingest transcript records.
- `/ingest` form page to submit transcripts.
- `/transcripts` list page for the latest 50 entries.
- `/transcripts/[id]` detail page with all transcript fields.
- Supabase SQL migration for `transcripts` table.

## Prerequisites

- Node.js 18+
- A Supabase project

## Local setup

1. Copy environment template:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and provide:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

> Security: `SUPABASE_SERVICE_ROLE_KEY` is read only in server code and is never exposed to client components.

## Apply database schema in Supabase

1. Open your Supabase dashboard.
2. Go to **SQL Editor**.
3. Open `supabase/migrations/001_init.sql` in this repo, copy all SQL, and paste into SQL Editor.
4. Run the SQL.

## Run app locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/ingest](http://localhost:3000/ingest).

## API test with curl

```bash
curl -X POST http://localhost:3000/api/ingest-transcript \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Discovery Call with ACME",
    "raw_text": "Discussed sales goals and blockers...",
    "call_date": "2026-01-14T10:30:00Z",
    "call_type": "discovery",
    "participant_name": "Jordan Lee",
    "source": "zoom",
    "source_url": "https://example.com/recordings/123"
  }'
```

Expected response: inserted transcript JSON with `id` and timestamps.
