import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

export async function identifyPlant(imageBase64: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const prompt = `
    Analyze this plant image and provide detailed information in the following JSON format:
    {
      "name": "Common name of the plant",
      "scientificName": "Scientific name",
      "family": "Plant family",
      "description": "Detailed description of the plant (2-3 sentences)",
      "confidenceScore": 0.95, // Add a confidence score between 0 and 1 indicating how confident you are in this identification
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
    
    Please provide accurate and helpful information about this plant. If you cannot identify the plant with confidence, provide your best guess and set a lower confidence score accordingly.
    `

    const imagePart = {
      inlineData: {
        data: imageBase64.split(',')[1], // Remove the data:image/jpeg;base64, part
        mimeType: "image/jpeg"
      }
    }

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    console.error('Error identifying plant:', error)
    throw new Error('Failed to identify plant')
  }
}

export async function getRandomPlantFact() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const prompt = `
    Generate a random interesting plant fact in the following JSON format:
    {
      "title": "Short catchy title for the fact",
      "content": "Detailed and interesting plant fact (2-3 sentences)",
      "category": "Category of the fact (e.g., Medicinal, Rare Plants, Adaptations, etc.)"
    }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    console.error('Error getting plant fact:', error)
    throw new Error('Failed to get plant fact')
  }
}