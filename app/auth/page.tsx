'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { Building2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Back to Home */}
        <div className="text-center">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
              <Building2 className="h-6 w-6 text-background" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold tracking-tight">WayStay</span>
              <span className="text-xs text-muted-foreground leading-none">Stay Anywhere</span>
            </div>
          </Link>
        </div>

        {/* Auth Forms */}
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              {activeTab === 'signin' 
                ? 'Sign in to your account to continue' 
                : 'Create an account to get started'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-6">
                <LoginForm 
                  onSwitchToSignup={() => setActiveTab('signup')}
                  onSwitchToPhone={() => {}}
                />
              </TabsContent>
              <TabsContent value="signup" className="mt-6">
                <SignupForm 
                  onSwitchToLogin={() => setActiveTab('signin')}
                  onSwitchToPhone={() => {}}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}