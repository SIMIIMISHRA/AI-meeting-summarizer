@echo off
echo 🚀 AI Meeting Summarizer - Quick Setup
echo ========================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Please run this script from the project root directory
    pause
    exit /b 1
)

echo 📁 Setting up server environment...

REM Create server .env if it doesn't exist
if not exist "server\.env" (
    echo 📝 Creating server\.env from template...
    copy "server\env.example" "server\.env"
    echo ✅ Created server\.env
    echo ⚠️  Please edit server\.env with your actual credentials:
    echo    - OPENAI_API_KEY (get from https://platform.openai.com/api-keys)
    echo    - EMAIL_HOST, EMAIL_USER, EMAIL_PASS (use Mailtrap for testing)
) else (
    echo ✅ server\.env already exists
)

echo.
echo 📁 Setting up client environment...

REM Create client .env if it doesn't exist
if not exist "client\.env" (
    echo 📝 Creating client\.env from template...
    copy "client\env.example" "client\.env"
    echo ✅ Created client\.env
    echo ⚠️  Please edit client\.env with your backend URL:
    echo    - VITE_API_URL=http://localhost:8080 (for local development)
) else (
    echo ✅ client\.env already exists
)

echo.
echo 🔧 Installing dependencies...

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install
cd ..

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
cd ..

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Edit server\.env with your OpenAI API key and email credentials
echo 2. Edit client\.env with your backend URL
echo 3. Start the backend: npm run dev:server
echo 4. Start the frontend: npm run dev:client
echo 5. Or start both: npm run dev
echo.
echo 🔗 Useful links:
echo - OpenAI API keys: https://platform.openai.com/api-keys
echo - Mailtrap (email testing): https://mailtrap.io
echo - Project README: README.md
echo.
pause
