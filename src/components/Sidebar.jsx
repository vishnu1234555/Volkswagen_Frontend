import React from 'react';
import { Database, Cpu, MessageSquareX, Code } from 'lucide-react';
import { RETRIEVE_URL } from '../api';

const Sidebar = ({ onClearHistory }) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 shadow-sm">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-100 flex justify-center">
        <img 
          src="https://www.volkswagen-newsroom.com/en/images/volkswagen-logo-1.jpg" 
          alt="Volkswagen" 
          className="w-24 h-auto object-contain"
        />
      </div>

      {/* System Specs */}
      <div className="p-6 flex-grow overflow-y-auto">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">System Specs</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <Cpu className="text-vw-blue mt-0.5" size={18} />
            <div>
              <p className="text-sm font-bold text-vw-blue">LLM Backend</p>
              <p className="text-xs text-gray-600">Llama-3.3-70B (Groq)</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <Database className="text-vw-blue mt-0.5" size={18} />
            <div>
              <p className="text-sm font-bold text-vw-blue">Database</p>
              <p className="text-xs text-gray-600">Qdrant Cloud</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <Code className="text-vw-blue mt-0.5" size={18} />
            <div>
              <p className="text-sm font-bold text-vw-blue">Embeddings</p>
              <p className="text-xs text-gray-600">Nomic-Embed-Text</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-gray-400 font-mono break-all p-2 bg-gray-50 rounded border border-gray-100">
            API: {RETRIEVE_URL}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-100 bg-gray-50">
        <button 
          onClick={onClearHistory}
          className="w-full flex items-center justify-center space-x-2 bg-vw-blue hover:bg-blue-900 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium text-sm shadow-md"
        >
          <MessageSquareX size={18} />
          <span>Clear Chat History</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
