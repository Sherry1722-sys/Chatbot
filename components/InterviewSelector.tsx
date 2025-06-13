
import React from 'react';
import type { InterviewTopic } from '../types';

interface InterviewSelectorProps {
  topics: InterviewTopic[];
  onSelectTopic: (topic: InterviewTopic) => void;
  isLoading: boolean;
}

const InterviewSelector: React.FC<InterviewSelectorProps> = ({ topics, onSelectTopic, isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          AI Mock Interviewer
        </h1>
        <p className="text-lg text-gray-400">
          Choose an interview type to begin your practice session.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            disabled={isLoading}
            className="group bg-gray-800 hover:bg-gray-700/70 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center text-center"
          >
            <topic.Icon className="w-16 h-16 mb-4 text-blue-400 group-hover:text-teal-400 transition-colors duration-300" />
            <h2 className="text-xl font-semibold text-gray-100 mb-2">{topic.label}</h2>
            <p className="text-sm text-gray-400">{topic.description}</p>
          </button>
        ))}
      </div>
       {isLoading && (
        <p className="mt-8 text-lg text-teal-400">Initializing interview session...</p>
      )}
    </div>
  );
};

export default InterviewSelector;
    