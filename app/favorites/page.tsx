import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, MapPin, Calendar, Share2, Trash2 } from 'lucide-react';

export default function FavoritesPage() {
  const favorites = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "Downtown, New York",
      price: "$120",
      rating: 4.8,
      reviews: 124,
      image: "🏢",
      savedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Cozy Studio near Central Park",
      location: "Upper West Side, New York",
      price: "$85",
      rating: 4.6,
      reviews: 89,
      image: "🏠",
      savedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Luxury Penthouse Suite",
      location: "Midtown, New York",
      price: "$450",
      rating: 4.9,
      reviews: 67,
      image: "🏙️",
      savedDate: "2 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span>Your Favorites</span>
          </h1>
          <p className="text-muted-foreground">
            Properties you've saved for future trips
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <Card key={property.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 rounded-t-lg flex items-center justify-center text-6xl">
                    {property.image}
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          Saved {property.savedDate}
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

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <span className="text-lg font-bold">{property.price}</span>
                        <span className="text-sm text-muted-foreground"> / night</span>
                      </div>
                      <Button size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-6">
                Start exploring and save properties you love for easy access later.
              </p>
              <Button>
                Browse Properties
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}