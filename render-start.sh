#!/bin/bash
set -e

# Start Go Bridge
cd backend/go
go run main.go &
GO_PID=$!

# Start FastAPI Brain
cd ../python
# Dependencies should be installed in the build step
python3 -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
