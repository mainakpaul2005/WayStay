'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Key,
  Zap
} from 'lucide-react';

export default function APITestPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [testing, setTesting] = useState(false);

  const testGeminiAPI = async () => {
    setTesting(true);
    setTestResult('');

    try {
      // Test with a simple API call
      const response = await fetch('/api/test-gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Say hello in a friendly way. Keep it short.'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setTestResult(`SUCCESS: ${data.response}`);
      } else {
        setTestResult(`FAILED: ${data.error}`);
      }

    } catch (error) {
      console.error('API test error:', error);
      setTestResult(`FAILED: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setTesting(false);
    }
  };

  const testDirectGemini = async () => {
    setTesting(true);
    setTestResult('');

    try {
      // Import and test Gemini directly
      const { getGeminiModel } = await import('@/lib/gemini');
      const model = getGeminiModel();
      
      if (!model) {
        throw new Error('Failed to initialize Gemini model');
      }

      const result = await model.generateContent('Say "Hello from Gemini!" and nothing else.');
      const response = result.response;
      const text = response.text();

      setTestResult(`SUCCESS: ${text}`);

    } catch (error) {
      console.error('Direct Gemini test error:', error);
      setTestResult(`FAILED: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Gemini API Test</h1>
        <p className="text-muted-foreground">
          Test your Gemini API connection to troubleshoot AI features
        </p>
      </div>

      <div className="space-y-6">
        {/* API Key Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              API Key Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Environment Variable:</span>
                <Badge variant={process.env.NEXT_PUBLIC_GEMINI_API_KEY ? "default" : "destructive"}>
                  {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? 'SET' : 'MISSING'}
                </Badge>
              </div>
              {process.env.NEXT_PUBLIC_GEMINI_API_KEY && (
                <div className="flex items-center justify-between">
                  <span>Key Preview:</span>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {process.env.NEXT_PUBLIC_GEMINI_API_KEY.substring(0, 10)}...
                  </code>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Direct API Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Direct API Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Test the Gemini API directly to verify connectivity and authentication.
              </p>
              
              <Button 
                onClick={testDirectGemini}
                disabled={testing || !process.env.NEXT_PUBLIC_GEMINI_API_KEY}
                className="w-full"
              >
                {testing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testing API...
                  </>
                ) : (
                  'Test Gemini API'
                )}
              </Button>

              {testResult && (
                <Alert variant={testResult.startsWith('SUCCESS') ? "default" : "destructive"}>
                  {testResult.startsWith('SUCCESS') ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription className="text-sm">
                    {testResult}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Common Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Common Issues & Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <strong>API Key Issues:</strong>
                <ul className="list-disc list-inside mt-1 ml-4">
                  <li>Ensure your API key is valid and active</li>
                  <li>Check that Gemini AI API is enabled in Google Cloud Console</li>
                  <li>Verify the key has proper permissions</li>
                </ul>
              </div>
              
              <div>
                <strong>Quota Issues:</strong>
                <ul className="list-disc list-inside mt-1 ml-4">
                  <li>Check your API usage in Google Cloud Console</li>
                  <li>Ensure you haven't exceeded rate limits</li>
                  <li>Verify billing is enabled if required</li>
                </ul>
              </div>

              <div>
                <strong>Content Safety:</strong>
                <ul className="list-disc list-inside mt-1 ml-4">
                  <li>Content may be filtered for safety reasons</li>
                  <li>Try rephrasing requests to be more specific</li>
                  <li>Avoid potentially sensitive topics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}