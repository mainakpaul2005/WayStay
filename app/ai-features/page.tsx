'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic'
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
// Dynamically load heavier AI feature components to reduce initial JS bundle
const AITripPlanner = dynamic(() => import('@/components/features/AITripPlanner').then(mod => mod.AITripPlanner))
const AIConcierge = dynamic(() => import('@/components/features/AIConcierge').then(mod => mod.AIConcierge))
const AIPricePrediction = dynamic(() => import('@/components/features/AIPricePrediction').then(mod => mod.AIPricePrediction))
const AIBudgetPlanner = dynamic(() => import('@/components/features/AIBudgetPlanner').then(mod => mod.AIBudgetPlanner))
const AITranslationService = dynamic(() => import('@/components/features/AITranslationService').then(mod => mod.AITranslationService))

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
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                AI Features
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Smart tools powered by AI to help plan your trips, find deals, and get instant help.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <Zap className="h-3 w-3 mr-1" />
                Gemini AI
              </Badge>
              <Badge variant="secondary">
                <Globe className="h-3 w-3 mr-1" />
                Works Worldwide
              </Badge>
              <Badge variant="secondary">Beta</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Pick a feature</h2>
          <p className="text-muted-foreground">
            Try out our AI tools to help with your travel planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {aiFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className={`cursor-pointer hover:border-primary/50 transition-all ${
                  activeFeature === feature.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardHeader>
                  <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 mb-3">
                    {feature.features.map((feat, index) => (
                      <li key={index} className="flex items-start text-sm text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={activeFeature === feature.id ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {activeFeature === feature.id ? 'Active' : 'Try it'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Active Feature Component */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl shadow-2xl shadow-primary/5 p-8">
          {ActiveComponent && <ActiveComponent />}
        </div>

        {/* AI Capabilities Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Intelligent Personalization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our AI learns from your preferences and travel history to provide increasingly personalized recommendations and insights.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Real-time Data Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access live market data, pricing trends, and availability information to make informed travel decisions instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>24/7 Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get instant assistance anytime, anywhere. Our AI never sleeps and is always ready to help with your travel needs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Ready to Experience AI-Powered Travel?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of travelers who are already using WayStay&apos;s AI features to plan better trips, save money, and create unforgettable memories.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="px-8 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all">
                  <Star className="h-5 w-5 mr-2" />
                  Start Planning Your Trip
                </Button>
                <Button variant="outline" size="lg" className="px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all">
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