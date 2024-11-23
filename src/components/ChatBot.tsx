import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader, AlertCircle } from 'lucide-react';
import { generateResponse, validateApiKey } from '../services/perplexityApi';

interface Message {
  id: string;
  text: string;
  role: 'system' | 'user' | 'assistant';
}

export default function ChatBot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your groundwater information assistant. How can I help you today?",
      role: 'assistant'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Only scroll when messages change
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (!validateApiKey(PERPLEXITY_API_KEY)) {
      setError('Please add your Perplexity API key to the .env file');
    } else {
      setError(null);
    }
  }, [PERPLEXITY_API_KEY]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading || !validateApiKey(PERPLEXITY_API_KEY)) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      role: 'user' as const
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const apiMessages = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.text
        }));
      apiMessages.push({ role: 'user', content: userMessage.text });

      const response = await generateResponse(apiMessages, PERPLEXITY_API_KEY || '');

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: response,
          role: 'assistant' as const
        }
      ]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-primary/10">
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-6 w-6" />
          <h2 className="text-xl font-bold">Groundwater Assistant</h2>
        </div>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border-b border-red-100 flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="h-[280px] p-4 overflow-y-auto bg-gray-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`chat-message ${
              msg.role === 'user' ? 'chat-message-user' : 'chat-message-bot'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center py-2">
            <Loader className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about groundwater..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 bg-white"
            disabled={isLoading || !validateApiKey(PERPLEXITY_API_KEY)}
          />
          <button 
            type="submit" 
            className="btn btn-primary flex items-center justify-center"
            disabled={!message.trim() || isLoading || !validateApiKey(PERPLEXITY_API_KEY)}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}