'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  MapPin,
  Clock,
  BarChart3,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { PricePredictionService } from '@/lib/gemini';

const pricePredictionService = new PricePredictionService();

interface PriceTrend {
  period: string;
  price: number;
  change: number;
  confidence: number;
}

interface PricePredictionProps {
  destination?: string;
  propertyType?: string;
}

export function AIPricePrediction({ destination: initialDestination, propertyType: initialPropertyType }: PricePredictionProps) {
  const [formData, setFormData] = useState({
    destination: initialDestination || '',
    propertyType: initialPropertyType || '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const propertyTypes = [
    'Apartment', 'House', 'Villa', 'Condo', 'Hotel Room', 
    'Studio', 'Loft', 'Cabin', 'Townhouse', 'Penthouse'
  ];

  const calculateDuration = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const duration = calculateDuration();

  const handlePrediction = async () => {
    if (!formData.destination || !formData.checkIn || !formData.checkOut) {
      setError('Please fill in all required fields');
      return;
    }

    if (duration <= 0) {
      setError('Check-out date must be after check-in date');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await pricePredictionService.predictPriceChanges(
        formData.destination,
        [formData.checkIn, formData.checkOut],
        formData.propertyType || 'Apartment'
      );

      setPrediction(result);
    } catch (err) {
      setError('Failed to generate price prediction. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="h-4 w-4 text-red-500" />;
    if (change < 0) return <ArrowDownRight className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-red-600';
    if (change < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-0">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">AI Price Prediction</CardTitle>
          <p className="text-muted-foreground">
            Get intelligent price forecasts and optimal booking recommendations
          </p>
        </CardHeader>
      </Card>

      {/* Prediction Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Price Analysis Request
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
              placeholder="e.g., Paris, New York, Tokyo"
              value={formData.destination}
              onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
            />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn" className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Check-in
              </Label>
              <Input
                id="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out</Label>
              <Input
                id="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              max="16"
              value={formData.guests}
              onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            />
          </div>

          {duration > 0 && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm">
                <strong>Duration:</strong> {duration} night{duration !== 1 ? 's' : ''} 
                {formData.checkIn && formData.checkOut && (
                  <span className="ml-2 text-muted-foreground">
                    ({formatDate(formData.checkIn)} → {formatDate(formData.checkOut)})
                  </span>
                )}
              </p>
            </div>
          )}

          <Button 
            onClick={handlePrediction} 
            disabled={loading || !formData.destination || !formData.checkIn || !formData.checkOut}
            className="w-full h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Market Data...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Get AI Price Prediction
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {prediction && (
        <div className="space-y-6">
          {/* Current Price Analysis */}
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <DollarSign className="h-5 w-5 mr-2" />
                Current Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    ${prediction.currentPrice}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Average Price</div>
                  <div className="text-xs text-blue-600 mt-1">per night</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold">
                    ${Math.round(prediction.currentPrice * duration)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Stay Cost</div>
                  <div className="text-xs text-muted-foreground mt-1">{duration} nights</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    {getPriceChangeIcon(prediction.marketTrend)}
                    <span className={`text-2xl font-semibold ${getPriceChangeColor(prediction.marketTrend)}`}>
                      {Math.abs(prediction.marketTrend)}%
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">Market Trend</div>
                  <div className="text-xs text-muted-foreground mt-1">vs last month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Forecast */}
          {prediction.priceForecast && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Price Forecast Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prediction.priceForecast.map((forecast: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium">{forecast.period}</div>
                        <Badge variant={forecast.change > 0 ? "destructive" : forecast.change < 0 ? "default" : "secondary"}>
                          {forecast.change > 0 ? '+' : ''}{forecast.change}%
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${forecast.price}</div>
                        <div className="text-xs text-muted-foreground">
                          Confidence: {forecast.confidence}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Best Time to Book */}
            {prediction.bestTimeToBook && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Best Time to Book
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">{prediction.bestTimeToBook.recommendation}</div>
                      <div className="text-sm text-green-600 mt-1">{prediction.bestTimeToBook.reason}</div>
                    </div>
                    {prediction.bestTimeToBook.potentialSavings && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Potential Savings:</span>
                        <Badge className="bg-green-100 text-green-800">
                          ${prediction.bestTimeToBook.potentialSavings}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Market Insights */}
            {prediction.marketInsights && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Market Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {prediction.marketInsights.map((insight: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{insight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Confidence Score */}
          {prediction.confidenceScore && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Prediction Confidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Overall Confidence</span>
                    <span className="font-semibold">{prediction.confidenceScore}%</span>
                  </div>
                  <Progress value={prediction.confidenceScore} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    {prediction.confidenceScore >= 80 && "High confidence - predictions are very reliable"}
                    {prediction.confidenceScore >= 60 && prediction.confidenceScore < 80 && "Good confidence - predictions are generally reliable"}
                    {prediction.confidenceScore < 60 && "Moderate confidence - consider as rough estimates"}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Alternative Dates */}
          {prediction.alternativeDates && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Alternative Date Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {prediction.alternativeDates.map((alt: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <div className="font-medium">{alt.period}</div>
                        <div className="text-sm text-muted-foreground">{alt.reason}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${alt.price}</div>
                        <Badge variant="outline" className="text-xs">
                          Save ${prediction.currentPrice - alt.price}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}