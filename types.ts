
import type { Chat } from "@google/genai";

export enum MessageSender {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: Date;
}

export enum InterviewType {
  CODING = 'CODING',
  SYSTEM_DESIGN = 'SYSTEM_DESIGN',
  BEHAVIORAL_BIAS = 'BEHAVIORAL_BIAS',
}

export interface InterviewTopic {
  id: InterviewType;
  label: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  systemPrompt: string;
  firstQuestionPrompt: string;
  feedbackAndNextQuestionPromptTemplate: (userAnswer: string, topicLabel: string) => string;
  overallFeedbackPromptTemplate: (topicLabel: string) => string;
}

export enum InterviewState {
  SELECT_TOPIC = 'SELECT_TOPIC',
  INTERVIEWING = 'INTERVIEWING',
  PROVIDING_SUMMARY = 'PROVIDING_SUMMARY',
  ENDED = 'ENDED', // After summary, ready to restart
  ERROR = 'ERROR',
}

export interface AppState {
  interviewState: InterviewState;
  messages: ChatMessage[];
  currentTopic: InterviewTopic | null;
  currentChat: Chat | null;
  isLoading: boolean;
  error: string | null;
  userInput: string;
}
    