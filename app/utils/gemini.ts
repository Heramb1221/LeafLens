import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// -------------------
// Identify Plant from Image
// -------------------
export async function identifyPlant(imageBase64: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze this plant image and provide detailed information in the following JSON format:
    {
      "name": "Common name of the plant",
      "scientificName": "Scientific name",
      "family": "Plant family",
      "description": "Detailed description of the plant (2-3 sentences)",
      "confidenceScore": 0.95,
      "care": {
        "sunlight": "Sunlight requirements",
        "water": "Watering needs",
        "temperature": "Temperature range",
        "humidity": "Humidity preferences"
      },
      "nativeRegion": "Where the plant naturally grows",
      "uses": ["use1", "use2", "use3"],
      "funFacts": ["fact1", "fact2", "fact3"]
    }
    `;

    const imagePart = {
      inlineData: {
        data: imageBase64.split(",")[1], // strip "data:image/jpeg;base64,"
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }, imagePart] }],
    });

    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error identifying plant:", error);
    throw new Error("Failed to identify plant");
  }
}

// -------------------
// Get Random Plant Fact
// -------------------
export async function getRandomPlantFact() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Generate a random interesting plant fact in the following JSON format:
    {
      "title": "Short catchy title for the fact",
      "content": "Detailed and interesting plant fact (2-3 sentences)",
      "category": "Category of the fact (e.g., Medicinal, Rare Plants, Adaptations, etc.)"
    }
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error getting plant fact:", error);
    throw new Error("Failed to get plant fact");
  }
}
