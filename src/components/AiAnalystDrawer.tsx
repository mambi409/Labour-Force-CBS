import React, { useState } from 'react';
import { LabourDataPoint, ChatMessage } from '../types';
import { Bot, X, Send, Sparkles, Loader2 } from 'lucide-react';

interface AiAnalystDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: LabourDataPoint[];
}

export const AiAnalystDrawer: React.FC<AiAnalystDrawerProps> = ({ isOpen, onClose, dataset }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am your AI Labor Economics Assistant for Curacao. Ask me anything about the 2016–2025 labour force proportions, COVID-19 unemployment spikes, or future economic outlooks!",
      timestamp: '10:00 AM',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const promptToSubmit = queryText || inputPrompt;
    if (!promptToSubmit.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSubmit,
          dataset,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to fetch analysis');
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: resData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('AI Analysis error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⚠️ Analysis error: ${err.message || 'Unable to connect to AI server.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const QUICK_PROMPTS = [
    'Summarize key proportional shifts in Curacao between 2016 and 2025',
    'Why did unemployment peak at 8.91% in 2020 and drop to 2.44% in 2025?',
    'Evaluate the correlation between total population recovery and lower unemployment',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-lg bg-white text-slate-800 h-full flex flex-col shadow-2xl border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header matching Sleek theme */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              AI
            </div>
            <div>
              <h2 className="font-bold text-slate-800 uppercase text-xs tracking-widest flex items-center gap-1.5">
                AI Analyst Assistant
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              </h2>
              <span className="text-xs text-slate-400">Gemini 3.6 Flash Server-Side</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/50 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Suggested Topics:</span>
          <div className="flex flex-col gap-1">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                disabled={isLoading}
                className="text-left text-[11px] p-2 bg-white hover:bg-indigo-50/60 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer line-clamp-1 font-medium"
              >
                💡 {qp}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Feed formatted like Sleek Chat UI */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-white">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-slate-900 text-white'
                }`}
              >
                {msg.sender === 'user' ? 'YOU' : 'AI'}
              </div>

              <div className={`max-w-[78%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="text-xs font-bold mb-1 text-slate-500 flex items-center gap-2">
                  <span>{msg.sender === 'user' ? 'User' : 'Assistant'}</span>
                  <span className="font-normal text-slate-300 text-[10px]">{msg.timestamp}</span>
                </div>
                <div
                  className={`p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-100 text-slate-800 rounded-2xl rounded-tr-none'
                      : 'bg-indigo-600 text-white rounded-2xl rounded-tl-none font-sans whitespace-pre-wrap shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                AI
              </div>
              <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span>Analyzing Curacao Labour Force Dataset...</span>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask AI analyst about Curacao labour force data..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 placeholder-slate-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

