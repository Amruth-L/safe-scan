import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function summarizeText(text) {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize the following text:

${text}`,
    });

    return response.text;
}