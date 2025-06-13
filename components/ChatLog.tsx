
import React, { useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { MessageSender } from '../types';
import UserMessage from './UserMessage';
import AiMessage from './AiMessage';
import LoadingSpinner from './LoadingSpinner';

interface ChatLogProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatLog: React.FC<ChatLogProps> = ({ messages, isLoading }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-grow p-6 space-y-4 overflow-y-auto bg-gray-800 rounded-t-lg">
      {messages.map((msg) =>
        msg.sender === MessageSender.USER ? (
          <UserMessage key={msg.id} message={msg} />
        ) : (
          <AiMessage key={msg.id} message={msg} />
        )
      )}
      {isLoading && (
        <div className="flex justify-start mb-4">
           <LoadingSpinner text="AI is thinking..." />
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatLog;
    