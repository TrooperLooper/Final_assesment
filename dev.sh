#!/bin/bash

echo "🎮 Starting GameTime Tracker..."

# Start backend in background
echo "🚀 Starting backend (Docker + npm)..."
cd backend
docker compose up -d
npm run build
npm run dev &
BACKEND_PID=$!

# Give backend time to start
sleep 3

# Start frontend in foreground (so you can see logs)
echo "🚀 Starting frontend..."
cd ../frontend
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT