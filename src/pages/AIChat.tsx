import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Home, Sparkles, Bot, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';


interface AIChatProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export default function AIChat({ onNavigate }: AIChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadChatHistory();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(50);

    if (data) {
      setMessages(data);
    }
    setLoadingHistory(false);
  };

  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!user) return;

    const { data } = await supabase
      .from('chat_messages')
      .insert([
        {
          user_id: user.id,
          role,
          content
        }
      ])
      .select()
      .single();

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    const userMsg = await saveMessage('user', userMessage);
    if (userMsg) {
      setMessages([...messages, userMsg]);
    }

    try {
      const conversationHistory = [...messages, { role: 'user' as const, content: userMessage }]
        .slice(-10)
        .map(m => ({ role: m.role, content: m.content }));

     const response = await fetch('http://127.0.0.1:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'phi3', // make sure this model exists in Ollama
    prompt: conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')
  })
});

if (!response.ok) {
  throw new Error(`Ollama request failed: ${response.statusText}`);
}

const data = await response.json();
const localResponse = data.response || "Sorry, I couldn’t think of anything to say.";


      const assistantMsg = await saveMessage('assistant', localResponse);
      if (assistantMsg) {
        setMessages(prev => [...prev, assistantMsg]);
      }
    } catch (error) {
      console.error('Chat error:', error);

      const fallbackMessage = "I'm here to support you. What's on your mind today?";
      const assistantMsg = await saveMessage('assistant', fallbackMessage);
      if (assistantMsg) {
        setMessages(prev => [...prev, assistantMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "I'm feeling stressed about exams",
    "I need help managing anxiety",
    "I'm having trouble sleeping",
    "I feel overwhelmed with everything"
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  if (loadingHistory) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative h-[calc(100vh-4rem)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MessageCircle className="w-9 h-9 mr-3 text-teal-600" />
            AI Support Chat
          </h1>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl flex flex-col h-[calc(100%-6rem)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="relative inline-block mb-6">
                  <Bot className="w-20 h-20 text-teal-600" />
                  <Sparkles className="w-8 h-8 text-cyan-500 absolute -top-2 -right-2 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Hi! I'm here to support you
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Feel free to share what's on your mind. I'm here to listen and help with stress, anxiety, or anything you'd like to talk about.
                </p>

                <div className="space-y-3 max-w-md mx-auto">
                  <p className="text-sm font-medium text-gray-700">Try asking:</p>
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="w-full p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl text-left hover:shadow-md transition-all text-gray-700 hover:from-teal-100 hover:to-cyan-100"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <UserIcon className="w-6 h-6 text-white" />
                    ) : (
                      <Bot className="w-6 h-6 text-white" />
                    )}
                  </div>

                  <div
                    className={`px-5 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-cyan-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.created_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="px-5 py-3 rounded-2xl bg-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Type your message..."
                className="flex-1 px-5 py-3 rounded-full border-2 border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-3">
              This AI is here to support you, but it's not a replacement for professional help. If you're in crisis, please contact a mental health professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
