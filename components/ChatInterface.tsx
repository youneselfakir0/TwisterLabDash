import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Terminal } from 'lucide-react';
import { sendMessageToTwister } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: 'TwisterLab v1.0.0 Orchestrator Online. I am connected to the edgeserver swarm. How can I assist with agent deployment or diagnostics?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Convert history for the API context
    const historyContext = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    const responseText = await sendMessageToTwister(userMsg.content, historyContext);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 w-full md:w-96 lg:w-[28rem] fixed right-0 top-0 bottom-0 z-20 shadow-2xl transform transition-transform duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-2 bg-slate-900/90 backdrop-blur">
        <div className="p-2 bg-twister-500/10 rounded-lg">
          <Bot className="w-5 h-5 text-twister-400" />
        </div>
        <div>
          <h2 className="font-semibold text-slate-100">Orchestrator AI</h2>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            gemini-2.5-flash online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              msg.role === 'user' ? 'bg-slate-700' : 'bg-twister-500/20'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : <Terminal size={14} className="text-twister-400" />}
            </div>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-slate-700 text-slate-100 rounded-tr-none' 
                : 'bg-slate-800/50 border border-slate-700 text-slate-300 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-twister-500/20 flex items-center justify-center">
              <Loader2 size={14} className="animate-spin text-twister-400" />
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg rounded-tl-none border border-slate-700">
              <span className="text-xs text-slate-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Maestro..."
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-twister-500 focus:ring-1 focus:ring-twister-500 transition-all text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-twister-400 disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
