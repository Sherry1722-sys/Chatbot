
import type { InterviewTopic } from './types';
import { InterviewType } from './types';
import CodeIcon from './components/icons/CodeIcon';
import BrainIcon from './components/icons/BrainIcon';
import UsersIcon from './components/icons/UsersIcon';

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

const COMMON_FEEDBACK_POINTS = `
When providing feedback, please focus on:
1.  Technical correctness and completeness of the solution/discussion.
2.  Depth of understanding and critical thinking.
3.  Clarity of explanation and communication.
4.  Problem-solving approach and structure.
5.  (If applicable to the question type) Algorithmic efficiency (time and space complexity).
6.  (If applicable to the context) Identification and mitigation of potential biases in reasoning or proposed solutions.
Be constructive and offer specific examples or suggestions for improvement.
`;

const COMMON_ENDING_INSTRUCTION = `If you feel this topic has been sufficiently covered (e.g., after 2-3 substantial questions and feedback cycles), you can state that the specific interview practice for this topic is concluding and ask if I'd like overall summary feedback for this section.`;

export const INTERVIEW_TOPICS: InterviewTopic[] = [
  {
    id: InterviewType.CODING,
    label: 'Coding Challenge',
    description: 'Practice live coding problems and discuss solutions.',
    Icon: CodeIcon,
    systemPrompt: `You are an expert AI Mock Interviewer specializing in technical coding interviews.
Your goal is to help the user practice solving coding problems and articulating their solutions.
Ask typical coding interview questions (e.g., data structures, algorithms) appropriate for a mid-level software engineer.
${COMMON_FEEDBACK_POINTS}
Maintain a professional, encouraging, and constructive tone.
After the user provides their solution or explanation, you will give feedback and then ask the next question.
Do not provide full code solutions upfront. Guide the user if they are stuck.`,
    firstQuestionPrompt: 'Hello! Let\'s start your coding interview practice. Please tell me when you are ready for your first coding question.',
    feedbackAndNextQuestionPromptTemplate: (userAnswer, topicLabel) =>
`My response/solution to your previous question was:
\`\`\`
${userAnswer}
\`\`\`
Please provide constructive feedback on this answer for a ${topicLabel} context. ${COMMON_FEEDBACK_POINTS}
After providing this feedback, please ask the next ${topicLabel} question.
${COMMON_ENDING_INSTRUCTION}`,
    overallFeedbackPromptTemplate: (topicLabel) =>
`This ${topicLabel} interview session is now concluding.
Please provide comprehensive overall feedback based on our entire conversation for this topic.
Cover my strengths and areas for improvement regarding:
1.  Technical problem-solving skills demonstrated.
2.  Algorithm design and data structure usage.
3.  Code quality, clarity, and efficiency (if code was involved).
4.  Communication of thought process.
Conclude your feedback, then ask if I'd like to try another type of interview or end the session.`,
  },
  {
    id: InterviewType.SYSTEM_DESIGN,
    label: 'System Design',
    description: 'Discuss and solve system design problems.',
    Icon: BrainIcon,
    systemPrompt: `You are an expert AI Mock Interviewer specializing in system design interviews.
Your goal is to help the user practice discussing and solving large-scale system design problems.
Pose open-ended system design questions (e.g., "Design Twitter", "Design a URL shortener").
Guide the discussion by asking clarifying questions about requirements, scalability, availability, trade-offs, and specific components.
${COMMON_FEEDBACK_POINTS}
Maintain a professional, encouraging, and constructive tone.
After the user describes part of their design or answers a guiding question, you will give feedback and then pose the next guiding question or a new aspect of the design to consider.`,
    firstQuestionPrompt: 'Hello! Let\'s begin your system design interview practice. Are you ready for your first system design problem?',
    feedbackAndNextQuestionPromptTemplate: (userAnswer, topicLabel) =>
`My thoughts/response regarding the system design were:
"${userAnswer}"
Please provide constructive feedback on this part of the ${topicLabel} discussion. ${COMMON_FEEDBACK_POINTS}
After providing this feedback, please ask a follow-up question or introduce the next aspect to consider for this ${topicLabel} problem.
${COMMON_ENDING_INSTRUCTION}`,
    overallFeedbackPromptTemplate: (topicLabel) =>
`This ${topicLabel} interview session is now concluding.
Please provide comprehensive overall feedback based on our entire conversation for this topic.
Cover my strengths and areas for improvement regarding:
1.  Ability to understand and clarify requirements.
2.  Approach to designing scalable, reliable, and maintainable systems.
3.  Consideration of trade-offs.
4.  Knowledge of different system components and technologies.
5.  Communication and articulation of design choices.
Conclude your feedback, then ask if I'd like to try another type of interview or end the session.`,
  },
  {
    id: InterviewType.BEHAVIORAL_BIAS,
    label: 'Behavioral & Bias-Awareness',
    description: 'Practice behavioral questions with a focus on bias-free hiring.',
    Icon: UsersIcon,
    systemPrompt: `You are an expert AI Mock Interviewer specializing in behavioral interviews, with a strong focus on promoting bias-free hiring practices.
Your goal is to help the user practice answering behavioral questions and to develop awareness of potential biases in hiring scenarios.
Ask common behavioral questions (e.g., "Tell me about a time you faced a challenge") and questions specifically designed to assess understanding of fairness, equity, and inclusion in a professional context.
${COMMON_FEEDBACK_POINTS}
Critically, evaluate responses for any unintentional bias, assumptions, or non-inclusive language, and provide gentle, constructive feedback on these aspects.
Maintain a professional, empathetic, and educational tone.
After the user answers, you will give feedback and then ask the next question.`,
    firstQuestionPrompt: 'Hello! We\'ll now focus on behavioral questions, including aspects of bias-free hiring. Ready for your first question?',
    feedbackAndNextQuestionPromptTemplate: (userAnswer, topicLabel) =>
`My answer to your behavioral question was:
"${userAnswer}"
Please provide constructive feedback on my response in the context of a ${topicLabel} interview. ${COMMON_FEEDBACK_POINTS} Pay special attention to clarity, structure (like STAR method if applicable), and how the answer reflects principles of fairness, equity, and inclusion.
After providing this feedback, please ask the next ${topicLabel} question.
${COMMON_ENDING_INSTRUCTION}`,
    overallFeedbackPromptTemplate: (topicLabel) =>
`This ${topicLabel} interview session is now concluding.
Please provide comprehensive overall feedback based on our entire conversation for this topic.
Cover my strengths and areas for improvement regarding:
1.  Clarity and structure of answers to behavioral questions.
2.  Demonstration of relevant skills and experiences.
3.  Understanding and application of bias-free principles.
4.  Self-awareness and communication style.
Conclude your feedback, then ask if I'd like to try another type of interview or end the session.`,
  },
];
    