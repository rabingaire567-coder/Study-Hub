import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_CONFIG, SYSTEM_PROMPT } from '../config/ai';
import { storage } from '../utils/storage';
import { ChatMessage } from '../types';

export default function AITutor() {
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model] = useState(AI_CONFIG.defaultModel);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedKey = storage.get<string>(AI_CONFIG.apiKeyStorageKey, '');
    if (savedKey) {
      setApiKey(savedKey);
      setHasApiKey(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      storage.set(AI_CONFIG.apiKeyStorageKey, apiKey.trim());
      setHasApiKey(true);
    }
  };

  const clearApiKey = () => {
    storage.remove(AI_CONFIG.apiKeyStorageKey);
    setHasApiKey(false);
    setApiKey('');
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !hasApiKey) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const conversationHistory = [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'I understand. I am Study Hub AI, ready to help with education in Nepal. I can respond in Nepali or English.' }] },
        ...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
        { role: 'user', parts: [{ text: userMessage.content }] },
      ];

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to generate response');
      }

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I could not generate a response.';

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error.message}\n\nPlease check your API key or try again.`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-140px)] flex flex-col">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 flex items-center justify-center gap-3">
            <i className="bi bi-robot text-nepal-600"></i>
            Study Hub AI Tutor
          </h1>
          <p className="mt-2 text-gray-600">Powered by Google Gemini - Context-aware about Nepal's education for all</p>
        </div>

        {!hasApiKey ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card max-w-2xl mx-auto"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-key text-white text-2xl"></i>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Enter Gemini API Key</h2>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                To use the AI Tutor, please provide your Google Gemini API key. It is stored locally in your browser (localStorage) and never sent anywhere else.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gemini API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-500 focus:border-nepal-500"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Get your free API key from{' '}
                  <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nepal-700 hover:text-nepal-800 underline"
                  >
                    Google AI Studio
                  </a>{' '}
                  (click to open in new tab)
                </p>
              </div>
              <button
                onClick={saveApiKey}
                disabled={!apiKey.trim()}
                className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="bi bi-unlock"></i>
                Save & Start Chatting
              </button>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-800">
                <i className="bi bi-shield-check mr-1"></i>
                Your API key is stored only in your browser's localStorage. This is private to you.
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="bi bi-robot text-white"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Model: {model}</p>
                  <p className="text-xs text-gray-600">Ready • Nepali & English supported</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="bi bi-trash3"></i>
                  Clear Chat
                </button>
                <button
                  onClick={clearApiKey}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="bi bi-key"></i>
                  Change Key
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 bg-gradient-to-br from-nepal-500 to-nepal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-float"
                    >
                      <i className="bi bi-chat-dots text-white text-3xl"></i>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900">Start a conversation</h3>
                    <p className="mt-2 text-gray-600 max-w-md">
                      Ask about education in Nepal, problems & solutions, learning resources, province-specific advice, or get help in Nepali or English.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                      {[
                        'What are the main education challenges in rural Nepal?',
                        'How can we improve girls\' education in remote districts?',
                        'Suggest offline learning ideas for Mountain regions',
                        'Inclusive education strategies for children with disabilities',
                      ].map(suggestion => (
                        <button
                          key={suggestion}
                          onClick={() => setInput(suggestion)}
                          className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-nepal-300 hover:bg-nepal-50/50 transition-all text-sm text-gray-700"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <AnimatePresence>
                    {messages.map(msg => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-nepal-600 to-nepal-700 text-white shadow-md'
                            : 'bg-white border border-gray-200 shadow-sm'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            {msg.role === 'assistant' && (
                              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                                <i className="bi bi-robot text-white text-xs"></i>
                              </div>
                            )}
                            {msg.role === 'user' && (
                              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                <i className="bi bi-person-fill text-xs"></i>
                              </div>
                            )}
                            <span className="text-xs opacity-70">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                          <i className="bi bi-robot text-white text-xs"></i>
                        </div>
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Nepal education, resources, problems & solutions..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-500 focus:border-nepal-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="btn-primary justify-center px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <i className="bi bi-hourglass-split animate-spin"></i>
                    ) : (
                      <i className="bi bi-send-fill"></i>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  AI understands Nepal's context (7 provinces, districts, Mountain/Hill/Terai, multilingual). Responds in Nepali or English.
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}