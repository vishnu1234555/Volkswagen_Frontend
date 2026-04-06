import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSendMessage = async (content) => {
    // Add user message
    const newMessage = { role: 'user', content };
    setMessages((prev) => [...prev, newMessage]);
    setIsGenerating(true);

    try {
      /* 
       * Wiring to backend API:
       * Uncomment below code when backend at http://localhost:5000 is ready.
       *
       * const response = await fetch('http://localhost:5000/api/chat', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({ message: content })
       * });
       * const data = await response.json();
       * const answer = data.reply;
       */

      // Simulated network delay for now
      await new Promise(resolve => setTimeout(resolve, 1200));
      const answer = "This is a simulated response. In production, this text will come from the backend API, answering your query about Volkswagen.";
      
      // Add assistant message
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch (error) {
      console.error('Failed to get response:', error);
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: `**Error:** Failed to connect to the backend API. \n\n\`${error.message}\`` 
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden font-sans items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container Card */}
      <div className="w-full max-w-4xl h-full max-h-[850px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100/50 backdrop-blur-sm">
        
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-5 shrink-0 shadow-sm flex items-center justify-between z-10 transition-colors">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-100 bg-gray-50 text-vw-blue font-bold shadow-inner">
              VW
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-vw-blue tracking-tight hover:text-blue-900 transition-colors cursor-default">Volkswagen AI Assistant</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p className="text-xs text-gray-500 font-medium">Online and ready</p>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <button 
              onClick={() => setMessages([])} 
              className="text-xs px-3 py-1.5 text-gray-400 hover:text-vw-blue hover:bg-blue-50 rounded-lg transition-colors font-medium border border-transparent hover:border-blue-100"
            >
              Clear Chat
            </button>
          )}
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth bg-gray-50/30">
          <div className="mx-auto flex flex-col justify-end min-h-full w-full">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4 my-auto select-none">
                <div className="w-20 h-20 rounded-full border-4 border-gray-100 flex items-center justify-center mb-2">
                  <span className="text-4xl text-gray-300 font-bold">VW</span>
                </div>
                <p className="text-lg font-medium text-gray-500">How can I assist you today?</p>
                <p className="text-sm">Start a conversation by asking a question.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <ChatMessage key={index} role={msg.role} content={msg.content} />
                ))}
              </div>
            )}
            
            {isGenerating && (
              <div className="flex w-full justify-start mb-6">
                <div className="flex items-center gap-3 bg-white border border-gray-100 px-5 py-3.5 rounded-2xl rounded-bl-sm text-sm text-gray-600 shadow-md">
                   <div className="flex space-x-1.5 items-center">
                     <span className="w-1.5 h-1.5 rounded-full bg-vw-blue/60 animate-bounce"></span>
                     <span className="w-1.5 h-1.5 rounded-full bg-vw-blue/60 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                     <span className="w-1.5 h-1.5 rounded-full bg-vw-blue/60 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                   </div>
                   <span className="font-medium ml-2 text-[14px]">Generating response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>
        </div>

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} isGenerating={isGenerating} />
      </div>
    </div>
  );
}

export default App;
