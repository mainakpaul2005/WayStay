'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  MessageCircle, 
  BarChart3, 
  Calculator, 
  Languages,
  Sparkles,
  Zap,
  Globe,
  Shield,
  Target,
  TrendingUp,
  Users,
  Clock,
  Star,
  Lightbulb,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { 
  AITripPlanner,
  AIConcierge,
  AIPricePrediction,
  AIBudgetPlanner,
  AITranslationService
} from '@/components/features';

const aiFeatures = [
  {
    id: 'trip-planner',
    title: 'AI Trip Planner',
    description: 'Create personalized itineraries with AI-powered recommendations',
    icon: Brain,
    color: 'from-blue-500 to-purple-600',
    features: ['Personalized itineraries', 'Smart recommendations', 'Budget optimization', 'Cultural insights'],
    component: AITripPlanner
  },
  {
    id: 'concierge',
    title: '24/7 AI Concierge',
    description: 'Get instant help with bookings, recommendations, and travel questions',
    icon: MessageCircle,
    color: 'from-green-500 to-blue-600',
    features: ['24/7 availability', 'Multi-language support', 'Booking assistance', 'Local recommendations'],
    component: AIConcierge
  },
  {
    id: 'price-prediction',
    title: 'Smart Price Prediction',
    description: 'AI-powered price forecasting to help you book at the best time',
    icon: BarChart3,
    color: 'from-orange-500 to-red-600',
    features: ['Market analysis', 'Price forecasting', 'Best booking time', 'Savings opportunities'],
    component: AIPricePrediction
  },
  {
    id: 'budget-planner',
    title: 'AI Budget Planner',
    description: 'Comprehensive travel budgets with smart cost analysis',
    icon: Calculator,
    color: 'from-purple-500 to-pink-600',
    features: ['Detailed budgets', 'Cost breakdown', 'Saving tips', 'Emergency planning'],
    component: AIBudgetPlanner
  },
  {
    id: 'translation',
    title: 'AI Translation Service',
    description: 'Break language barriers with intelligent translation',
    icon: Languages,
    color: 'from-indigo-500 to-purple-600',
    features: ['Real-time translation', 'Cultural context', 'Common phrases', '50+ languages'],
    component: AITranslationService
  }
];

export default function AIFeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState('trip-planner');

  const ActiveComponent = aiFeatures.find(f => f.id === activeFeature)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                AI-Powered Travel Features
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Experience the future of travel with WayStay&apos;s intelligent AI features designed to make your journey seamless, affordable, and unforgettable.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="px-4 py-2 bg-blue-600 text-white">
                <Zap className="h-4 w-4 mr-1" />
                Powered by Gemini AI
              </Badge>
              <Badge className="px-4 py-2 bg-green-600 text-white">
                <Globe className="h-4 w-4 mr-1" />
                Available Worldwide
              </Badge>
              <Badge className="px-4 py-2 bg-purple-600 text-white">
                <Shield className="h-4 w-4 mr-1" />
                Enterprise Grade
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose an AI Feature to Explore</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each feature is powered by advanced AI to provide you with intelligent, personalized travel assistance.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {aiFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  activeFeature === feature.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <p className="text-gray-600">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {feature.features.map((feat, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant={activeFeature === feature.id ? "default" : "outline"}
                    className="w-full"
                  >
                    {activeFeature === feature.id ? 'Currently Active' : 'Try This Feature'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Active Feature Component */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {ActiveComponent && <ActiveComponent />}
        </div>

        {/* AI Capabilities Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle>Intelligent Personalization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our AI learns from your preferences and travel history to provide increasingly personalized recommendations and insights.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle>Real-time Data Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access live market data, pricing trends, and availability information to make informed travel decisions instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <CardTitle>24/7 Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get instant assistance anytime, anywhere. Our AI never sleeps and is always ready to help with your travel needs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience AI-Powered Travel?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of travelers who are already using WayStay&apos;s AI features to plan better trips, save money, and create unforgettable memories.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="px-8">
                  <Star className="h-5 w-5 mr-2" />
                  Start Planning Your Trip
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Learn More About AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}