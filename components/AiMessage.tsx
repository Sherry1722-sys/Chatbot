
import React from 'react';
import type { ChatMessage } from '../types';
import AiIcon from './icons/AiIcon';

interface AiMessageProps {
  message: ChatMessage;
}

const AiMessage: React.FC<AiMessageProps> = ({ message }) => {
  // Basic markdown-like rendering for paragraphs (newlines) and bold text
  const renderText = (text: string) => {
    return text
      .split('\n\n') // Split by double newlines for paragraphs
      .map((paragraph, pIndex) => (
        <p key={pIndex} className="mb-2 last:mb-0">
          {paragraph.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
            }
            // Handle numbered lists like "1. Text" or "1) Text"
            if (/^\d+[.)]\s/.test(part)) {
                return <span key={partIndex} className="block ml-4">{part}</span>;
            }
            return part;
          })}
        </p>
      ));
  };

  return (
    <div className="flex justify-start mb-4">
      <AiIcon className="w-10 h-10 rounded-full text-teal-400" />
      <div className="ml-3 p-3 bg-gray-700 rounded-lg max-w-xl shadow-md">
        <div className="text-sm text-gray-200 whitespace-pre-wrap">
            {renderText(message.text)}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default AiMessage;
    