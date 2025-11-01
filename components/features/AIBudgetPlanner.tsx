'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  DollarSign, 
  PieChart, 
  TrendingUp,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Car,
  ShoppingBag,
  Shield,
  MapPin,
  Calendar,
  Users,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  Target
} from 'lucide-react';
import { BudgetPlannerService } from '@/lib/gemini';

const budgetPlannerService = new BudgetPlannerService();

interface BudgetPlannerProps {
  destination?: string;
  duration?: number;
}

export function AIBudgetPlanner({ destination: initialDestination, duration: initialDuration }: BudgetPlannerProps) {
  const [formData, setFormData] = useState({
    destination: initialDestination || '',
    duration: initialDuration || 7,
    travelers: 2,
    accommodationType: '',
    travelStyle: '',
    activities: [] as string[]
  });
  const [budget, setBudget] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accommodationTypes = [
    'Budget Hostel', 'Mid-range Hotel', 'Luxury Hotel', 'Apartment/Airbnb',
    'Resort', 'Boutique Hotel', 'Guesthouse', 'Villa'
  ];

  const travelStyles = [
    'Budget Backpacker', 'Mid-range Comfort', 'Luxury Experience',
    'Business Travel', 'Family Vacation', 'Adventure Travel'
  ];

  const activityOptions = [
    'Museums & Galleries', 'Tours & Excursions', 'Adventure Sports', 'Nightlife',
    'Shopping', 'Spa & Wellness', 'Food Tours', 'Photography',
    'Cultural Experiences', 'Water Sports', 'Mountain Activities', 'City Tours'
  ];

  const handleActivityToggle = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleGenerateBudget = async () => {
    if (!formData.destination || !formData.accommodationType || !formData.travelStyle) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await budgetPlannerService.calculateTotalTripCost({
        destination: formData.destination,
        duration: formData.duration,
        travelers: formData.travelers,
        accommodationType: formData.accommodationType,
        travelStyle: formData.travelStyle,
        activities: formData.activities
      });

      setBudget(result);
    } catch (err) {
      setError('Failed to generate budget plan. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      accommodation: <Hotel className="h-4 w-4" />,
      flights: <Plane className="h-4 w-4" />,
      transport: <Car className="h-4 w-4" />,
      food: <Utensils className="h-4 w-4" />,
      activities: <Camera className="h-4 w-4" />,
      shopping: <ShoppingBag className="h-4 w-4" />,
      insurance: <Shield className="h-4 w-4" />,
      misc: <DollarSign className="h-4 w-4" />
    };
    return icons[category.toLowerCase()] || <DollarSign className="h-4 w-4" />;
  };

  const getBudgetStatusColor = (percentage: number) => {
    if (percentage <= 100) return 'bg-green-500';
    if (percentage <= 120) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">AI Budget Planner</CardTitle>
          <p className="text-muted-foreground">
            Create comprehensive travel budgets with AI-powered cost analysis
          </p>
        </CardHeader>
      </Card>

      {/* Budget Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Trip Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
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
              placeholder="e.g., Barcelona, Spain"
              value={formData.destination}
              onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
            />
          </div>

          {/* Duration and Travelers */}
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
                max="365"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelers" className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Number of Travelers
              </Label>
              <Input
                id="travelers"
                type="number"
                min="1"
                max="20"
                value={formData.travelers}
                onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          {/* Accommodation Type */}
          <div className="space-y-2">
            <Label>Accommodation Type</Label>
            <Select value={formData.accommodationType} onValueChange={(value) => setFormData(prev => ({ ...prev, accommodationType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select accommodation type" />
              </SelectTrigger>
              <SelectContent>
                {accommodationTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          {/* Activities */}
          <div className="space-y-3">
            <Label>Planned Activities</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {activityOptions.map((activity) => (
                <Badge
                  key={activity}
                  variant={formData.activities.includes(activity) ? "default" : "outline"}
                  className="cursor-pointer justify-center p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleActivityToggle(activity)}
                >
                  {activity}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Selected: {formData.activities.length} activities
            </p>
          </div>

          <Button 
            onClick={handleGenerateBudget} 
            disabled={loading}
            className="w-full h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Calculating Budget...
              </>
            ) : (
              <>
                <Calculator className="h-5 w-5 mr-2" />
                Generate AI Budget Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Budget Results */}
      {budget && (
        <div className="space-y-6">
          {/* Budget Summary */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <CheckCircle className="h-5 w-5 mr-2" />
                Your Complete Budget Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">
                    ${budget.totalBudget || budget.grandTotal}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Trip Cost</div>
                  <div className="text-xs text-green-600 mt-1">
                    ${Math.round((budget.totalBudget || budget.grandTotal) / formData.duration)} per day
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-blue-600">
                    ${Math.round((budget.totalBudget || budget.grandTotal) / formData.travelers)}
                  </div>
                  <div className="text-sm text-muted-foreground">Per Person</div>
                  <div className="text-xs text-blue-600 mt-1">
                    ${Math.round((budget.totalBudget || budget.grandTotal) / formData.travelers / formData.duration)} per day
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-purple-600">
                    {formData.travelers} travelers
                  </div>
                  <div className="text-sm text-muted-foreground">{formData.duration} days</div>
                  <div className="text-xs text-purple-600 mt-1">{formData.destination}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="breakdown" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
              <TabsTrigger value="timeline">Daily Budget</TabsTrigger>
              <TabsTrigger value="tips">Money-Saving Tips</TabsTrigger>
            </TabsList>

            {/* Cost Breakdown Tab */}
            <TabsContent value="breakdown" className="space-y-4">
              {budget.breakdown && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Detailed Cost Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(budget.breakdown).map(([category, details]: [string, any]) => (
                        <div key={category} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {getCategoryIcon(category)}
                              <h3 className="font-semibold capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold">${details.total || details}</div>
                              {details.total && (
                                <div className="text-xs text-muted-foreground">
                                  {Math.round((details.total / (budget.totalBudget || budget.grandTotal)) * 100)}% of total
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {details.daily && (
                            <div className="text-sm text-muted-foreground mb-2">
                              ${details.daily} per day
                            </div>
                          )}
                          
                          {details.description && (
                            <p className="text-sm text-muted-foreground">{details.description}</p>
                          )}
                          
                          {details.items && Array.isArray(details.items) && (
                            <div className="mt-3 space-y-1">
                              {details.items.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>{typeof item === 'string' ? item : item.name}</span>
                                  {typeof item === 'object' && item.cost && (
                                    <span className="font-medium">${item.cost}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="mt-3">
                            <Progress 
                              value={Math.round((details.total || details) / (budget.totalBudget || budget.grandTotal) * 100)} 
                              className="h-2" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Daily Budget Tab */}
            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Daily Budget Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {budget.dailyBreakdown ? (
                      Object.entries(budget.dailyBreakdown).map(([day, amount]: [string, any]) => (
                        <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{day}</div>
                            <div className="text-sm text-muted-foreground">
                              ${Math.round(amount / formData.travelers)} per person
                            </div>
                          </div>
                          <div className="text-xl font-semibold">${amount}</div>
                        </div>
                      ))
                    ) : (
                      <div className="grid gap-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Average Daily Budget</div>
                            <div className="text-sm text-muted-foreground">For {formData.travelers} travelers</div>
                          </div>
                          <div className="text-xl font-semibold">
                            ${Math.round((budget.totalBudget || budget.grandTotal) / formData.duration)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Per Person Daily</div>
                            <div className="text-sm text-muted-foreground">Individual budget</div>
                          </div>
                          <div className="text-xl font-semibold">
                            ${Math.round((budget.totalBudget || budget.grandTotal) / formData.duration / formData.travelers)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Money-Saving Tips Tab */}
            <TabsContent value="tips" className="space-y-4">
              <div className="grid gap-4">
                {budget.savingTips && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2" />
                        Money-Saving Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {budget.savingTips.map((tip: string, index: number) => (
                          <div key={index} className="flex items-start space-x-2">
                            <DollarSign className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {budget.budgetAlternatives && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Budget Alternatives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {Object.entries(budget.budgetAlternatives).map(([level, amount]: [string, any]) => (
                          <div key={level} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium capitalize">{level} Budget</div>
                              <div className="text-sm text-muted-foreground">
                                Alternative spending level
                              </div>
                            </div>
                            <Badge variant="outline" className="text-lg font-semibold">
                              ${amount}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {budget.emergencyFund && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-800">
                        <Shield className="h-5 w-5 mr-2" />
                        Emergency Fund Recommendation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Recommended Emergency Fund:</span>
                          <Badge className="bg-orange-100 text-orange-800">
                            ${budget.emergencyFund.amount}
                          </Badge>
                        </div>
                        <p className="text-sm text-orange-700">{budget.emergencyFund.reason}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}