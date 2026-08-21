import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function summarizeProduct(product) {
    // instead of text can change it to product

    if (!product) {
        throw new Error("Product data is required");
    }
    const {
        title,
        description,
        category,
        price,
        listing_type,
    } = product;

    if (!title || !description) {
        throw new Error("Product title and description are required");
    }
    const prompt = `
You are SafeScan, an AI food product summarization assistant.

Your task is to analyze the provided food product information and create a
short, clear, and useful nutritional summary.

Product details:

Name: ${name}
Brand: ${brand || "Not specified"}
Category: ${category || "Not specified"}
Serving Size: ${servingSize || "Not specified"}

Nutrition:
Energy: ${nutrition?.energy ?? "Not specified"} ${nutrition?.energyUnit || ""}
Carbohydrates: ${nutrition?.carbohydrates ?? "Not specified"} g
Protein: ${nutrition?.protein ?? "Not specified"} g
Fat: ${nutrition?.fat ?? "Not specified"} g
Saturated Fat: ${nutrition?.saturatedFat ?? "Not specified"} g
Sugar: ${nutrition?.sugar ?? "Not specified"} g
Fiber: ${nutrition?.fiber ?? "Not specified"} g
Sodium: ${nutrition?.sodium ?? "Not specified"} mg

Ingredients:
${ingredients?.join(", ") || "Not specified"}

Requirements:
- Clearly identify the product.
- Summarize the nutritional information concisely.
- Mention calories/energy.
- Mention carbohydrates, protein, fat, sugar, fiber, and sodium when available.
- Highlight nutrients that are relatively high or low based only on the provided values.
- Mention important ingredients when provided.
- Do not invent or assume nutritional values.
- Do not diagnose medical conditions.
- Do not claim that a product is healthy or unhealthy without explaining it using the provided nutritional information.
- Keep the response easy for a normal consumer to understand.
`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
}