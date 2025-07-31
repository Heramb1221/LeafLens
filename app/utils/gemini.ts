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
    
    Please provide accurate and helpful information about this plant. If you cannot identify the plant with confidence, provide your best guess but mention the uncertainty in the description.
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