# API Model — Frontend + Backend (RAG Chat)

This project merges a **React frontend** (Australian Immigration–style chat UI) with a **Python RAG backend** (PDF + Gemini). The chat page talks to the backend over HTTP.

## Quick start (run both together)

### 1. Backend (RAG API)

```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env` with your Gemini key:

```env
GOOGLE_API_KEY=your-google-api-key
```

Populate the vector DB (first time or after adding PDFs):

```bash
python populate_database.py --reset
```

Start the API server (port 4000):

```bash
python api.py
```

Or with uvicorn:

```bash
uvicorn api:app --host 0.0.0.0 --port 4000 --reload
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on port 5173 (or the next free port). Vite proxies `/api` to `http://localhost:4000`, so the chat page uses `/api/chat` and hits your backend.

### 3. Use the app

Open **http://localhost:5173** and use the Chat page. Questions are sent to the backend RAG API; answers come from your PDFs + Gemini.

## Layout

- **`backend/`** — RAG (ChromaDB + Gemini), CLI chat, and HTTP API (`api.py`).
- **`frontend/`** — React + Vite + Tailwind; Chat page calls `POST /api/chat`.

## Env (frontend)

Optional in `frontend/.env`:

- `VITE_API_URL` — Backend base URL.  
  - Unset in dev → use relative `/api` (Vite proxy to 4000).  
  - Set in prod, e.g. `VITE_API_URL=https://your-api.example.com`.

## Env (backend)

In `backend/.env`:

- `GOOGLE_API_KEY` — Required for Gemini.
- `PORT` — Optional; default `4000`.
