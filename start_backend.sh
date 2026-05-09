#!/bin/bash

# Start Go Bridge
cd backend/go
go run main.go &
GO_PID=$!

# Start FastAPI Brain
cd ../python
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 &
PY_PID=$!

echo "GITCODE Backend Services Started."
echo "Go Bridge PID: $GO_PID"
echo "Python Brain PID: $PY_PID"

# Wait for both
wait $GO_PID $PY_PID
