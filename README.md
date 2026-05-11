# GITCODE

**GITCODE** (formerly AgentForge) is a premium, realtime AI software engineering operating system where code, execution, repositories, terminals, and AI reasoning exist inside one unified live environment.

## Design Philosophy
- **Operational**: Focuses on execution visibility and realtime streaming activity.
- **Premium**: Minimal, dense, and elegant UI inspired by Linear, Cursor, and Vercel.
- **Unified**: Repositories, terminals, and AI reasoning are synchronized in a single live environment.

## Technical Stack
- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State**: Zustand, TanStack Query
- **Editor**: Monaco Editor
- **Terminal**: xterm.js
- **UI Primitives**: Radix UI, Lucide React

## Backend Architecture
- **FastAPI (Python)**: Handles AI orchestration, workspace lifecycle, and websocket management.
- **Go Bridge**: Manages PTY sessions, terminal streams, and realtime execution monitoring.
- **Vercel Sandbox SDK (@beta)**: Provides isolated Linux MicroVMs with persistent filesystem state.
- **Neon Database**: Serverless PostgreSQL for persisting workspace and execution history.
- **Redis**: High-speed event bus for realtime execution streaming.

### Backend Setup
```bash
# Install Python dependencies
cd backend/python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start services
./start_backend.sh
```

## Configuration
Copy `.env.example` to `.env` and provide the following:
- **Vercel**: `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, `VERCEL_PROJECT_ID` (Obtain from Vercel Dashboard/Settings).
- **Neon**: `DATABASE_URL` (Obtain from Neon Console).
- **Redis**: `REDIS_URL` (e.g., Upstash or local Redis).
- **GitHub**: `GIT_ACCESS_TOKEN` (Optional, for private repository access).
