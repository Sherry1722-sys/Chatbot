
import React from 'react';
import SendIcon from './icons/SendIcon';

interface ChatInputProps {
  userInput: string;
  onUserInput: (input: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onEndInterview: () => void;
  interviewActive: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  userInput,
  onUserInput,
  onSubmit,
  isLoading,
  onEndInterview,
  interviewActive
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading && userInput.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center space-x-3">
        <textarea
          value={userInput}
          onChange={(e) => onUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer here..."
          rows={2}
          className="flex-grow p-3 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          disabled={isLoading || !interviewActive}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !userInput.trim() || !interviewActive}
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </div>
      {interviewActive && (
         <button
            onClick={onEndInterview}
            disabled={isLoading}
            className="mt-3 w-full p-2 bg-red-600 hover:bg-red-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
          >
            End Current Topic & Get Summary
          </button>
      )}
    </div>
  );
};

export default ChatInput;
    