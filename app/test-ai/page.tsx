'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Brain,
  MessageCircle,
  BarChart3,
  Calculator,
  Languages,
  TestTube
} from 'lucide-react';
import { 
  TripPlannerService,
  ConciergeService,
  PricePredictionService,
  BudgetPlannerService,
  TranslationService
} from '@/lib/gemini';

const services = [
  { name: 'Trip Planner', service: TripPlannerService, icon: Brain, test: 'generateItinerary' },
  { name: 'Concierge', service: ConciergeService, icon: MessageCircle, test: 'handleQuery' },
  { name: 'Price Prediction', service: PricePredictionService, icon: BarChart3, test: 'predictPriceChanges' },
  { name: 'Budget Planner', service: BudgetPlannerService, icon: Calculator, test: 'calculateTotalTripCost' },
  { name: 'Translation', service: TranslationService, icon: Languages, test: 'translateText' }
];

export default function AIFeaturesTest() {
  const [testResults, setTestResults] = useState<{ [key: string]: string }>({});
  const [testing, setTesting] = useState<{ [key: string]: boolean }>({});

  const testService = async (serviceName: string, ServiceClass: any, testMethod: string) => {
    setTesting(prev => ({ ...prev, [serviceName]: true }));
    
    try {
      const service = new ServiceClass();
      
      let result;
      switch (testMethod) {
        case 'generateItinerary':
          result = await service.generateItinerary({
            destination: 'Paris, France',
            duration: 3,
            budget: 1500,
            interests: ['Culture', 'Food'],
            travelStyle: 'Mid-range Comfort',
            groupSize: 2
          });
          break;
        case 'handleQuery':
          result = await service.handleQuery('What are the best restaurants nearby?', {
            destination: 'Paris',
            travelers: 2
          });
          break;
        case 'predictPriceChanges':
          result = await service.predictPriceChanges('Paris', ['2025-12-01', '2025-12-05'], 'Hotel');
          break;
        case 'calculateTotalTripCost':
          result = await service.calculateTotalTripCost({
            destination: 'Paris',
            duration: 3,
            travelers: 2,
            accommodationType: 'Mid-range Hotel',
            travelStyle: 'Comfort',
            activities: ['Museums', 'Food Tours']
          });
          break;
        case 'translateText':
          result = await service.translateText('Hello, how are you?', 'French');
          break;
        default:
          throw new Error('Unknown test method');
      }
      
      setTestResults(prev => ({ 
        ...prev, 
        [serviceName]: result ? 'SUCCESS' : 'FAILED - No response' 
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [serviceName]: `FAILED - ${error instanceof Error ? error.message : 'Unknown error'}` 
      }));
    } finally {
      setTesting(prev => ({ ...prev, [serviceName]: false }));
    }
  };

  const testAllServices = async () => {
    for (const { name, service, test } of services) {
      await testService(name, service, test);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">AI Features Test Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Test all AI features to ensure they're working properly with your Gemini API key.
        </p>
        <Button onClick={testAllServices} className="mb-6">
          <TestTube className="h-4 w-4 mr-2" />
          Test All Features
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ name, service, icon: Icon, test }) => (
          <Card key={name}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon className="h-5 w-5 mr-2" />
                {name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={() => testService(name, service, test)}
                  disabled={testing[name]}
                  className="w-full"
                  variant="outline"
                >
                  {testing[name] ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    `Test ${name}`
                  )}
                </Button>
                
                {testResults[name] && (
                  <Alert variant={testResults[name].startsWith('SUCCESS') ? "default" : "destructive"}>
                    {testResults[name].startsWith('SUCCESS') ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription className="text-sm">
                      {testResults[name]}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(testResults).length > 0 && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Test Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(testResults).map(([service, result]) => (
                  <div key={service} className="flex items-center justify-between">
                    <span>{service}:</span>
                    <Badge variant={result.startsWith('SUCCESS') ? "default" : "destructive"}>
                      {result.startsWith('SUCCESS') ? 'WORKING' : 'FAILED'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}