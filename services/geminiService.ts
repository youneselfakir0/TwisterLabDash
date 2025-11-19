import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

// Initialize the client.
// API Key is injected via environment variable as per strict requirements.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToTwister = async (
  userMessage: string,
  history: { role: string; content: string }[] = []
): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key not configured in environment.";
  }

  try {
    // We use gemini-2.5-flash for quick, responsive agent interactions
    const modelId = 'gemini-2.5-flash';
    
    // Construct the history for the model to have context
    // We treat the conversation as a fresh generation with context for simplicity in this stateless service
    // or use chat if we wanted to maintain a session object.
    // For this implementation, we will use generateContent with a constructed prompt to mimic chat
    // to adhere to the "stateless" nature of a simple service function, 
    // but using ai.chats.create is also valid. Let's use ai.chats.create for better multi-turn handling.

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.2, // Low temperature for technical precision
      },
      history: history.map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      })),
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: userMessage
    });

    return result.text || "System: No response received from agent.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Error: Unable to communicate with the Orchestrator Neural Core.";
  }
};
