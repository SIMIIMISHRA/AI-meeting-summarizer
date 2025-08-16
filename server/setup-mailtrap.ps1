Write-Host "Setting up Mailtrap SMTP configuration..." -ForegroundColor Green
Write-Host ""

# Check if .env file exists
if (Test-Path ".env") {
    Write-Host ".env file already exists. Backing up to .env.backup" -ForegroundColor Yellow
    Copy-Item ".env" ".env.backup"
}

# Create new .env file with Mailtrap configuration
$envContent = @"
# Server Configuration
PORT=8080

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Email Configuration (Mailtrap Sandbox)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=1016552d98889e
EMAIL_PASS=****b631
FROM_EMAIL=noreply@yourcompany.com
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host ""
Write-Host "✅ .env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📧 Mailtrap Configuration:" -ForegroundColor Cyan
Write-Host "   Host: sandbox.smtp.mailtrap.io"
Write-Host "   Port: 2525"
Write-Host "   Username: 1016552d98889e"
Write-Host "   Password: ****b631"
Write-Host ""
Write-Host "🔑 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Replace 'your_openai_api_key_here' with your actual OpenAI API key"
Write-Host "   2. Restart the server"
Write-Host "   3. Test email configuration at: http://localhost:8080/api/test-email"
Write-Host ""
Read-Host "Press Enter to continue..."
