import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI SDK server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for AI Labour Market Analysis & Chat
app.post('/api/analyze', async (req, res) => {
  try {
    if (!aiClient) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY environment variable is not configured. AI feature requires API key.',
      });
    }

    const { prompt, dataset } = req.body;

    const systemInstruction = `You are an expert labor economics analyst specializing in Caribbean macroeconomics and demographic statistics, specifically for Curacao (2016-2025 data).
The user is viewing an interactive proportional dashboard with the following Curacao Labour Force Dataset:
${JSON.stringify(dataset || [], null, 2)}

Provide clear, professional, concise, data-driven analysis and insights. Highlight key structural shifts (such as the 2020 COVID peak unemployment at ~8.91% vs 2025 historical low of ~2.44% and population recovery to ~156.9k).
Use bullet points and bold formatting where appropriate.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt || 'Provide a concise labor force proportional analysis for Curacao between 2016 and 2025.',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text || 'No response generated.' });
  } catch (error: any) {
    console.error('Error in /api/analyze:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate AI analysis' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: !!apiKey });
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
