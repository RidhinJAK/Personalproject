import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import type { Message } from '../types';

export default function Demo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm MindEase, your supportive AI companion. I'm here to listen and help you navigate whatever you're feeling today. How are you doing?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('stress') || lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return "I hear that you're feeling stressed about exams. That's completely valid - academic pressure can be overwhelming. Would you like to try a quick breathing exercise together, or would you prefer to talk about what's specifically worrying you?";
    }

    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
      return "Thank you for sharing that you're feeling anxious. Anxiety can feel really intense, but remember that you're not alone in this. Can you tell me more about what's triggering these feelings? Sometimes naming what we're experiencing helps us understand it better.";
    }

    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
      return "I'm really glad you felt comfortable sharing that with me. Feeling sad or down is a natural part of being human, though I know that doesn't make it easier. Is there something specific that's been weighing on you, or has this been more of a general feeling?";
    }

    if (lowerMessage.includes('friend') || lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
      return "Feeling lonely or having challenges with friendships can be really difficult, especially during school years. You deserve meaningful connections. Would you like to explore what's happening in your relationships, or would strategies for building new connections be more helpful right now?";
    }

    if (lowerMessage.includes('breathing') || lowerMessage.includes('calm') || lowerMessage.includes('relax')) {
      return "Great idea! Let's do a simple breathing exercise together. Try this: Breathe in slowly for 4 counts, hold for 4 counts, breathe out for 4 counts, and hold again for 4 counts. This is called box breathing, and it can help calm your nervous system. Try it a few times and let me know how you feel.";
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('need')) {
      return "I'm here to support you. You can talk to me about anything that's on your mind - stress, anxiety, relationships, school, or just how you're feeling today. I can also guide you through breathing exercises or suggest coping strategies. What would be most helpful for you right now?";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! I'm here whenever you need support. Remember, taking care of your mental health is a sign of strength, not weakness. Is there anything else you'd like to talk about today?";
    }

    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Take care of yourself! Remember that I'm here 24/7 whenever you need support. You're doing great by prioritizing your mental wellness. See you soon!";
    }

    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hello! It's good to hear from you. What's on your mind today? I'm here to listen and support you however I can.";
    }

    return "I appreciate you sharing that with me. It takes courage to open up about what you're experiencing. Could you tell me a bit more about what you're going through? I'm here to listen without judgment.";
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <section className="bg-gradient-to-br from-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Try MindEase Demo
          </h1>
          <p className="text-lg text-gray-700">
            Experience a supportive conversation with our AI companion
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 350px)', minHeight: '500px' }}>
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">MindEase AI Companion</h3>
                  <p className="text-teal-100 text-sm">Always here to listen</p>
                </div>
              </div>
            </div>

            <div className="h-full flex flex-col" style={{ height: 'calc(100% - 72px)' }}>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'ai' ? 'bg-teal-100' : 'bg-blue-100'
                      }`}>
                        {message.sender === 'ai' ? (
                          <Bot className="w-5 h-5 text-teal-600" />
                        ) : (
                          <User className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'ai'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-teal-100">
                        <Bot className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <Loader className="w-5 h-5 text-gray-600 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex items-end space-x-2">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind..."
                    className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    rows={1}
                    style={{ maxHeight: '120px' }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-3 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800 text-center">
              <strong>Demo Note:</strong> This is a simplified demonstration. The full app uses more advanced AI
              and stores conversations securely to provide personalized support over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
