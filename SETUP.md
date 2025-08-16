# Quick Setup Guide

## 🚀 Get Running in 5 Minutes

### 1. Set Up OpenAI API Key

You need an OpenAI API key to use the AI summarization feature:

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up/login and create an API key
3. Copy the key (starts with `sk-...`)

### 2. Configure Environment Variables

**For Backend (Server):**
1. Navigate to the `server` folder
2. Create a file called `.env` (copy from `config.temp`)
3. Replace `your_openai_api_key_here` with your actual API key

**For Frontend (Client):**
1. Navigate to the `client` folder  
2. Create a file called `.env` (copy from `env.example`)
3. The default `http://localhost:8080` should work for local development

### 3. Start the App

From the root directory, run:
```bash
npm run dev
```

This will start both:
- Backend server on http://localhost:8080
- Frontend on http://localhost:5173

### 4. Test the App

1. Open http://localhost:5173 in your browser
2. Paste some meeting text or upload a .txt file
3. Add a custom instruction like "Summarize in bullet points"
4. Click "Generate Summary"
5. Edit the summary if needed
6. Test email functionality (you'll need email credentials)

## 🔧 Email Setup (Optional for Testing)

For email functionality, you can use:

**Mailtrap (Free Testing):**
- Sign up at [mailtrap.io](https://mailtrap.io)
- Get SMTP credentials from your inbox
- Update the `.env` file with these credentials

**Gmail (Real Emails):**
- Enable 2-factor authentication
- Generate an app password
- Use Gmail SMTP settings

## 🚨 Troubleshooting

**Server won't start:**
- Check if `.env` file exists in `server/` folder
- Verify `OPENAI_API_KEY` is set correctly
- Make sure port 8080 is not in use

**Frontend can't connect to backend:**
- Ensure backend is running on port 8080
- Check `VITE_API_URL` in client `.env` file
- Verify CORS is enabled (should be automatic)

**API errors:**
- Verify OpenAI API key is valid
- Check if you have credits in your OpenAI account
- Ensure the API key has access to GPT-4 models

## 📱 What You Can Do Now

✅ **Without API Key:**
- View the UI
- Navigate between sections
- Test file upload interface

✅ **With API Key:**
- Generate AI summaries
- Edit summaries
- Send emails
- Full end-to-end functionality

## 🚀 Next Steps

1. Get your OpenAI API key
2. Set up the `.env` files
3. Test the app locally
4. Deploy to production (see DEPLOYMENT.md)
5. Submit your assignment!

## 💡 Pro Tips

- Start with a short meeting transcript for testing
- Use Mailtrap for email testing (won't send real emails)
- The app works offline for UI testing
- Check the browser console for detailed error messages

