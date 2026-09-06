import React, { useState } from 'react';
import { X, Send, Headphones, Bot, Sparkles, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi there! Welcome to FreshMart Instant Support. How can we help you today with your 10-minute order?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    "Where is my 10-min delivery?",
    "Need refund for damaged item",
    "How to apply FRESH100 coupon?",
    "Talk to dark-store executive"
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: text.trim(),
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Instant bot response simulation
    setTimeout(() => {
      let reply = "Our dark store delivery fleet is tracking your request in real time. Your package is dispatched with cold-chain packaging!";
      const lower = text.toLowerCase();
      if (lower.includes('refund') || lower.includes('damaged')) {
        reply = "We apologize for the inconvenience! We have initiated a full refund of ₹120 to your FreshCash wallet. It reflects instantly.";
      } else if (lower.includes('where') || lower.includes('delivery')) {
        reply = "Your delivery partner Ramesh Kumar is 450 meters away and arriving in approximately 4 minutes!";
      } else if (lower.includes('coupon') || lower.includes('fresh100')) {
        reply = "Use coupon code 'FRESH100' on the cart checkout page for flat ₹100 discount on orders above ₹299.";
      }

      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: reply,
        time: 'Just now'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col h-[580px] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black leading-tight">FreshMart Support</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
              </div>
              <p className="text-[10px] text-emerald-100 font-medium">⚡ 24x7 Live Delivery Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50/70">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs font-medium leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-neutral-800 border border-neutral-200/80 rounded-bl-xs shadow-2xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-3 py-2 bg-white border-t border-neutral-100 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="shrink-0 text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 cursor-pointer transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 bg-neutral-100 rounded-xl px-3.5 py-2 text-xs text-neutral-800 outline-none border border-transparent focus:border-emerald-600 focus:bg-white transition-colors"
          />
          <button
            onClick={() => handleSend()}
            className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
