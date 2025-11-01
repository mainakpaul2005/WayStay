import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Filter,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      step: 1,
      title: "Search & Discover",
      description: "Enter your destination, dates, and number of guests to find available properties.",
      details: [
        "Use our smart search filters",
        "Browse verified properties",
        "Compare prices and amenities",
        "Read guest reviews"
      ],
      image: "🔍"
    },
    {
      step: 2,
      title: "Book with Confidence",
      description: "Choose your perfect stay and complete your booking with secure payment.",
      details: [
        "Instant or request-to-book options",
        "Secure payment processing",
        "Clear cancellation policies",
        "24/7 customer support"
      ],
      image: "🏠"
    },
    {
      step: 3,
      title: "Communicate with Host",
      description: "Connect with your host to arrange check-in and get local recommendations.",
      details: [
        "Built-in messaging system",
        "Pre-arrival instructions",
        "Local tips and recommendations",
        "Real-time support"
      ],
      image: "💬"
    },
    {
      step: 4,
      title: "Enjoy Your Stay",
      description: "Check in to your accommodation and enjoy a memorable travel experience.",
      details: [
        "Easy check-in process",
        "Access to amenities",
        "Host support during stay",
        "Emergency assistance"
      ],
      image: "✨"
    }
  ];

  const tips = [
    {
      icon: Search,
      title: "Book in Advance",
      description: "Popular destinations fill up quickly. Book early for better availability and prices."
    },
    {
      icon: Users,
      title: "Read Reviews",
      description: "Check guest reviews and host ratings to ensure you choose the right property."
    },
    {
      icon: MapPin,
      title: "Know the Location",
      description: "Research the neighborhood and nearby attractions before booking."
    },
    {
      icon: Calendar,
      title: "Flexible Dates",
      description: "Consider adjusting your travel dates for better rates and availability."
    }
  ];

  const safety = [
    "All hosts are verified with ID and background checks",
    "Properties are regularly inspected for safety standards",
    "Secure payment processing protects your financial information",
    "24/7 customer support for any issues during your stay",
    "Host liability insurance covers property damage",
    "Emergency contact system for urgent situations"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Lightbulb className="w-3 h-3 mr-1" />
                How It Works
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Your Journey to the{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                  Perfect Stay
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Discover how easy it is to find and book unique accommodations around the world. 
                From search to checkout, we've made the process simple and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-16 space-y-20">
        {/* Step by Step Process */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">4 Simple Steps to Your Perfect Stay</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined booking process makes it easy to find and secure your ideal accommodation
            </p>
          </div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Card className={`bg-gradient-to-br from-muted/50 to-background border-0 ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <CardContent className="p-12 text-center">
                    <div className="text-8xl mb-4">{step.image}</div>
                    <h4 className="text-lg font-semibold">Step {step.step}</h4>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Pro Tips */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Pro Tips for Better Bookings</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Make the most of your WayStay experience with these helpful tips
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Safety & Trust */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Your Safety is Our Priority</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've implemented comprehensive safety measures to ensure your peace of mind
            </p>
          </div>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {safety.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Payment & Policies */}
        <section className="grid lg:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Payment Options</span>
              </CardTitle>
              <CardDescription>
                Multiple secure payment methods for your convenience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Credit & Debit Cards</span>
                  <Badge variant="default">Accepted</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">PayPal</span>
                  <Badge variant="default">Accepted</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Apple Pay</span>
                  <Badge variant="default">Accepted</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Google Pay</span>
                  <Badge variant="default">Accepted</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                All payments are processed securely using industry-standard encryption.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Cancellation Policies</span>
              </CardTitle>
              <CardDescription>
                Flexible options to suit your travel needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm mb-1">Flexible</div>
                  <div className="text-xs text-muted-foreground">
                    Free cancellation up to 24 hours before check-in
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm mb-1">Moderate</div>
                  <div className="text-xs text-muted-foreground">
                    Free cancellation up to 5 days before check-in
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm mb-1">Strict</div>
                  <div className="text-xs text-muted-foreground">
                    50% refund up to 7 days before check-in
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-card to-muted/50 border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Now that you know how it works, it's time to find your perfect stay. 
                Search thousands of unique properties worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-base px-8">
                  Start Searching
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8">
                  Browse Popular Destinations
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}