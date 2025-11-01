import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Shield, 
  Clock, 
  Globe,
  ArrowRight,
  CheckCircle,
  Zap,
  Heart,
  Award,
  TrendingUp,
  Plane,
  Mountain,
  Waves,
  Building,
  Trees,
  Coffee,
  Car,
  Wifi,
  Bath,
  Home,
  DollarSign,
  Camera,
  Navigation,
  Brain,
  Smartphone,
  MessageCircle,
  Leaf,
  QrCode,
  Key,
  Headphones,
  Calculator,
  MapIcon,
  CloudRain,
  ThermometerSun,
  Utensils,
  GamepadIcon,
  Music,
  Fingerprint,
  Eye,
  BarChart3,
  Sparkles,
  Bot,
  Palette,
  Moon,
  Sun
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find your perfect stay with our AI-powered search algorithm."
    },
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All properties are thoroughly vetted for your safety and comfort."
    },
    {
      icon: Clock,
      title: "Instant Booking",
      description: "Book instantly or request to book with hosts for flexible stays."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access to millions of properties in 220+ countries worldwide."
    }
  ];

  // New unique features section
  const uniqueFeatures = [
    {
      icon: Brain,
      title: "AI Trip Planner",
      description: "Our AI creates personalized itineraries based on your preferences, budget, and travel style.",
      color: "from-purple-500 to-pink-500",
      badge: "AI-Powered"
    },
    {
      icon: Eye,
      title: "Virtual Reality Tours",
      description: "Experience properties in VR before booking. See every corner in immersive 360° detail.",
      color: "from-blue-500 to-cyan-500",
      badge: "VR Ready"
    },
    {
      icon: Fingerprint,
      title: "Smart Lock Integration",
      description: "Seamless check-in with biometric access. No keys, no hassle, just your fingerprint.",
      color: "from-green-500 to-teal-500",
      badge: "Keyless"
    },
    {
      icon: Bot,
      title: "24/7 AI Concierge",
      description: "Get instant help with bookings, local recommendations, and travel support anytime.",
      color: "from-orange-500 to-red-500",
      badge: "Always On"
    },
    {
      icon: BarChart3,
      title: "Price Prediction",
      description: "Machine learning algorithms predict price drops and suggest the best time to book.",
      color: "from-indigo-500 to-purple-500",
      badge: "Smart Pricing"
    },
    {
      icon: Leaf,
      title: "Carbon Footprint Tracker",
      description: "Track and offset your travel emissions. Book eco-friendly stays and reduce your impact.",
      color: "from-emerald-500 to-green-500",
      badge: "Eco-Friendly"
    }
  ];

  // Smart features for travelers
  const smartFeatures = [
    {
      icon: ThermometerSun,
      title: "Weather-Based Suggestions",
      description: "Get accommodation recommendations based on real-time weather and seasonal trends.",
      feature: "Live weather integration"
    },
    {
      icon: MessageCircle,
      title: "Live Translation",
      description: "Communicate with hosts in 50+ languages with real-time AI translation.",
      feature: "50+ languages supported"
    },
    {
      icon: Calculator,
      title: "Smart Budget Planner",
      description: "AI calculates total trip costs including hidden fees, taxes, and local expenses.",
      feature: "No surprise costs"
    },
    {
      icon: MapIcon,
      title: "Neighborhood Safety Score",
      description: "Real-time safety ratings based on crime data, reviews, and local insights.",
      feature: "Real-time data"
    },
    {
      icon: Utensils,
      title: "Food Allergy Assistant",
      description: "Find accommodations and restaurants that cater to your dietary restrictions.",
      feature: "Health-focused"
    },
    {
      icon: Music,
      title: "Personalized Soundscapes",
      description: "Custom ambient sounds for better sleep based on your preferences and location.",
      feature: "Better sleep quality"
    }
  ];

  // Innovative services
  const innovativeServices = [
    {
      icon: QrCode,
      title: "Digital Twin Properties",
      description: "Every property has a digital twin with real-time IoT data on occupancy, cleanliness, and amenities.",
      benefit: "100% accurate info"
    },
    {
      icon: Headphones,
      title: "Audio Augmented Reality",
      description: "Get immersive audio tours of your neighborhood through our AR app.",
      benefit: "Local storytelling"
    },
    {
      icon: GamepadIcon,
      title: "Gamified Experiences",
      description: "Earn points, badges, and rewards for bookings, reviews, and eco-friendly choices.",
      benefit: "Rewards program"
    },
    {
      icon: Palette,
      title: "Mood-Based Matching",
      description: "Match accommodations to your emotional needs - romantic, adventurous, peaceful, or social.",
      benefit: "Perfect vibe match"
    }
  ];

  const trendingDestinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      description: "Tropical paradise with stunning beaches and rich culture",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&q=80",
      price: "From $45/night",
      properties: "2,500+ properties",
      rating: 4.8,
      trending: true,
      tags: ["Beach", "Culture", "Affordable"]
    },
    {
      id: 2,
      name: "Tokyo, Japan",
      description: "Modern metropolis blending tradition with innovation",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80",
      price: "From $85/night",
      properties: "5,200+ properties",
      rating: 4.9,
      trending: true,
      tags: ["City", "Culture", "Food"]
    },
    {
      id: 3,
      name: "Santorini, Greece",
      description: "Iconic white-washed buildings and breathtaking sunsets",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80",
      price: "From $120/night",
      properties: "850+ properties",
      rating: 4.7,
      trending: true,
      tags: ["Romance", "Views", "Luxury"]
    },
    {
      id: 4,
      name: "Paris, France",
      description: "City of light with timeless elegance and charm",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&q=80",
      price: "From $95/night",
      properties: "8,100+ properties",
      rating: 4.6,
      trending: false,
      tags: ["Romance", "Art", "History"]
    },
    {
      id: 5,
      name: "New York, USA",
      description: "The city that never sleeps, full of energy and possibilities",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80",
      price: "From $150/night",
      properties: "12,500+ properties",
      rating: 4.5,
      trending: false,
      tags: ["City", "Business", "Entertainment"]
    },
    {
      id: 6,
      name: "Dubai, UAE",
      description: "Futuristic oasis of luxury and architectural marvels",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80",
      price: "From $110/night",
      properties: "3,400+ properties",
      rating: 4.8,
      trending: true,
      tags: ["Luxury", "Modern", "Shopping"]
    }
  ];

  const propertyTypes = [
    {
      icon: Home,
      name: "Entire homes",
      description: "Have a place to yourself",
      count: "2.5M+ properties"
    },
    {
      icon: Building,
      name: "Hotels",
      description: "Professional hospitality services",
      count: "500K+ properties"
    },
    {
      icon: Mountain,
      name: "Unique stays",
      description: "Castles, treehouses, and more",
      count: "100K+ properties"
    },
    {
      icon: Plane,
      name: "Business travel",
      description: "Perfect for work trips",
      count: "1M+ properties"
    }
  ];

  const experiences = [
    {
      title: "Cooking Classes",
      description: "Learn local cuisine from expert chefs",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
      price: "From $35",
      duration: "2-3 hours",
      rating: 4.8
    },
    {
      title: "City Walking Tours",
      description: "Discover hidden gems with local guides",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&q=80",
      price: "From $25",
      duration: "3-4 hours",
      rating: 4.7
    },
    {
      title: "Adventure Sports",
      description: "Thrilling outdoor activities and adventures",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80",
      price: "From $75",
      duration: "Half day",
      rating: 4.9
    },
    {
      title: "Art & Culture",
      description: "Museums, galleries, and cultural experiences",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
      price: "From $20",
      duration: "2-5 hours",
      rating: 4.6
    }
  ];

  const stats = [
    { value: "10M+", label: "Happy Guests" },
    { value: "220+", label: "Countries" },
    { value: "5M+", label: "Properties" },
    { value: "99.9%", label: "Uptime" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Nomad",
      content: "WayStay made finding accommodations effortless. The verification process gives me confidence in every booking.",
      avatar: "SC",
      location: "Worked from 15 countries"
    },
    {
      name: "Marcus Rodriguez",
      role: "Travel Blogger",
      content: "The user experience is phenomenal. I've booked 15+ stays this year, each one exceeding my expectations.",
      avatar: "MR",
      location: "Travel content creator"
    },
    {
      name: "Elena Petrov",
      role: "Business Traveler",
      content: "Perfect for business trips. Clean interface, reliable hosts, and seamless booking process every time.",
      avatar: "EP",
      location: "Fortune 500 consultant"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 hero-gradient">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Trusted by 10M+ travelers worldwide
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Your Perfect Stay{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                  Awaits
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover unique accommodations and unforgettable experiences around the world. 
                From cozy apartments to luxury villas, find your home away from home.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8" asChild>
                <Link href="/search">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <Link href="/auth">
                  Sign Up Free
                </Link>
              </Button>
            </div>

            {/* Quick Search */}
            <Card className="max-w-2xl mx-auto mt-12">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Where
                    </label>
                    <div className="text-sm text-muted-foreground border rounded-md p-2 cursor-pointer hover:border-primary transition-colors">
                      Search destinations
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Check-in
                    </label>
                    <div className="text-sm text-muted-foreground border rounded-md p-2 cursor-pointer hover:border-primary transition-colors">
                      Add dates
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Guests
                    </label>
                    <div className="text-sm text-muted-foreground border rounded-md p-2 cursor-pointer hover:border-primary transition-colors">
                      Add guests
                    </div>
                  </div>
                  <Button className="md:mt-6 hover:scale-105 transition-transform">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-muted/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Destinations Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending Now
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the most sought-after destinations where millions of travelers are booking their stays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingDestinations.map((destination) => (
              <Card key={destination.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {destination.trending && (
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{destination.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {destination.properties}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {destination.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{destination.price}</span>
                    <Button size="sm" asChild>
                      <Link href={`/search?destination=${encodeURIComponent(destination.name)}`}>
                        Explore
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/destinations">
                View All Destinations
                <Navigation className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Anywhere, Anytime
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of property types that suit your travel style and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {type.description}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {type.count}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Camera className="w-3 h-3 mr-1" />
              Experiences
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Beyond Accommodation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover unique activities and experiences hosted by locals in destinations around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((experience, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span className="text-xs font-medium">{experience.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{experience.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {experience.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-semibold">{experience.price}</div>
                      <div className="text-muted-foreground">{experience.duration}</div>
                    </div>
                    <Button size="sm" variant="outline">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Innovation First
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Future of Travel is Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience next-generation travel technology that makes every journey smarter, safer, and more personalized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <CardContent className="p-8 relative">
                    <Badge className="mb-4 bg-background/10 hover:bg-background/20">
                      {feature.badge}
                    </Badge>
                    <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto font-semibold">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* CTA for AI Features */}
          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Link href="/ai-features">
                <Brain className="w-5 h-5 mr-2" />
                Experience All AI Features
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Smart Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Brain className="w-3 h-3 mr-1" />
              Smart Travel
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Intelligent Features for Modern Travelers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI and machine learning make your travel planning effortless and your stays unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smartFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <IconComponent className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {feature.description}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {feature.feature}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovative Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Game Changers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Revolutionary Travel Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Breakthrough innovations that transform how you discover, book, and experience accommodations worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {innovativeServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold">{service.title}</h3>
                          <Badge className="bg-green-500/10 text-green-700 border-green-200">
                            {service.benefit}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Bot className="w-3 h-3 mr-1" />
              Technology
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by Cutting-Edge Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Behind every great stay is advanced technology working seamlessly to enhance your experience.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: "Machine Learning", icon: Brain, description: "Smart recommendations" },
              { name: "IoT Integration", icon: Smartphone, description: "Connected properties" },
              { name: "Blockchain", icon: Shield, description: "Secure transactions" },
              { name: "AR/VR", icon: Eye, description: "Immersive previews" },
              { name: "Real-time Data", icon: BarChart3, description: "Live insights" },
              { name: "Green Tech", icon: Leaf, description: "Sustainable travel" }
            ].map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <Card key={index} className="group text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{tech.name}</h3>
                    <p className="text-xs text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose WayStay?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've reimagined the way you book accommodations with cutting-edge technology 
              and a focus on exceptional user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Personalization Section */}
      <section className="py-20 bg-gradient-to-r from-muted/20 via-background to-muted/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Palette className="w-3 h-3 mr-1" />
                Personalized Experience
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Journey, Perfectly Tailored
              </h2>
              <p className="text-lg text-muted-foreground">
                Every traveler is unique. Our AI learns your preferences to create a completely personalized experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Learning Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI analyzes your booking history, reviews, and interactions to understand your unique travel style.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Emotional Intelligence</h3>
                    <p className="text-sm text-muted-foreground">
                      Match accommodations to your mood and emotional needs - whether you need relaxation or adventure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Surprise & Delight</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover hidden gems and unique experiences that perfectly match your interests and budget.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Predictive Planning</h3>
                    <p className="text-sm text-muted-foreground">
                      Anticipate your needs and suggest bookings before you even think about your next trip.
                    </p>
                  </div>
                </div>
              </div>

              <Card className="relative overflow-hidden bg-gradient-to-br from-card to-muted/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>AI Analysis in Progress</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Your Travel Profile</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Adventure Seeker</span>
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-20 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Budget Conscious</span>
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-16 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cultural Explorer</span>
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-22 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Eco-Friendly</span>
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-18 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Next Recommendation</p>
                      <p className="text-sm font-medium">🏔️ Mountain retreat in Swiss Alps</p>
                      <p className="text-xs text-muted-foreground">Perfect match: 94%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Award className="w-3 h-3 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Travelers Worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join millions of satisfied travelers who have made WayStay their go-to platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-0 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-sm font-semibold mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Roadmap Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Future of Travel Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're constantly innovating to bring you tomorrow's travel solutions today. Here's what's coming next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "Neural Trip Planning",
                description: "Advanced neural networks that understand your subconscious travel desires",
                timeline: "Q2 2026",
                status: "In Development"
              },
              {
                icon: Eye,
                title: "Holographic Previews",
                description: "Full holographic room previews using mixed reality technology",
                timeline: "Q3 2026",
                status: "Beta Testing"
              },
              {
                icon: Smartphone,
                title: "Quantum Check-in",
                description: "Instantaneous check-in using quantum-encrypted biometric verification",
                timeline: "Q4 2026",
                status: "Research Phase"
              },
              {
                icon: Leaf,
                title: "Carbon Neutral AI",
                description: "AI that automatically offsets 100% of your travel carbon footprint",
                timeline: "Q1 2027",
                status: "Planning"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group relative overflow-hidden hover:shadow-xl transition-all duration-500">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-secondary/50"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feature.timeline}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">{feature.status}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Card className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Be the first to know about new features and get early access to beta releases.
                </p>
                <Button className="w-full">
                  Join Innovation Program
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <Card className="bg-gradient-to-r from-card to-muted/50 border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join millions of travelers who trust WayStay for their perfect accommodations. 
                Sign up today and get access to exclusive deals and insider tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-base px-8" asChild>
                  <Link href="/auth?mode=signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8" asChild>
                  <Link href="/search">
                    Browse Properties
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  Free to join
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  No booking fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  24/7 support
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
