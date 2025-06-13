
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';

// Ensure API_KEY is handled as per instructions (must be from process.env.API_KEY)
// The application will not prompt for it. If it's not set, initialization might fail or calls will error.
let ai: GoogleGenAI | null = null;
try {
    if (!process.env.API_KEY) {
        // This log is for developer awareness; UI should handle API errors gracefully.
        console.warn("Gemini API Key (process.env.API_KEY) is not set. API calls will likely fail.");
        // We don't throw here, as per instructions to not manage API key in UI.
        // Let calls fail and be handled by the calling code.
    }
     ai = new GoogleGenAI({ apiKey: process.env.API_KEY! }); // The "!" asserts API_KEY is non-null, assuming it's set externally.
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    // AI remains null, subsequent calls will fail and should be handled.
}


export async function startChatSession(systemInstruction: string): Promise<Chat> {
    if (!ai) {
        throw new Error("Gemini AI service is not initialized. Check API Key.");
    }
    try {
        const chat = ai.chats.create({
            model: GEMINI_MODEL_NAME,
            config: { 
                systemInstruction: systemInstruction,
                // Add thinkingConfig: { thinkingBudget: 0 } for gemini-2.5-flash-preview-04-17 if low latency is critical
                // For general purpose chat, omitting it is fine (defaults to enabled thinking).
            },
        });
        return chat;
    } catch (error) {
        console.error("Error starting Gemini chat session:", error);
        if (error instanceof Error && error.message.includes("API key not valid")) {
            throw new Error("Invalid Gemini API Key. Please ensure the API_KEY environment variable is correctly configured.");
        }
        throw new Error("Failed to start chat session with Gemini API.");
    }
}

export async function sendMessageToGemini(chat: Chat, message: string): Promise<string> {
    if (!ai) { // Should have been caught by startChatSession, but good check
        throw new Error("Gemini AI service is not initialized.");
    }
    try {
        const response: GenerateContentResponse = await chat.sendMessage({ message });
        // Directly access the text property as per guidance
        return response.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
         if (error instanceof Error) {
            if (error.message.includes("API key not valid")) {
                 throw new Error("Invalid Gemini API Key during message sending. Please check your API_KEY environment variable.");
            }
            // For other errors, provide a generic message or rethrow with more context if possible
            const detailedMessage = (error as any)?.message || "An unknown error occurred.";
            throw new Error(`Gemini API Error: ${detailedMessage}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
}
    