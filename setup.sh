#!/bin/bash

# Team Task Manager - Setup Script

echo "🚀 Team Task Manager Setup"
echo "============================="

# Check Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 14+"
    exit 1
fi

echo "✓ Node.js installed: $(node --version)"

# Setup Backend
echo ""
echo "Setting up Backend..."
cd backend
npm install
echo "✓ Backend dependencies installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  .env file created. Please update with your MongoDB URI and JWT secret"
fi

cd ..

# Setup Frontend
echo ""
echo "Setting up Frontend..."
cd frontend
npm install
echo "✓ Frontend dependencies installed"

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local
    echo "✓ .env.local created"
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB URI and JWT secret"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm start"
echo ""
