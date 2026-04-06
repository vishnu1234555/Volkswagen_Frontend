import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 group`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md
          ${isUser ? 'bg-gray-100 text-gray-600' : 'bg-vw-blue text-white'}`}
        >
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Message Bubble */}
        <div className={`px-5 py-3.5 rounded-2xl shadow-md text-[15px] leading-relaxed transition-all duration-200 hover:shadow-lg
          ${isUser 
            ? 'bg-vw-blue text-white rounded-br-sm' 
            : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'
          }`}
        >
          <div className={`prose prose-sm max-w-none ${isUser ? 'prose-p:text-white prose-a:text-blue-200 hover:prose-a:text-white prose-strong:text-white prose-code:text-white prose-headings:text-white' : 'prose-p:text-gray-800 prose-pre:bg-gray-50'}`}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
