'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Loader2, 
  Sparkles,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  Plane,
  Hotel,
  Utensils,
  Camera
} from 'lucide-react';
import { TripPlannerService } from '@/lib/gemini';

const tripPlanner = new TripPlannerService();

interface TripPlannerProps {
  onPlanGenerated?: (plan: any) => void;
}

export function AITripPlanner({ onPlanGenerated }: TripPlannerProps) {
  const [formData, setFormData] = useState({
    destination: '',
    duration: 7,
    budget: 2000,
    interests: [] as string[],
    travelStyle: '',
    groupSize: 2
  });
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [error, setError] = useState('');

  const interestOptions = [
    'Culture & History', 'Food & Dining', 'Adventure & Sports', 'Nature & Wildlife',
    'Art & Museums', 'Nightlife & Entertainment', 'Shopping', 'Photography',
    'Architecture', 'Local Experiences', 'Wellness & Spa', 'Beaches',
    'Mountains', 'Cities', 'Rural Areas', 'Festivals & Events'
  ];

  const travelStyles = [
    'Budget Backpacker', 'Mid-range Comfort', 'Luxury Experience',
    'Business Travel', 'Family Vacation', 'Romantic Getaway',
    'Adventure Seeker', 'Cultural Immersion', 'Relaxation & Wellness'
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGeneratePlan = async () => {
    if (!formData.destination.trim()) {
      setError('Please enter a destination');
      return;
    }

    if (formData.interests.length === 0) {
      setError('Please select at least one interest');
      return;
    }

    if (!formData.travelStyle) {
      setError('Please select a travel style');
      return;
    }

  setLoading(true);
  setError('');
  if (process.env.NODE_ENV !== 'production') console.log('Starting trip plan generation with data:', formData);

    try {
      const plan = await tripPlanner.generateItinerary(formData);
  if (process.env.NODE_ENV !== 'production') console.log('Trip plan generated successfully:', plan);
      setGeneratedPlan(plan);
      if (onPlanGenerated) {
        onPlanGenerated(plan);
      }
    } catch (err) {
      console.error('Trip planning error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate trip plan. Please try again.';
      setError(errorMessage);
      
      // Show additional context if it's an API-related error
      if (errorMessage.includes('API')) {
        setError(errorMessage + ' Please check your internet connection and API configuration.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">AI Trip Planner</CardTitle>
          <p className="text-muted-foreground">
            Let our AI create a personalized itinerary just for you
          </p>
        </CardHeader>
      </Card>

      {/* Trip Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            Plan Your Perfect Trip
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Destination
            </Label>
            <Input
              id="destination"
              placeholder="e.g., Paris, France or Tokyo, Japan"
              value={formData.destination}
              onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
            />
          </div>

          {/* Duration and Group Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Duration (days)
              </Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="30"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groupSize" className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Group Size
              </Label>
              <Input
                id="groupSize"
                type="number"
                min="1"
                max="20"
                value={formData.groupSize}
                onChange={(e) => setFormData(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Total Budget (USD)
            </Label>
            <Input
              id="budget"
              type="number"
              min="100"
              step="100"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
            />
            <p className="text-xs text-muted-foreground">
              ${Math.round(formData.budget / formData.duration)} per day for {formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}
            </p>
          </div>

          {/* Travel Style */}
          <div className="space-y-2">
            <Label>Travel Style</Label>
            <Select value={formData.travelStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, travelStyle: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your travel style" />
              </SelectTrigger>
              <SelectContent>
                {travelStyles.map((style) => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label>Interests & Preferences</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {interestOptions.map((interest) => (
                <Badge
                  key={interest}
                  variant={formData.interests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer justify-center p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Selected: {formData.interests.length} interests
            </p>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGeneratePlan} 
            disabled={loading}
            className="w-full h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating Your Perfect Trip...
              </>
            ) : (
              <>
                <Brain className="h-5 w-5 mr-2" />
                Generate AI Trip Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Plan Display */}
      {generatedPlan && (
        <div className="space-y-6">
          {/* Plan Summary */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <CheckCircle className="h-5 w-5 mr-2" />
                Your Personalized Trip Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">{generatedPlan.summary}</p>
              {generatedPlan.totalEstimatedCost && (
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-800">
                    Total Cost: ${generatedPlan.totalEstimatedCost}
                  </Badge>
                  <Badge variant="outline">
                    ${Math.round(generatedPlan.totalEstimatedCost / formData.duration)} per day
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily Itinerary */}
          {generatedPlan.dailyItinerary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Daily Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedPlan.dailyItinerary.map((day: any, index: number) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">Day {day.day}: {day.title}</h3>
                          {day.estimatedDailyCost && (
                            <Badge variant="outline">${day.estimatedDailyCost}/day</Badge>
                          )}
                        </div>
                        {day.activities && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium flex items-center">
                              <Camera className="h-4 w-4 mr-1" />
                              Activities
                            </h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              {day.activities.map((activity: string, i: number) => (
                                <li key={i}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {day.accommodationSuggestion && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <h4 className="text-sm font-medium flex items-center mb-1">
                              <Hotel className="h-4 w-4 mr-1" />
                              Accommodation
                            </h4>
                            <p className="text-sm text-muted-foreground">{day.accommodationSuggestion}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Budget Breakdown */}
          {generatedPlan.budgetBreakdown && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Budget Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(generatedPlan.budgetBreakdown).map(([category, amount]) => (
                    <div key={category} className="text-center p-3 border rounded-lg">
                      <div className="text-lg font-semibold">${amount as number}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Accommodation Recommendations */}
          {generatedPlan.accommodationRecommendations && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hotel className="h-5 w-5 mr-2" />
                  Recommended Accommodations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {generatedPlan.accommodationRecommendations.map((accommodation: any, index: number) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{accommodation.name}</h3>
                          <Badge variant="outline">{accommodation.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{accommodation.priceRange}</p>
                        <p className="text-sm mb-3">{accommodation.location}</p>
                        {accommodation.features && (
                          <div className="flex flex-wrap gap-1">
                            {accommodation.features.map((feature: string, i: number) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips and Advice */}
          <div className="grid md:grid-cols-2 gap-6">
            {generatedPlan.culturalTips && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cultural Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {generatedPlan.culturalTips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {generatedPlan.safetyAdvice && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Safety Advice</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {generatedPlan.safetyAdvice.map((advice: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{advice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}