@echo off
echo Setting up Mailtrap SMTP configuration...
echo.

REM Check if .env file exists
if exist .env (
    echo .env file already exists. Backing up to .env.backup
    copy .env .env.backup
)

REM Create new .env file with Mailtrap configuration
echo # Server Configuration > .env
echo PORT=8080 >> .env
echo. >> .env
echo # OpenAI API Configuration >> .env
echo OPENAI_API_KEY=your_openai_api_key_here >> .env
echo. >> .env
echo # Email Configuration (Mailtrap Sandbox) >> .env
echo EMAIL_HOST=sandbox.smtp.mailtrap.io >> .env
echo EMAIL_PORT=2525 >> .env
echo EMAIL_USER=1016552d98889e >> .env
echo EMAIL_PASS=****b631 >> .env
echo FROM_EMAIL=noreply@yourcompany.com >> .env

echo.
echo ✅ .env file created successfully!
echo.
echo 📧 Mailtrap Configuration:
echo    Host: sandbox.smtp.mailtrap.io
echo    Port: 2525
echo    Username: 1016552d98889e
echo    Password: ****b631
echo.
echo 🔑 Next steps:
echo    1. Replace 'your_openai_api_key_here' with your actual OpenAI API key
echo    2. Restart the server
echo    3. Test email configuration at: http://localhost:8080/api/test-email
echo.
pause
