#!/bin/bash

# BHABIT CBMOONERS - Development Setup Script
# This script sets up the complete development environment

set -e  # Exit on any error

echo "🐰 Setting up BHABIT CBMOONERS development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Python 3.13+ is available
print_status "Checking Python version..."
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.13 or higher."
    exit 1
fi

PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
print_success "Python version: $PYTHON_VERSION"

# Check if Node.js is available
print_status "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ or higher."
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js version: $NODE_VERSION"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "npm version: $NPM_VERSION"

# Create Python virtual environment
print_status "Creating Python virtual environment..."
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
    print_success "Virtual environment created at .venv/"
else
    print_warning "Virtual environment already exists"
fi

# Activate virtual environment and install Python dependencies
print_status "Installing Python dependencies..."
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
print_success "Python dependencies installed"

# Install Node.js dependencies for frontend
print_status "Installing frontend dependencies..."
cd frontend
npm install
cd ..
print_success "Frontend dependencies installed"

# Install Node.js dependencies for backend (if any)
print_status "Installing backend npm dependencies..."
cd backend
npm install
cd ..
print_success "Backend npm dependencies installed"

# Create environment files if they don't exist
print_status "Setting up environment files..."

# Backend environment
if [ ! -f "backend/.env.development" ] && [ -f "backend/.env.example" ]; then
    cp backend/.env.example backend/.env.development
    print_success "Created backend/.env.development"
else
    print_warning "Backend environment file already exists or example not found"
fi

# Frontend environment
if [ ! -f "frontend/.env" ] && [ -f "frontend/.env.example" ]; then
    cp frontend/.env.example frontend/.env
    print_success "Created frontend/.env"
else
    print_warning "Frontend environment file already exists or example not found"
fi

# Make scripts executable
chmod +x start_app.sh
chmod +x frontend/start_frontend.sh
if [ -f "backend/start_backend.sh" ]; then
    chmod +x backend/start_backend.sh
fi

print_success "Setup completed successfully! 🎉"
echo ""
echo "🚀 To start the development servers:"
echo ""
echo "1. Backend (in one terminal):"
echo "   source .venv/bin/activate"
echo "   cd backend"
echo "   python app.py"
echo ""
echo "2. Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3. Or use the convenience script:"
echo "   ./start_app.sh"
echo ""
echo "📱 Frontend will be available at: http://localhost:5173"
echo "🔧 Backend will be available at: http://localhost:5001"
echo ""
print_success "Happy coding! 🐰"
