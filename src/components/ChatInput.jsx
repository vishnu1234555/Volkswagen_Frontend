import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ onSendMessage, isGenerating }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isGenerating) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 shrink-0 z-10 rounded-b-3xl">
      <div className="w-full mx-auto">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-2 focus:ring-vw-blue/20 focus:border-vw-blue block p-4 pl-6 pr-14 transition-all duration-200"
            placeholder="Ask about Volkswagen specs, features, or manuals..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-vw-blue text-white hover:bg-blue-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-[calc(50%+1px)] disabled:hover:translate-y-[-50%] disabled:hover:shadow-none"
          >
            {isGenerating ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} className="ml-1 opacity-90" />
            )}
          </button>
        </form>
        <p className="text-center text-[11px] text-gray-400 mt-3 font-medium tracking-wide pb-1">
          Volkswagen RAG Assistant • Internal AI Demonstration
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
