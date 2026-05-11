#!/bin/bash

# Ensure Redis URL is available for the Go bridge
export REDIS_URL=${REDIS_URL:-"redis://localhost:6379/0"}

# Start Go Bridge in background
cd backend/go
go run main.go &
GO_PID=$!

# Start FastAPI Brain in foreground
cd ../python
# On Render, we'll install dependencies via build command, so no venv needed
python3 -m pip install -r requirements.txt
python3 -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
