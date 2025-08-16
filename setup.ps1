Write-Host "🚀 AI Meeting Summarizer - Quick Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Please run this script from the project root directory" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "📁 Setting up server environment..." -ForegroundColor Yellow

# Create server .env if it doesn't exist
if (-not (Test-Path "server\.env")) {
    Write-Host "📝 Creating server\.env from template..." -ForegroundColor Green
    Copy-Item "server\env.example" "server\.env"
    Write-Host "✅ Created server\.env" -ForegroundColor Green
    Write-Host "⚠️  Please edit server\.env with your actual credentials:" -ForegroundColor Yellow
    Write-Host "   - OPENAI_API_KEY (get from https://platform.openai.com/api-keys)" -ForegroundColor White
    Write-Host "   - EMAIL_HOST, EMAIL_USER, EMAIL_PASS (use Mailtrap for testing)" -ForegroundColor White
} else {
    Write-Host "✅ server\.env already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "📁 Setting up client environment..." -ForegroundColor Yellow

# Create client .env if it doesn't exist
if (-not (Test-Path "client\.env")) {
    Write-Host "📝 Creating client\.env from template..." -ForegroundColor Green
    Copy-Item "client\env.example" "client\.env"
    Write-Host "✅ Created client\.env" -ForegroundColor Green
    Write-Host "⚠️  Please edit client\.env with your backend URL:" -ForegroundColor Yellow
    Write-Host "   - VITE_API_URL=http://localhost:8080 (for local development)" -ForegroundColor White
} else {
    Write-Host "✅ client\.env already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔧 Installing dependencies..." -ForegroundColor Yellow

# Install server dependencies
Write-Host "📦 Installing server dependencies..." -ForegroundColor Blue
Set-Location "server"
npm install
Set-Location ".."

# Install client dependencies
Write-Host "📦 Installing client dependencies..." -ForegroundColor Blue
Set-Location "client"
npm install
Set-Location ".."

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit server\.env with your OpenAI API key and email credentials" -ForegroundColor White
Write-Host "2. Edit client\.env with your backend URL" -ForegroundColor White
Write-Host "3. Start the backend: npm run dev:server" -ForegroundColor White
Write-Host "4. Start the frontend: npm run dev:client" -ForegroundColor White
Write-Host "5. Or start both: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Useful links:" -ForegroundColor Cyan
Write-Host "- OpenAI API keys: https://platform.openai.com/api-keys" -ForegroundColor White
Write-Host "- Mailtrap (email testing): https://mailtrap.io" -ForegroundColor White
Write-Host "- Project README: README.md" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"
