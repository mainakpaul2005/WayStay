import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Get the Gemini model
export const getGeminiModel = () => {
  // Use Gemini Flash 2.5 for the latest high-speed capabilities
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

// Trip Planning Service
export class TripPlannerService {
  private model;

  constructor() {
    this.model = getGeminiModel();
  }

  async generateItinerary(params: {
    destination: string;
    duration: number;
    budget: number;
    interests: string[];
    travelStyle: string;
    groupSize: number;
  }) {
    const prompt = `
    You are a professional travel planner. Create a detailed travel itinerary in valid JSON format.

    TRIP REQUIREMENTS:
    - Destination: ${params.destination}
    - Duration: ${params.duration} days
    - Total Budget: $${params.budget} USD
    - Interests: ${params.interests.join(', ')}
    - Travel Style: ${params.travelStyle}
    - Group Size: ${params.groupSize} people

    IMPORTANT: Return ONLY valid JSON with no markdown formatting, explanations, or additional text.

    Required JSON structure:
    {
      "summary": "Brief trip description",
      "totalEstimatedCost": ${params.budget},
      "dailyItinerary": [
        {
          "day": 1,
          "title": "Day 1 title",
          "activities": ["Activity 1", "Activity 2", "Activity 3"],
          "accommodationSuggestion": "Hotel recommendation",
          "estimatedDailyCost": ${Math.round(params.budget / params.duration)},
          "tips": ["Practical tip 1", "Practical tip 2"]
        }
      ],
      "accommodationRecommendations": [
        {
          "name": "Hotel Name",
          "type": "hotel/hostel/apartment",
          "priceRange": "$X-$Y per night",
          "features": ["Feature 1", "Feature 2"],
          "location": "Area description"
        }
      ],
      "budgetBreakdown": {
        "accommodation": ${Math.round(params.budget * 0.4)},
        "food": ${Math.round(params.budget * 0.25)},
        "activities": ${Math.round(params.budget * 0.25)},
        "transportation": ${Math.round(params.budget * 0.1)}
      },
      "culturalTips": ["Cultural tip 1", "Cultural tip 2", "Cultural tip 3"],
      "safetyAdvice": ["Safety tip 1", "Safety tip 2", "Safety tip 3"]
    }

    Create ${params.duration} days in dailyItinerary. Focus on ${params.interests.join(', ')} interests. Budget must total $${params.budget}.
    `;

    try {
  if (process.env.NODE_ENV !== 'production') console.log('Generating itinerary for:', params);
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      let text = response.text().trim();
      
      // Clean up common formatting issues
      text = text.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
      
      // Find JSON content by looking for first { and last }
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        text = text.substring(firstBrace, lastBrace + 1);
      }
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('Raw AI response length:', text.length);
        console.log('Cleaned AI response preview:', text.substring(0, 300));
      }
      
      // Try to parse as JSON, fallback to structured text if parsing fails
      try {
        const parsed = JSON.parse(text);
  if (process.env.NODE_ENV !== 'production') console.log('Successfully parsed JSON response');
        
        // Validate that we have the essential fields
        if (!parsed.summary || !parsed.dailyItinerary || !Array.isArray(parsed.dailyItinerary)) {
          console.warn('Missing essential fields, using fallback response');
          throw new Error('Invalid response structure');
        }
        
        return parsed;
      } catch (parseError) {
        if (process.env.NODE_ENV !== 'production') console.warn('Failed to parse JSON, creating fallback response:', parseError);
        
        // Create a fallback structured response
        return {
          summary: `A ${params.duration}-day trip to ${params.destination} for ${params.groupSize} travelers with a budget of $${params.budget}.`,
          totalEstimatedCost: params.budget,
          dailyItinerary: [
            {
              day: 1,
              title: "Arrival Day",
              activities: [
                "Check into accommodation",
                "Explore nearby area",
                "Welcome dinner"
              ],
              estimatedDailyCost: Math.round(params.budget / params.duration)
            }
          ],
          budgetBreakdown: {
            accommodation: Math.round(params.budget * 0.4),
            food: Math.round(params.budget * 0.3),
            activities: Math.round(params.budget * 0.2),
            transportation: Math.round(params.budget * 0.1)
          },
          culturalTips: [
            "Research local customs and etiquette",
            "Learn basic phrases in the local language",
            "Respect local traditions and dress codes"
          ],
          safetyAdvice: [
            "Keep copies of important documents",
            "Stay aware of your surroundings",
            "Have emergency contacts readily available"
          ],
          rawResponse: text,
          note: "This is a fallback response due to AI parsing issues. The full AI response is available in rawResponse."
        };
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error generating itinerary:', error);
        console.error('Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
      }
      
      // Provide more specific error information
      if (error instanceof Error) {
        if (error.message.includes('API_KEY')) {
          throw new Error('Invalid or missing API key. Please check your Gemini API configuration.');
        } else if (error.message.includes('QUOTA')) {
          throw new Error('API quota exceeded. Please try again later or check your Gemini API usage.');
        } else if (error.message.includes('SAFETY')) {
          throw new Error('Content was filtered for safety. Please try rephrasing your request.');
        }
      }
      
      throw new Error(`Failed to generate itinerary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getMoodBasedRecommendations(mood: string, destination: string, preferences: string[]) {
    const prompt = `
    Based on the mood "${mood}" and destination "${destination}", recommend accommodations that would match this emotional state.
    
    User preferences: ${preferences.join(', ')}
    
    Consider factors like:
    - Atmosphere and ambiance
    - Location characteristics
    - Property features that enhance the mood
    - Activities nearby that align with the mood
    
    Provide 5 accommodation recommendations in JSON format:
    {
      "recommendations": [
        {
          "name": "property name",
          "type": "accommodation type",
          "moodMatch": "explanation of how it matches the mood",
          "atmosphere": "description of atmosphere",
          "keyFeatures": ["feature1", "feature2"],
          "priceRange": "price range",
          "location": "area description",
          "perfectFor": "why it's perfect for this mood"
        }
      ],
      "moodAnalysis": "explanation of the mood and what type of accommodation would suit it"
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch {
        return {
          recommendations: [],
          moodAnalysis: text,
          rawResponse: text
        };
      }
    } catch (error) {
      console.error('Error getting mood-based recommendations:', error);
      throw new Error('Failed to get recommendations');
    }
  }
}

// Translation Service
export class TranslationService {
  private model;

  constructor() {
    this.model = getGeminiModel();
  }

  async translateText(text: string, targetLanguage: string, sourceLanguage = 'auto') {
    const prompt = `
    Translate the following text to ${targetLanguage}:
    
    "${text}"
    
    Provide only the translation, no additional explanation.
    If the source language is not ${targetLanguage}, translate it. 
    If it's already in ${targetLanguage}, return the original text.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error translating text:', error);
      throw new Error('Translation failed');
    }
  }

  async getCulturalContext(text: string, targetCountry: string) {
    const prompt = `
    Provide cultural context for this message when communicating in ${targetCountry}:
    
    "${text}"
    
    Explain:
    1. Cultural appropriateness
    2. Any potential misunderstandings
    3. Suggested polite alternatives if needed
    4. Cultural etiquette tips
    
    Format as JSON:
    {
      "isAppropriate": boolean,
      "culturalNotes": "explanation",
      "suggestedAlternative": "alternative text if needed",
      "etiquetteTips": ["tip1", "tip2"]
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch {
        return {
          isAppropriate: true,
          culturalNotes: text,
          rawResponse: text
        };
      }
    } catch (error) {
      console.error('Error getting cultural context:', error);
      throw new Error('Failed to get cultural context');
    }
  }
}

// Price Prediction Service
export class PricePredictionService {
  private model;

  constructor() {
    this.model = getGeminiModel();
  }

  async predictPriceChanges(destination: string, dates: string[], propertyType: string) {
    const prompt = `
    Analyze and predict price changes for ${propertyType} accommodations in ${destination} for the following dates: ${dates.join(', ')}.
    
    Consider factors like:
    - Seasonal trends
    - Local events and holidays
    - Historical booking patterns
    - Market demand indicators
    - Weather patterns
    
    Provide prediction in JSON format:
    {
      "currentPriceTrend": "increasing/decreasing/stable",
      "bestBookingTime": "when to book for best prices",
      "priceChangePercentage": "estimated percentage change",
      "factors": ["factor1", "factor2"],
      "recommendations": {
        "shouldBookNow": boolean,
        "waitForDrop": boolean,
        "alternativeDates": ["date1", "date2"],
        "reasoning": "explanation"
      },
      "seasonalInsights": "seasonal pricing information"
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch {
        return {
          currentPriceTrend: 'stable',
          bestBookingTime: 'Book within the next 2 weeks',
          recommendations: {
            shouldBookNow: true,
            reasoning: text
          },
          rawResponse: text
        };
      }
    } catch (error) {
      console.error('Error predicting prices:', error);
      throw new Error('Failed to predict prices');
    }
  }
}

// Smart Budget Planner
export class BudgetPlannerService {
  private model;

  constructor() {
    this.model = getGeminiModel();
  }

  async calculateTotalTripCost(params: {
    destination: string;
    duration: number;
    travelers: number;
    accommodationType: string;
    travelStyle: string;
    activities: string[];
  }) {
    const prompt = `
    Calculate a comprehensive trip budget for:
    
    Destination: ${params.destination}
    Duration: ${params.duration} days
    Travelers: ${params.travelers} people
    Accommodation Type: ${params.accommodationType}
    Travel Style: ${params.travelStyle}
    Planned Activities: ${params.activities.join(', ')}
    
    Include ALL costs:
    - Accommodation (with taxes and fees)
    - Flights/transportation
    - Food and dining
    - Activities and entertainment
    - Local transportation
    - Travel insurance
    - Visa fees (if applicable)
    - Shopping and souvenirs
    - Emergency fund
    - Tips and service charges
    - Currency exchange fees
    - Communication (roaming/local SIM)
    
    Provide detailed breakdown in JSON:
    {
      "totalEstimatedCost": number,
      "dailyAverage": number,
      "breakdown": {
        "accommodation": {"amount": number, "details": "description"},
        "flights": {"amount": number, "details": "description"},
        "food": {"amount": number, "details": "description"},
        "activities": {"amount": number, "details": "description"},
        "localTransport": {"amount": number, "details": "description"},
        "insurance": {"amount": number, "details": "description"},
        "visaFees": {"amount": number, "details": "description"},
        "shopping": {"amount": number, "details": "description"},
        "emergency": {"amount": number, "details": "description"},
        "miscellaneous": {"amount": number, "details": "description"}
      },
      "hiddenCosts": ["cost1", "cost2"],
      "savingTips": ["tip1", "tip2"],
      "budgetOptimization": {
        "cheaperAlternatives": ["alternative1", "alternative2"],
        "freeActivities": ["activity1", "activity2"]
      }
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch {
        return {
          totalEstimatedCost: 0,
          dailyAverage: 0,
          rawResponse: text
        };
      }
    } catch (error) {
      console.error('Error calculating budget:', error);
      throw new Error('Failed to calculate budget');
    }
  }
}

// AI Concierge Service
export class ConciergeService {
  private model;

  constructor() {
    this.model = getGeminiModel();
  }

  async handleQuery(query: string, context: {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    travelers?: number;
    currentBooking?: any;
  }) {
    const prompt = `
    You are WayStay's AI Concierge. Help the user with their travel query.
    
    User Query: "${query}"
    
    Context:
    ${context.destination ? `Destination: ${context.destination}` : ''}
    ${context.checkIn ? `Check-in: ${context.checkIn}` : ''}
    ${context.checkOut ? `Check-out: ${context.checkOut}` : ''}
    ${context.travelers ? `Travelers: ${context.travelers}` : ''}
    
    Provide helpful, accurate, and friendly assistance. If you need more information, ask clarifying questions.
    
    Respond in JSON format:
    {
      "response": "your helpful response",
      "suggestions": ["suggestion1", "suggestion2"],
      "needsMoreInfo": boolean,
      "clarifyingQuestions": ["question1", "question2"],
      "actionable": boolean,
      "nextSteps": ["step1", "step2"]
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch {
        return {
          response: text,
          suggestions: [],
          needsMoreInfo: false,
          actionable: true,
          nextSteps: []
        };
      }
    } catch (error) {
      console.error('Error handling concierge query:', error);
      throw new Error('Concierge service unavailable');
    }
  }
}

// Safety Analysis Service
export class SafetyAnalysisService {
  private model;

  constructor() {
    this.model = getGeminiModel();
  }

  async analyzeNeighborhoodSafety(location: string, timeOfTravel: string) {
    const prompt = `
    Analyze the safety of this location for travelers:
    
    Location: ${location}
    Travel Time: ${timeOfTravel}
    
    Provide a comprehensive safety assessment including:
    1. Overall safety rating (1-10)
    2. Crime statistics and trends
    3. Areas to avoid
    4. Safe areas for tourists
    5. Transportation safety
    6. Health and medical considerations
    7. Natural disaster risks
    8. Political stability
    9. COVID-19 considerations
    10. Safety tips for travelers
    
    Format as JSON:
    {
      "overallSafetyScore": number,
      "safetyLevel": "very-safe/safe/moderate/caution/avoid",
      "crimeAnalysis": {
        "pettyTheft": "low/medium/high",
        "violentCrime": "low/medium/high",
        "scams": "low/medium/high",
        "trends": "description"
      },
      "safestAreas": ["area1", "area2"],
      "areasToAvoid": ["area1", "area2"],
      "transportationSafety": "assessment",
      "healthConsiderations": ["consideration1", "consideration2"],
      "emergencyContacts": {
        "police": "number",
        "medical": "number",
        "embassy": "number"
      },
      "safetyTips": ["tip1", "tip2"],
      "bestPractices": ["practice1", "practice2"]
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch {
        return {
          overallSafetyScore: 7,
          safetyLevel: 'safe',
          safetyTips: [text],
          rawResponse: text
        };
      }
    } catch (error) {
      console.error('Error analyzing safety:', error);
      throw new Error('Safety analysis failed');
    }
  }
}

// Export all services
export const tripPlanner = new TripPlannerService();
export const translator = new TranslationService();
export const pricePredictor = new PricePredictionService();
export const budgetPlanner = new BudgetPlannerService();
export const concierge = new ConciergeService();
export const safetyAnalyzer = new SafetyAnalysisService();