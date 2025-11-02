import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
    const genAI = new GoogleGenerativeAI(apiKey);
    
  if (process.env.NODE_ENV !== 'production') console.log('Listing available models...');
    
    // Test multiple model names to see which ones work
    const modelsToTest = [
      'gemini-2.5-flash',
      'gemini-2.0-flash-exp',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-pro',
      'models/gemini-2.5-flash',
      'models/gemini-2.0-flash-exp',
      'models/gemini-1.5-flash',
      'models/gemini-1.5-pro'
    ];
    
    const results = [];
    
    for (const modelName of modelsToTest) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello');
        const response = await result.response;
        const text = response.text();
        
        results.push({
          model: modelName,
          status: 'SUCCESS',
          response: text.substring(0, 100) + '...'
        });
        break; // If one works, we can stop testing
      } catch (error: any) {
        results.push({
          model: modelName,
          status: 'ERROR',
          error: error.message
        });
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      results,
      message: 'Model testing complete'
    });
  } catch (error: any) {
    console.error('Error testing models:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
}