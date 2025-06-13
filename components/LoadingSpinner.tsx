
import React from 'react';
import AiIcon from './icons/AiIcon'; // Re-using AiIcon for style consistency

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg shadow-md max-w-xs">
      <AiIcon className="w-8 h-8 text-teal-400 animate-pulse" />
      <div>
        <div className="w-20 h-2 bg-gray-600 rounded-full mb-1 animate-pulse"></div>
        <div className="w-32 h-2 bg-gray-500 rounded-full animate-pulse"></div>
         <p className="text-sm text-gray-300 mt-1">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
    