import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error("⚠️ GEMINI API KEY NOT FOUND!");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function identifyPlant(imageBase64: string) {
  try {
    console.log("🔍 Starting plant identification...");
    
    if (!apiKey) {
      throw new Error("Gemini API key is not configured");
    }

    const prompt = `Analyze this plant image and provide detailed information in the following JSON format.
Return ONLY valid JSON, no markdown formatting or code blocks:
{
  "name": "Common name of the plant",
  "scientificName": "Scientific name",
  "family": "Plant family",
  "description": "Detailed description (2-3 sentences)",
  "confidenceScore": 0.95,
  "care": {
    "sunlight": "Sunlight requirements",
    "water": "Watering needs",
    "temperature": "Temperature range in Celsius",
    "humidity": "Humidity level"
  },
  "nativeRegion": "Native region",
  "uses": ["use1", "use2", "use3"],
  "funFacts": ["fact1", "fact2", "fact3"]
}`;

    let base64Data = imageBase64.includes(',') 
      ? imageBase64.split(',')[1] 
      : imageBase64;

    let mimeType = "image/jpeg";
    if (imageBase64.includes('data:image/png')) {
      mimeType = "image/png";
    } else if (imageBase64.includes('data:image/webp')) {
      mimeType = "image/webp";
    }

    console.log("📤 Sending request to Gemini API...");
    console.log("Using model: gemini-2.0-flash-exp");
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    const text = response.text;
    
    console.log("📥 Response received");
    if (typeof text === 'string') {
      console.log("Raw response:", text.substring(0, 200));
    } else {
      console.log("Raw response is undefined or not a string");
    }

    let cleanedText = typeof text === 'string' ? text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim() : '';
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const plantData = JSON.parse(jsonMatch[0]);
      
      // Validate and add defaults
      if (!plantData.care) {
        console.warn("⚠️ Adding default care data");
        plantData.care = {
          sunlight: "Moderate sunlight",
          water: "Regular watering",
          temperature: "15-25°C",
          humidity: "Moderate"
        };
      } else {
        plantData.care.sunlight = plantData.care.sunlight || "Not specified";
        plantData.care.water = plantData.care.water || "Not specified";
        plantData.care.temperature = plantData.care.temperature || "Not specified";
        plantData.care.humidity = plantData.care.humidity || "Not specified";
      }
      
      if (!Array.isArray(plantData.uses) || plantData.uses.length === 0) {
        plantData.uses = ["Ornamental plant", "Decorative purpose"];
      }
      
      if (!Array.isArray(plantData.funFacts) || plantData.funFacts.length === 0) {
        plantData.funFacts = ["This is an interesting plant species!"];
      }
      
      console.log("✅ Plant identified successfully");
      return plantData;
    }
    
    console.error("❌ No JSON found in response");
    throw new Error("Invalid response format from AI");
  } catch (error) {
    console.error("❌ Error identifying plant:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to identify plant: ${error.message}`);
    }
    throw new Error("Failed to identify plant: Unknown error");
  }
}

export async function getRandomPlantFact() {
  try {
    console.log("🌱 Fetching random plant fact...");
    
    if (!apiKey) {
      throw new Error("Gemini API key is not configured");
    }

    const prompt = `Generate a random interesting plant fact in JSON format.
Return ONLY valid JSON:
{
  "title": "Short catchy title",
  "content": "Detailed fact (2-3 sentences)",
  "category": "Category",
  "imagePrompt": "Image description"
}`;

    console.log("📤 Requesting plant fact...");
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
    });

    const text = response.text;
    
    console.log("📥 Fact response received");

    let cleanedText = typeof text === 'string' ? text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim() : '';
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const factData = JSON.parse(jsonMatch[0]);
      console.log("✅ Plant fact fetched successfully");
      return factData;
    }
    
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("❌ Error getting plant fact:", error);
    return {
      title: "Did You Know?",
      content: "The Amazon rainforest produces about 20% of the world's oxygen. It's home to approximately 390 billion individual trees divided into 16,000 species, making it one of the most biodiverse places on Earth.",
      category: "Ecology",
      imagePrompt: "Lush Amazon rainforest canopy"
    };
  }
}