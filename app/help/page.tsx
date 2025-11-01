import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  HelpCircle, 
  Search, 
  Phone, 
  Mail, 
  MessageCircle,
  Book,
  CreditCard,
  MapPin,
  Users,
  Shield,
  Settings,
  ChevronRight
} from 'lucide-react';

export default function HelpPage() {
  const categories = [
    {
      title: "Booking & Reservations",
      icon: Book,
      count: 12,
      topics: [
        "How to make a booking",
        "Cancellation policies",
        "Modifying your reservation",
        "Payment and pricing"
      ]
    },
    {
      title: "Host Support",
      icon: Users,
      count: 8,
      topics: [
        "Becoming a host",
        "Listing your property",
        "Managing bookings",
        "Host protection"
      ]
    },
    {
      title: "Account & Profile",
      icon: Settings,
      count: 6,
      topics: [
        "Account verification",
        "Profile settings",
        "Privacy and security",
        "Notification preferences"
      ]
    },
    {
      title: "Trust & Safety",
      icon: Shield,
      count: 10,
      topics: [
        "Safety guidelines",
        "Reporting issues",
        "Identity verification",
        "Community standards"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I make a booking?",
      answer: "To make a booking, search for your destination, select your dates, choose the number of guests, and browse available properties. Click on a property you like, review the details, and click 'Book Now' to complete your reservation."
    },
    {
      question: "What is the cancellation policy?",
      answer: "Cancellation policies vary by property and are set by the host. You can find the specific cancellation policy on each listing page. Common policies include Flexible, Moderate, and Strict cancellation options."
    },
    {
      question: "How do I contact my host?",
      answer: "You can message your host through the WayStay messaging system. Go to your booking details or visit the Messages section in your account to start a conversation."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption to protect your payment information. We never share your financial details with hosts - payments are processed securely through our platform."
    },
    {
      question: "What if I need to report an issue?",
      answer: "If you encounter any issues during your stay, you can report them through your booking details or contact our 24/7 support team. We're here to help resolve any problems quickly."
    },
    {
      question: "How do I become a verified host?",
      answer: "To become verified, complete your profile, verify your identity, and provide accurate property information. Our verification process includes identity confirmation and property validation."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center space-x-2">
            <HelpCircle className="h-8 w-8" />
            <span>Help Center</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Get the help you need, when you need it
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for help topics..." 
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-3">
                24/7 support available
              </p>
              <Button variant="outline" size="sm">
                +1 (555) 123-4567
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Chat with our support team
              </p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get help via email
              </p>
              <Button variant="outline" size="sm">
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                    <h3 className="font-semibold mb-3">{category.title}</h3>
                    <div className="space-y-2">
                      {category.topics.slice(0, 3).map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <span>{topic}</span>
                          <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                      {category.topics.length > 3 && (
                        <div className="text-sm text-primary">
                          +{category.topics.length - 3} more topics
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-destructive mb-2">Emergency Contact</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you're experiencing an emergency during your stay, contact local authorities first, then reach out to us.
            </p>
            <Button variant="destructive" size="sm">
              Emergency Support: +1 (555) 911-HELP
            </Button>
          </CardContent>
        </Card>

        {/* Still Need Help */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-2">Still Need Help?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                Contact Support
              </Button>
              <Button variant="outline">
                Submit a Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}