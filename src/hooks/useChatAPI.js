import { GoogleGenAI } from "@google/genai";

export async function sendMessageToGemini(message) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key is missing.");

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    // Extract text from the first candidate
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "No response from Gemini.";

  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
