#!/bin/bash

# Navigate to the backend directory and start the backend server
if [ -f "backend/app.py" ]; then
  echo "Starting backend server..."
  python "backend/app.py" &
else
  echo "Backend server not found! Please ensure 'backend/app.py' exists."
  exit 1
fi

# Navigate to the frontend directory and start the frontend server
if [ -f "frontend/start_frontend.sh" ]; then
  echo "Starting frontend server..."
  sh "frontend/start_frontend.sh" &
else
  echo "Frontend startup script not found! Please ensure 'frontend/start_frontend.sh' exists."
  exit 1
fi

wait
