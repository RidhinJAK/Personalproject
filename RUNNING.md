# MindEase - Running Instructions

Complete guide to set up and run the MindEase mental health support application with local Ollama AI integration.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Ollama** - [Download here](https://ollama.ai/)
- **Git** (for cloning the repository)

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Supabase Configuration](#supabase-configuration)
3. [Ollama Setup](#ollama-setup)
4. [Running the Application](#running-the-application)
5. [Testing the AI Chat](#testing-the-ai-chat)
6. [Troubleshooting](#troubleshooting)
7. [Project Structure](#project-structure)

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your actual Supabase credentials (see next section).

---

## Supabase Configuration

### Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### Step 2: Update .env File

Open `.env` and replace the placeholder values:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### Step 3: Verify Database Tables

The database tables should already be created via migrations. To verify:

1. Go to Supabase Dashboard → **Table Editor**
2. Confirm these tables exist:
   - `user_profiles`
   - `mood_entries`
   - `journal_entries`
   - `gratitude_entries`
   - `user_streaks`
   - `user_achievements`
   - `chat_messages`
   - `feedback`

If tables don't exist, they will be created automatically when the migrations run.

---

## Ollama Setup

### Step 1: Install Ollama

**macOS/Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Windows:**
Download the installer from [ollama.ai](https://ollama.ai/)

### Step 2: Verify Ollama Installation

```bash
ollama --version
```

You should see the version number (e.g., `0.1.x`).

### Step 3: Start Ollama Service

Ollama typically starts automatically. To verify it's running:

```bash
curl http://localhost:11434/api/tags
```

You should get a JSON response (even if empty).

### Step 4: Download the Llama2 Model

The AI chat uses the `llama2` model by default:

```bash
ollama pull llama2
```

This will download ~4GB. Wait for it to complete.

**Alternative models you can use:**
- `llama2:7b` (default, balanced)
- `llama2:13b` (better quality, slower)
- `mistral` (faster, good quality)
- `phi` (lightweight, faster responses)

To use a different model, you'll need to update the edge function (see Advanced Configuration).

### Step 5: Test Ollama

```bash
ollama run llama2 "Hello, how are you?"
```

You should get a response from the model.

---

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### Production Build

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## Testing the AI Chat

### Step 1: Create an Account

1. Open the application in your browser
2. Click **Sign Up** or navigate to the auth page
3. Create an account with email and password
4. You'll be automatically logged in

### Step 2: Navigate to AI Chat

1. From the dashboard, click **AI Support Chat**
2. Or navigate directly to the AI Chat page from the menu

### Step 3: Test the Chat

Try these example prompts:

- "I'm feeling stressed about exams"
- "I need help managing anxiety"
- "I'm having trouble sleeping"
- "I feel overwhelmed with everything"

### Expected Behavior

- **If Ollama is running:** You'll get AI-generated responses from the local Llama2 model
- **If Ollama is not running:** You'll get fallback supportive responses

### Step 4: Verify Chat History

1. Send a few messages
2. Refresh the page
3. Your chat history should persist (stored in Supabase)

---

## Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution:**
- Verify your `.env` file exists and has valid values
- Restart the dev server after updating `.env`
- Check that variable names start with `VITE_` prefix

### Issue: AI chat not responding / fallback messages only

**Solution:**
1. Verify Ollama is running:
   ```bash
   curl http://localhost:11434/api/tags
   ```
2. Check if the model is downloaded:
   ```bash
   ollama list
   ```
3. If model is missing, download it:
   ```bash
   ollama pull llama2
   ```
4. Check browser console for errors (F12 → Console tab)

### Issue: "Unauthorized" error in AI chat

**Solution:**
- Ensure you're logged in
- Check Supabase authentication is working
- Verify your Supabase anon key is correct

### Issue: Database tables don't exist

**Solution:**
- Migrations should run automatically
- Verify in Supabase Dashboard → Table Editor
- Check Supabase logs for migration errors

### Issue: Ollama connection refused

**Solution:**
1. Check if Ollama is running:
   ```bash
   ps aux | grep ollama
   ```
2. Restart Ollama:
   ```bash
   ollama serve
   ```
3. For Docker setups, ensure `OLLAMA_API_URL=http://host.docker.internal:11434`

### Issue: Slow AI responses

**Solution:**
- Use a smaller model: `ollama pull phi`
- Update edge function to use `phi` instead of `llama2`
- Ensure sufficient RAM (Llama2 needs ~8GB)

---

## Project Structure

```
project/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/            # React contexts (Auth, etc.)
│   ├── lib/                 # Library configurations (Supabase)
│   ├── pages/               # Application pages
│   ├── services/            # Service modules
│   │   └── ollamaService.ts # Ollama integration for frontend
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── supabase/
│   ├── functions/
│   │   └── ai-chat/         # Edge function for AI chat
│   │       └── index.ts     # Ollama integration for backend
│   └── migrations/          # Database schema migrations
├── .env                     # Environment variables (create from .env.example)
├── .env.example             # Example environment configuration
├── package.json             # Dependencies and scripts
└── RUNNING.md              # This file
```

---

## Advanced Configuration

### Using a Different Ollama Model

1. Download the model:
   ```bash
   ollama pull mistral
   ```

2. Update the edge function (`supabase/functions/ai-chat/index.ts`):
   ```typescript
   model: 'mistral',  // Change from 'llama2'
   ```

3. Redeploy the edge function (handled automatically)

### Frontend Direct Ollama Testing

You can test Ollama directly from the frontend using the service:

```typescript
import { chatWithOllama, checkOllamaStatus } from './services/ollamaService';

// Check if Ollama is available
const isAvailable = await checkOllamaStatus();

// Send a message
const response = await chatWithOllama([
  { role: 'user', content: 'Hello!' }
]);
```

### Customizing AI Behavior

Edit the system message in `supabase/functions/ai-chat/index.ts`:

```typescript
const systemMessage = {
  role: 'system',
  content: `Your custom instructions here...`
};
```

---

## Features Overview

### Core Features
- User authentication (email/password)
- Mood tracking with visualizations
- Journal entries
- Gratitude journal
- AI-powered mental health chat
- Achievement system
- Daily streaks
- Breathing exercises

### AI Chat Features
- Local Ollama integration (privacy-focused)
- Conversation history persistence
- Compassionate mental health support
- Fallback responses when AI unavailable
- Crisis support information

---

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review browser console for errors (F12)
3. Check Ollama logs: `ollama logs`
4. Verify Supabase dashboard for backend errors

---

## Security Notes

- Never commit `.env` file to version control
- Keep your Supabase keys secure
- The anon key is safe for frontend use (RLS policies protect data)
- AI chat runs locally via Ollama (no data sent to external APIs)
- All user data is protected with Row Level Security (RLS)

---

## Next Steps

Once everything is running:

1. Explore all features (Dashboard, Journal, Mood Tracker, etc.)
2. Test the AI chat thoroughly
3. Review the database structure in Supabase
4. Customize the AI system prompt for your use case
5. Add more Ollama models for different response styles

**Enjoy using MindEase!**
