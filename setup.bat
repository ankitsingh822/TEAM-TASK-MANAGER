@echo off
REM Team Task Manager - Setup Script for Windows

echo.
echo 🚀 Team Task Manager Setup
echo =============================

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 14+
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js installed: %NODE_VERSION%

REM Setup Backend
echo.
echo Setting up Backend...
cd backend
call npm install
echo ✓ Backend dependencies installed

REM Create .env file if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo ⚠️  .env file created. Please update with your MongoDB URI and JWT secret
)

cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend
call npm install
echo ✓ Frontend dependencies installed

REM Create .env.local if it doesn't exist
if not exist .env.local (
    (echo REACT_APP_API_URL=http://localhost:5000/api) > .env.local
    echo ✓ .env.local created
)

cd ..

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your MongoDB URI and JWT secret
echo 2. Start backend: cd backend ^&^& npm run dev
echo 3. Start frontend: cd frontend ^&^& npm start
echo.
pause
