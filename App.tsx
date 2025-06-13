
import React, { useState, useEffect, useCallback } from 'react';
import type { AppState, ChatMessage, InterviewTopic } from './types';
import { InterviewState, MessageSender } from './types';
import { INTERVIEW_TOPICS } from './constants';
import * as geminiService from './services/geminiService';
import type { Chat } from '@google/genai';

import InterviewSelector from './components/InterviewSelector';
import ChatLog from './components/ChatLog';
import ChatInput from './components/ChatInput';
import RestartIcon from './components/icons/RestartIcon';
import SpinnerIcon from './components/icons/SpinnerIcon'; // For button loading

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    interviewState: InterviewState.SELECT_TOPIC,
    messages: [],
    currentTopic: null,
    currentChat: null,
    isLoading: false,
    error: null,
    userInput: '',
  });

  const handleError = useCallback((errorMessage: string) => {
    console.error(errorMessage);
    setAppState(prev => ({ ...prev, error: errorMessage, isLoading: false, interviewState: InterviewState.ERROR }));
  }, []);

  const addMessage = (sender: MessageSender, text: string) => {
    setAppState(prev => ({
      ...prev,
      messages: [...prev.messages, { id: Date.now().toString(), sender, text, timestamp: new Date() }],
    }));
  };
  
  const processAiTurn = useCallback(async (prompt: string, chatSession: Chat | null) => {
    if (!chatSession) {
      handleError("Chat session is not available.");
      return;
    }
    setAppState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const aiResponseText = await geminiService.sendMessageToGemini(chatSession, prompt);
      addMessage(MessageSender.AI, aiResponseText);
    } catch (e: any) {
      handleError(e.message || "An error occurred while communicating with the AI.");
    } finally {
      setAppState(prev => ({ ...prev, isLoading: false }));
    }
  }, [handleError]);


  const handleSelectTopic = useCallback(async (topic: InterviewTopic) => {
    setAppState(prev => ({ ...prev, isLoading: true, error: null, currentTopic: topic, messages: [] }));
    try {
      const chat = await geminiService.startChatSession(topic.systemPrompt);
      setAppState(prev => ({ ...prev, currentChat: chat, interviewState: InterviewState.INTERVIEWING }));
      // Add a small greeting from AI before the first question.
      addMessage(MessageSender.AI, `Starting ${topic.label} interview. I will ask the first question shortly.`);
      // Then, send the prompt for the first question
      await processAiTurn(topic.firstQuestionPrompt, chat);

    } catch (e: any) {
      handleError(e.message || "Failed to initialize interview session.");
    } finally {
       // isLoading is handled by processAiTurn or error handler
    }
  }, [processAiTurn, handleError]);

  const handleUserSubmit = useCallback(async () => {
    if (!appState.userInput.trim() || !appState.currentTopic || !appState.currentChat) return;

    const userText = appState.userInput;
    addMessage(MessageSender.USER, userText);
    setAppState(prev => ({ ...prev, userInput: '' }));
    
    const prompt = appState.currentTopic.feedbackAndNextQuestionPromptTemplate(userText, appState.currentTopic.label);
    await processAiTurn(prompt, appState.currentChat);

  }, [appState.userInput, appState.currentTopic, appState.currentChat, processAiTurn]);

  const handleEndInterviewTopic = useCallback(async () => {
    if (!appState.currentTopic || !appState.currentChat) return;
    
    setAppState(prev => ({ ...prev, interviewState: InterviewState.PROVIDING_SUMMARY}));
    addMessage(MessageSender.AI, `Okay, let's summarize your performance for the ${appState.currentTopic.label} topic.`);
    const prompt = appState.currentTopic.overallFeedbackPromptTemplate(appState.currentTopic.label);
    await processAiTurn(prompt, appState.currentChat);
    setAppState(prev => ({ ...prev, interviewState: InterviewState.ENDED }));

  }, [appState.currentTopic, appState.currentChat, processAiTurn]);


  const handleRestart = () => {
    setAppState({
      interviewState: InterviewState.SELECT_TOPIC,
      messages: [],
      currentTopic: null,
      currentChat: null,
      isLoading: false,
      error: null,
      userInput: '',
    });
  };
  
  // Effect to show initial error if API_KEY is missing and AI service failed to init
   useEffect(() => {
    if (!process.env.API_KEY) {
      // This is a placeholder as per instructions, geminiService handles actual error
      // Only set error if not already in an error state from other operations
      if (appState.interviewState !== InterviewState.ERROR) {
         // Minimal user impact, console log is primary as per instructions.
         // handleError("Gemini API Key is not configured. The application may not function correctly.");
         console.warn("Development: Gemini API Key (API_KEY) environment variable is not set.");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount


  if (appState.interviewState === InterviewState.SELECT_TOPIC) {
    return <InterviewSelector topics={INTERVIEW_TOPICS} onSelectTopic={handleSelectTopic} isLoading={appState.isLoading} />;
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-gray-900 shadow-2xl rounded-lg overflow-hidden">
      <header className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          {appState.currentTopic?.label || "AI Mock Interviewer"}
        </h1>
        <button
          onClick={handleRestart}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
          title="Start New Interview"
          aria-label="Start new interview"
        >
          <RestartIcon className="w-6 h-6" />
        </button>
      </header>

      {appState.error && (
        <div className="p-4 bg-red-700 text-white text-center">
          <p><strong>Error:</strong> {appState.error}</p>
          <p className="text-sm">Please check the console for more details. You might need to configure your API key or check your network connection.</p>
        </div>
      )}

      <ChatLog messages={appState.messages} isLoading={appState.isLoading && appState.interviewState !== InterviewState.PROVIDING_SUMMARY && appState.interviewState !== InterviewState.ENDED} />
      
      {(appState.interviewState === InterviewState.INTERVIEWING || appState.interviewState === InterviewState.PROVIDING_SUMMARY) && (
        <ChatInput
          userInput={appState.userInput}
          onUserInput={(input) => setAppState(prev => ({ ...prev, userInput: input }))}
          onSubmit={handleUserSubmit}
          isLoading={appState.isLoading}
          onEndInterview={handleEndInterviewTopic}
          interviewActive={appState.interviewState === InterviewState.INTERVIEWING}
        />
      )}
      {appState.interviewState === InterviewState.ENDED && !appState.isLoading && (
         <div className="p-4 bg-gray-800 border-t border-gray-700 text-center">
            <p className="text-gray-300 mb-2">{appState.currentTopic?.label} session concluded.</p>
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Start Another Interview Topic
            </button>
          </div>
      )}
       {appState.isLoading && (appState.interviewState === InterviewState.PROVIDING_SUMMARY || appState.interviewState === InterviewState.ENDED) && (
        <div className="p-4 bg-gray-800 border-t border-gray-700 text-center flex items-center justify-center text-gray-300">
          <SpinnerIcon className="w-5 h-5 mr-2" />
          Generating summary...
        </div>
      )}

    </div>
  );
};

export default App;
    