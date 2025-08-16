#!/bin/bash

echo "🚀 AI Meeting Summarizer - Quick Setup"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📁 Setting up server environment..."

# Create server .env if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env from template..."
    cp server/env.example server/.env
    echo "✅ Created server/.env"
    echo "⚠️  Please edit server/.env with your actual credentials:"
    echo "   - OPENAI_API_KEY (get from https://platform.openai.com/api-keys)"
    echo "   - EMAIL_HOST, EMAIL_USER, EMAIL_PASS (use Mailtrap for testing)"
else
    echo "✅ server/.env already exists"
fi

echo ""
echo "📁 Setting up client environment..."

# Create client .env if it doesn't exist
if [ ! -f "client/.env" ]; then
    echo "📝 Creating client/.env from template..."
    cp client/env.example client/.env
    echo "✅ Created client/.env"
    echo "⚠️  Please edit client/.env with your backend URL:"
    echo "   - VITE_API_URL=http://localhost:8080 (for local development)"
else
    echo "✅ client/.env already exists"
fi

echo ""
echo "🔧 Installing dependencies..."

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit server/.env with your OpenAI API key and email credentials"
echo "2. Edit client/.env with your backend URL"
echo "3. Start the backend: npm run dev:server"
echo "4. Start the frontend: npm run dev:client"
echo "5. Or start both: npm run dev"
echo ""
echo "🔗 Useful links:"
echo "- OpenAI API keys: https://platform.openai.com/api-keys"
echo "- Mailtrap (email testing): https://mailtrap.io"
echo "- Project README: README.md"
