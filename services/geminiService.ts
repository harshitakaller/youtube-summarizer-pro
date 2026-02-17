
import { GoogleGenAI, Type } from "@google/genai";
import { VideoAnalysis, SummaryLength } from "../types";

export const analyzeYoutubeVideo = async (url: string, length: SummaryLength = 'medium'): Promise<VideoAnalysis> => {
  // Accessing the key provided by Vite's define or process.env
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === 'undefined' || apiKey === 'null' || apiKey.length < 10) {
    throw new Error("MISSING_KEY: No valid API key found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const lengthConfig = {
    short: "around 100-150 words",
    medium: "at least 300 words",
    long: "a very comprehensive long-form summary of at least 800-1000 words with deep section-by-section analysis and context"
  };

  const prompt = `
    Analyze the following YouTube video URL: ${url}
    
    Tasks:
    1. Identify the exact video title.
    2. Provide a summary that is ${lengthConfig[length]} that covers the main arguments, context, and conclusion.
    3. Extract exactly 10 high-relevance keywords or phrases related to the video's content.
    4. List 5 key takeaways or bullet points from the video.
    
    Use Google Search to find accurate information about this specific video ID and content to ensure the summary is perfect.
    Return your response as a structured JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            keywords: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            keyTakeaways: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "summary", "keywords", "keyTakeaways"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No content received from Gemini.");
    }
    
    const parsedData = JSON.parse(resultText);
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      ...parsedData,
      sources: groundingChunks
    };
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    let rawMessage = error.message || "";
    let cleanMessage = rawMessage;

    // Try to parse the error message if it is a JSON string (common in Gemini SDK)
    try {
      const jsonStart = rawMessage.indexOf('{');
      if (jsonStart !== -1) {
        const jsonStr = rawMessage.substring(jsonStart);
        const parsedError = JSON.parse(jsonStr);
        if (parsedError.error?.message) {
          cleanMessage = parsedError.error.message;
        }
      }
    } catch (e) {
      // If parsing fails, use the original message
    }

    if (cleanMessage.includes('429') || cleanMessage.includes('RESOURCE_EXHAUSTED')) {
      throw new Error("QUOTA_EXCEEDED: You've hit the Gemini Free Tier limit. The 'Google Search' tool uses more quota. Please wait 60 seconds and try again.");
    }

    if (cleanMessage.includes('403') || cleanMessage.includes('API_KEY_INVALID')) {
      throw new Error("INVALID_KEY: Your API key is invalid or lacks permissions. Please check your Google AI Studio settings.");
    }

    throw new Error(cleanMessage || "An unknown error occurred during analysis.");
  }
};
