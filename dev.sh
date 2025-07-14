#!/bin/bash

# BHABIT CBMOONERS - Development Server Starter
# This script starts both frontend and backend development servers

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to cleanup background processes
cleanup() {
    print_status "Shutting down servers..."
    jobs -p | xargs -r kill
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

print_status "🐰 Starting BHABIT CBMOONERS development servers..."

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    print_error "Virtual environment not found. Please run ./setup.sh first."
    exit 1
fi

# Check if backend dependencies are installed
print_status "Checking backend dependencies..."
source .venv/bin/activate
if ! python -c "import flask" 2>/dev/null; then
    print_error "Backend dependencies not installed. Please run ./setup.sh first."
    exit 1
fi

# Check if frontend dependencies are installed
print_status "Checking frontend dependencies..."
if [ ! -d "frontend/node_modules" ]; then
    print_error "Frontend dependencies not installed. Please run ./setup.sh first."
    exit 1
fi

# Start backend server in background
print_status "Starting backend server on http://localhost:5001..."
cd backend
source ../.venv/bin/activate
python app.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server in background
print_status "Starting frontend server on http://localhost:5173..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

print_success "🚀 Both servers are starting up..."
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:5001"
echo ""
echo "📊 API Health: http://localhost:5001/api"
echo "🏥 Health Check: http://localhost:5001/health"
echo ""
print_success "Press Ctrl+C to stop both servers"

# Wait for background processes
wait
