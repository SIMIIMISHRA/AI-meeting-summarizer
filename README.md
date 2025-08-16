# 🤖 AI Meeting Summarizer & Sharer

A full-stack AI-powered application that summarizes meeting notes and shares them via email. Built with React, Node.js, and OpenAI API.

## ✨ Features

- **📄 Text Upload**: Upload meeting transcripts or paste text directly
- **🎯 Custom Instructions**: Specify how you want the summary (e.g., "Summarize in bullet points for executives")
- **🤖 AI-Powered Summaries**: Generate structured summaries using OpenAI GPT-4o-mini
- **✏️ Editable Summaries**: Edit the AI-generated summary before sending
- **📧 Email Sharing**: Send summaries to multiple recipients via email
- **📱 Responsive Design**: Works perfectly on all devices

## 🏗️ Tech Stack

### Frontend
- **React 19** with Vite
- **Modern CSS** with animations and responsive design
- **Dark theme** with aesthetic animations

### Backend
- **Node.js** with Express
- **OpenAI API** for AI summarization
- **Nodemailer** for email functionality
- **Mailtrap** for email testing

### Infrastructure
- **Environment-based configuration**
- **Error handling** and validation
- **RESTful API** design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API key
- Mailtrap account (for email testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd meeting-summarizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. **Environment Setup**
   ```bash
   cd server
   cp env.example .env
   ```

4. **Configure your .env file**
   ```env
   # Server Configuration
   PORT=8080
   
   # OpenAI API Configuration
   OPENAI_API_KEY=your_actual_openai_api_key_here
   
   # Email Configuration (Mailtrap Sandbox)
   EMAIL_HOST=sandbox.smtp.mailtrap.io
   EMAIL_PORT=2525
   EMAIL_USER=your_mailtrap_username
   EMAIL_PASS=your_mailtrap_password
   FROM_EMAIL=noreply@yourcompany.com
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

## 📖 How to Use

1. **Upload Transcript**: Upload a .txt file or paste meeting notes
2. **Custom Instructions**: Enter how you want the summary formatted
3. **Generate Summary**: Click to create AI-powered summary
4. **Edit Summary**: Modify the generated summary as needed
5. **Share via Email**: Enter recipient emails and send

## 🌐 API Endpoints

- `POST /api/summarize` - Generate AI summary
- `POST /api/send-email` - Send summary via email
- `GET /api/health` - Server health check
- `GET /api/test-email` - Test email configuration

## 🚀 Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically

#### Backend Deployment (Railway)
1. Connect GitHub repo to [Railway](https://railway.app)
2. Set environment variables
3. Deploy Node.js app

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend Deployment (Netlify)
1. Connect GitHub repo to [Netlify](https://netlify.com)
2. Build command: `cd client && npm run build`
3. Publish directory: `client/dist`

#### Backend Deployment (Render)
1. Connect GitHub repo to [Render](https://render.com)
2. Set environment variables
3. Deploy as Web Service

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | ✅ |
| `EMAIL_HOST` | SMTP host (Mailtrap) | ✅ |
| `EMAIL_PORT` | SMTP port (2525) | ✅ |
| `EMAIL_USER` | SMTP username | ✅ |
| `EMAIL_PASS` | SMTP password | ✅ |
| `FROM_EMAIL` | Sender email address | ✅ |

## 📱 Screenshots

The application features a modern, responsive interface with:
- Dark aesthetic theme
- Smooth animations
- Mobile-first design
- Professional UI/UX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment variables
3. Ensure OpenAI API key is valid
4. Check Mailtrap configuration

## 🎯 Project Goals

This project demonstrates:
- Full-stack development skills
- AI integration capabilities
- Modern web technologies
- Professional application architecture
- Deployment and DevOps knowledge

---

**Built with ❤️ using React, Node.js, and OpenAI API** 