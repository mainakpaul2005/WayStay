import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Filter,
  Star,
  Heart,
  Wifi,
  Car,
  Coffee,
  Tv,
  Home,
  Building
} from 'lucide-react';

export default function SearchPage() {
  const mockProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "Downtown, New York",
      price: "$120",
      rating: 4.8,
      reviews: 124,
      image: "🏢",
      amenities: ["Wifi", "Kitchen", "Parking"],
      type: "Apartment"
    },
    {
      id: 2,
      title: "Cozy Studio near Central Park",
      location: "Upper West Side, New York",
      price: "$85",
      rating: 4.6,
      reviews: 89,
      image: "🏠",
      amenities: ["Wifi", "Coffee", "TV"],
      type: "Studio"
    },
    {
      id: 3,
      title: "Luxury Penthouse Suite",
      location: "Midtown, New York",
      price: "$450",
      rating: 4.9,
      reviews: 67,
      image: "🏙️",
      amenities: ["Wifi", "Kitchen", "Parking", "TV"],
      type: "Penthouse"
    },
    {
      id: 4,
      title: "Charming Brownstone Room",
      location: "Brooklyn, New York",
      price: "$65",
      rating: 4.7,
      reviews: 156,
      image: "🏘️",
      amenities: ["Wifi", "Coffee"],
      type: "Room"
    },
    {
      id: 5,
      title: "Modern Loft with City View",
      location: "SoHo, New York",
      price: "$200",
      rating: 4.8,
      reviews: 93,
      image: "🏢",
      amenities: ["Wifi", "Kitchen", "TV"],
      type: "Loft"
    },
    {
      id: 6,
      title: "Quiet Garden Apartment",
      location: "Queens, New York",
      price: "$95",
      rating: 4.5,
      reviews: 78,
      image: "🌿",
      amenities: ["Wifi", "Kitchen"],
      type: "Apartment"
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-3 w-3" />;
      case 'parking': return <Car className="h-3 w-3" />;
      case 'coffee': return <Coffee className="h-3 w-3" />;
      case 'tv': return <Tv className="h-3 w-3" />;
      case 'kitchen': return <Home className="h-3 w-3" />;
      default: return <Building className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Find Your Perfect Stay</h1>
          <p className="text-muted-foreground">
            Discover unique accommodations around the world
          </p>
        </div>

        {/* Search Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search & Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </label>
                <Input placeholder="Where are you going?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Check-in
                </label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Check-out
                </label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Guests
                </label>
                <Input type="number" placeholder="2" min="1" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Properties in New York</h2>
            <p className="text-sm text-muted-foreground">{mockProperties.length} results found</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Price: Low to High</Badge>
            <Badge variant="outline">Rating: 4.0+</Badge>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-0">
                {/* Property Image */}
                <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 rounded-t-lg flex items-center justify-center text-6xl">
                  {property.image}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Property Details */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {property.type}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="text-sm font-medium">{property.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({property.reviews})
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg leading-tight">{property.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.location}
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs flex items-center space-x-1">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </Badge>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <span className="text-lg font-bold">{property.price}</span>
                      <span className="text-sm text-muted-foreground"> / night</span>
                    </div>
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-8">
          <Button variant="outline" size="lg">
            Load More Properties
          </Button>
        </div>
      </div>
    </div>
  );
}