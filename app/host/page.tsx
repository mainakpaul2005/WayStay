import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  DollarSign, 
  Shield, 
  Calendar, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Home,
  Camera,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

export default function HostPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Extra Income",
      description: "Make money from your unused space with competitive pricing and instant payouts."
    },
    {
      icon: Shield,
      title: "Host Protection",
      description: "Comprehensive insurance coverage and 24/7 support to protect your property."
    },
    {
      icon: Users,
      title: "Meet New People",
      description: "Connect with travelers from around the world and share local experiences."
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Host on your own terms with complete control over your availability."
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Create Your Listing",
      description: "Add photos, describe your space, and set your house rules.",
      icon: Camera
    },
    {
      step: 2,
      title: "Set Your Prices",
      description: "Choose competitive rates and decide on your cancellation policy.",
      icon: DollarSign
    },
    {
      step: 3,
      title: "Welcome Guests",
      description: "Communicate with guests and provide an amazing experience.",
      icon: MessageCircle
    },
    {
      step: 4,
      title: "Get Paid",
      description: "Receive payments securely and grow your hosting business.",
      icon: TrendingUp
    }
  ];

  const requirements = [
    "Property must be legally available for short-term rental",
    "Accurate photos and description required",
    "Valid identification and contact information",
    "Commitment to providing excellent guest experience",
    "Compliance with local laws and regulations"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Building2 className="w-3 h-3 mr-1" />
                Become a Host
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Share Your Space,{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                  Earn Money
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Turn your extra space into extra income. Join thousands of hosts who are 
                earning money while providing amazing experiences for travelers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                Learn More
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1">$2,500</div>
                <div className="text-sm text-muted-foreground">Average monthly earnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1">4.8★</div>
                <div className="text-sm text-muted-foreground">Average host rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Support available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-16 space-y-20">
        {/* Benefits Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Why Host with WayStay?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our community of successful hosts and start earning from your space today
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting started as a host is simple. Follow these easy steps to begin earning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl font-bold">
                      {step.step}
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Requirements */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Host Requirements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To ensure quality and safety for all users, hosts must meet these requirements
            </p>
          </div>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Success Stories */}
        <section className="space-y-12 bg-muted/20 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Host Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from real hosts who have transformed their spaces into income
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold mr-3">
                    SM
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Miller</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                      <span>5.0 rating • 127 reviews</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "Hosting with WayStay has been incredible. I've earned over $15,000 this year 
                  from my spare room and met amazing people from around the world."
                </p>
                <Badge variant="secondary" className="text-xs">
                  <Home className="w-3 h-3 mr-1" />
                  Cozy Downtown Room
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold mr-3">
                    JD
                  </div>
                  <div>
                    <h4 className="font-semibold">James Davis</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                      <span>4.9 rating • 89 reviews</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "The extra income from hosting helped me pay off my student loans faster. 
                  The platform is easy to use and the support team is always helpful."
                </p>
                <Badge variant="secondary" className="text-xs">
                  <Building2 className="w-3 h-3 mr-1" />
                  Modern Apartment
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold mr-3">
                    LT
                  </div>
                  <div>
                    <h4 className="font-semibold">Lisa Thompson</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                      <span>4.8 rating • 156 reviews</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "I love being a host! It's not just about the money - I enjoy meeting 
                  travelers and sharing my local knowledge with them."
                </p>
                <Badge variant="secondary" className="text-xs">
                  <Home className="w-3 h-3 mr-1" />
                  Garden Cottage
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-card to-muted/50 border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Hosting?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of successful hosts earning money while providing amazing 
                experiences. Get started today and list your space in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-base px-8">
                  Become a Host
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8">
                  Calculate Earnings
                </Button>
              </div>
              <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  Free to list
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  Instant setup
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  24/7 support
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}