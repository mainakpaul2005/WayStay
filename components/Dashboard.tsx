'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Settings, 
  Lock, 
  LogOut, 
  Mail, 
  Shield, 
  Calendar,
  Home,
  Heart,
  MessageSquare,
  MapPin,
  TrendingUp,
  Clock,
  Check
} from 'lucide-react';

export function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const getUserInitials = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const stats = [
    { label: 'Properties Viewed', value: '24', icon: Home, trend: '+12%' },
    { label: 'Saved Favorites', value: '8', icon: Heart, trend: '+2' },
    { label: 'Messages', value: '3', icon: MessageSquare, trend: 'New' },
    { label: 'Bookings', value: '2', icon: MapPin, trend: 'Active' },
  ];

  const recentActivity = [
    { action: 'Viewed', item: 'Modern Apartment in Downtown', time: '2 hours ago', icon: Home },
    { action: 'Saved', item: 'Cozy Studio near Central Park', time: '5 hours ago', icon: Heart },
    { action: 'Message', item: 'Host replied to your inquiry', time: '1 day ago', icon: MessageSquare },
    { action: 'Booked', item: 'Weekend Getaway Cabin', time: '3 days ago', icon: Check },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container py-12 md:py-16 lg:py-20 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Dashboard</h1>
            <p className="text-lg text-muted-foreground font-medium">
              Welcome back! Here's what's happening with your account.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="flex items-center space-x-2 px-4 py-2 text-sm">
              <Shield className="h-4 w-4" />
              <span className="font-semibold">Verified Account</span>
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50">
                <CardContent className="p-7">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      <p className="text-3xl md:text-4xl font-display font-bold">{stat.value}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <IconComponent className="h-6 w-6 text-primary" />
                      <Badge variant="outline" className="text-xs font-semibold px-2 py-1">
                        {stat.trend}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Information */}
          <Card className="lg:col-span-2 border-border/50 shadow-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Your account details and verification status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center space-x-5">
                <Avatar className="h-20 w-20 border-2 border-border/50">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="text-xl font-display font-bold bg-primary/10 text-primary">
                    {getUserInitials(user?.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-bold">{user?.displayName || 'Anonymous User'}</h3>
                  <p className="text-base text-muted-foreground flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="font-medium">{user?.email}</span>
                  </p>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">User ID</span>
                    <span className="text-sm font-mono text-muted-foreground bg-muted/50 px-3 py-1 rounded">
                      {user?.uid?.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">Email Verified</span>
                    <Badge variant={user?.emailVerified ? "default" : "secondary"} className="text-xs font-bold">
                      {user?.emailVerified ? (
                        <Check className="h-4 w-4 mr-1" />
                      ) : (
                        <Clock className="h-4 w-4 mr-1" />
                      )}
                      {user?.emailVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">Last Login</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {user?.metadata.lastSignInTime ? 
                        new Date(user.metadata.lastSignInTime).toLocaleDateString() : 
                        'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">Member Since</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {user?.metadata.creationTime ? 
                        new Date(user.metadata.creationTime).toLocaleDateString() : 
                        'N/A'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Manage your account and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start h-10 px-4 py-2 text-base font-medium hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
                onClick={() => {
                  console.log('Edit profile clicked');
                }}
              >
                <User className="mr-3 h-5 w-5 text-primary" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-10 px-4 py-2 text-base font-medium hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
                onClick={() => {
                  console.log('Change password clicked');
                }}
              >
                <Lock className="mr-3 h-5 w-5 text-primary" />
                Change Password
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-10 px-4 py-2 text-base font-medium hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
                onClick={() => {
                  console.log('Settings clicked');
                }}
              >
                <Settings className="mr-3 h-5 w-5 text-primary" />
                Preferences
              </Button>
              <Separator className="my-4" />
              <Button 
                variant="destructive" 
                className="w-full justify-start h-10 px-4 py-2 text-base font-semibold transition-all duration-200"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Your latest interactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/60 transition-all duration-200 border border-border/30 hover:border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium">
                        <span className="text-muted-foreground font-semibold">{activity.action}</span> <span className="font-semibold">{activity.item}</span>
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}