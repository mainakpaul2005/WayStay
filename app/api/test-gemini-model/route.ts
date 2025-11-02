import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
  if (process.env.NODE_ENV !== 'production') console.log('Testing Gemini API with different model names...');
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try different model names to find the working one
    const modelsToTest = [
      'gemini-2.5-flash',
      'gemini-2.0-flash-exp',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-pro'
    ];
    
    for (const modelName of modelsToTest) {
      try {
  if (process.env.NODE_ENV !== 'production') console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent('Say "Hello World" in JSON format');
        const response = await result.response;
        const text = response.text();
        
  if (process.env.NODE_ENV !== 'production') console.log(`SUCCESS with model ${modelName}:`, text);
        
        return NextResponse.json({ 
          success: true, 
          workingModel: modelName,
          response: text,
          message: `Successfully connected with ${modelName}!` 
        });
      } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') console.log(`FAILED with model ${modelName}:`, error.message);
        continue;
      }
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'None of the tested models worked',
      testedModels: modelsToTest
    }, { status: 500 });
    
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
}