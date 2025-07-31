import { NextRequest, NextResponse } from 'next/server'
import { identifyPlant } from '../../utils/gemini'

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const result = await identifyPlant(image)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in identify API:', error)
    return NextResponse.json({ error: 'Failed to identify plant' }, { status: 500 })
  }
}