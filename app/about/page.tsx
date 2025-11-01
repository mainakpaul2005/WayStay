import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  Globe, 
  Shield, 
  Heart, 
  Award,
  MapPin,
  Calendar,
  Star,
  CheckCircle,
  Target,
  Eye,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "10M+", label: "Happy Travelers" },
    { icon: Globe, value: "220+", label: "Countries" },
    { icon: Building2, value: "5M+", label: "Properties" },
    { icon: Award, value: "99.9%", label: "Customer Satisfaction" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We verify every property and host to ensure your safety and peace of mind."
    },
    {
      icon: Heart,
      title: "Authentic Experiences",
      description: "Connect with local hosts and discover unique accommodations that hotels can't offer."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Join millions of travelers and hosts creating meaningful connections worldwide."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "We leverage cutting-edge technology to make booking and hosting seamless."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former VP at Airbnb with 10+ years in travel tech.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer passionate about building scalable platforms.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Design thinking expert focused on user-centered experiences.",
      avatar: "ER"
    },
    {
      name: "David Kim",
      role: "Head of Trust & Safety",
      bio: "Former FBI cybersecurity specialist ensuring platform security.",
      avatar: "DK"
    }
  ];

  const milestones = [
    { year: "2019", event: "WayStay founded with a vision to democratize travel" },
    { year: "2020", event: "Reached 1 million users despite global challenges" },
    { year: "2021", event: "Expanded to 100+ countries worldwide" },
    { year: "2022", event: "Launched AI-powered search and recommendations" },
    { year: "2023", event: "Achieved 5 million properties on the platform" },
    { year: "2024", event: "Introduced sustainable travel initiatives" },
    { year: "2025", event: "Celebrating 10 million happy travelers" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              <Building2 className="w-3 h-3 mr-1" />
              About WayStay
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Connecting Travelers with 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                {" "}Unique Stays
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Founded in 2019, WayStay has revolutionized the way people travel by creating 
              a platform that connects travelers with unique accommodations and authentic local experiences.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/search">
              Start Your Journey
            </Link>
          </Button>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/20 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that showcase the trust and growth of our global community
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">
                <Target className="w-3 h-3 mr-1" />
                Our Mission
              </Badge>
              <h2 className="text-3xl font-bold">Making Travel Accessible to Everyone</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe that travel should be accessible, authentic, and enriching for everyone. 
                Our mission is to break down barriers and create meaningful connections between 
                travelers and hosts across the globe.
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">
                <Eye className="w-3 h-3 mr-1" />
                Our Vision
              </Badge>
              <p className="text-muted-foreground leading-relaxed">
                To create a world where anyone can belong anywhere, fostering understanding 
                and connection across cultures through shared travel experiences.
              </p>
            </div>
          </div>
          <Card className="bg-gradient-to-br from-muted/50 to-background border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="text-xl font-semibold mb-2">Global Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Building bridges across cultures and creating lasting memories
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at WayStay
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to transform travel
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pb-6">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {milestone.year}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals driving WayStay's mission forward
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-muted/50 to-background rounded-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="text-muted-foreground">
              Whether you're a traveler seeking unique experiences or a host wanting to 
              share your space, WayStay welcomes you to our global community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth?mode=signup">
                  Start Traveling
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/host">
                  Become a Host
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}