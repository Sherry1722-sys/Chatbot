
import React from 'react';
import type { ChatMessage } from '../types';
import UserIcon from './icons/UserIcon';

interface UserMessageProps {
  message: ChatMessage;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="mr-3 p-3 bg-blue-600 rounded-lg max-w-xl shadow-md">
        <p className="text-sm text-white whitespace-pre-wrap">{message.text}</p>
        <p className="text-xs text-blue-200 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
      <UserIcon className="w-10 h-10 rounded-full text-gray-300" />
    </div>
  );
};

export default UserMessage;
    