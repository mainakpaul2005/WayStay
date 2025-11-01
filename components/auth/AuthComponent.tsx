'use client';

import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { PhoneAuthForm } from './PhoneAuthForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Building2, ArrowLeft } from 'lucide-react';

type AuthMode = 'login' | 'signup' | 'phone';

export function AuthComponent() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const getAuthTitle = () => {
    switch (authMode) {
      case 'login':
        return {
          title: 'Welcome back',
          subtitle: 'Sign in to your WayStay account'
        };
      case 'signup':
        return {
          title: 'Create your account',
          subtitle: 'Join thousands of travelers on WayStay'
        };
      case 'phone':
        return {
          title: 'Phone verification',
          subtitle: 'Enter your phone number to continue'
        };
      default:
        return { title: '', subtitle: '' };
    }
  };

  const renderAuthForm = () => {
    switch (authMode) {
      case 'login':
        return (
          <LoginForm 
            onSwitchToSignup={() => setAuthMode('signup')}
            onSwitchToPhone={() => setAuthMode('phone')}
          />
        );
      case 'signup':
        return (
          <SignupForm 
            onSwitchToLogin={() => setAuthMode('login')}
            onSwitchToPhone={() => setAuthMode('phone')}
          />
        );
      case 'phone':
        return (
          <PhoneAuthForm 
            onSwitchToLogin={() => setAuthMode('login')}
          />
        );
      default:
        return null;
    }
  };

  const { title, subtitle } = getAuthTitle();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Back Button */}
        <div className="text-center space-y-4">
          {authMode !== 'login' && (
            <button
              onClick={() => setAuthMode('login')}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to sign in
            </button>
          )}
          
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <span className="text-2xl font-bold">WayStay</span>
            </div>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="backdrop-blur-sm bg-background/95 border shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-center">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              {subtitle}
            </p>
          </CardHeader>
          <CardContent className="pb-6">
            {renderAuthForm()}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <a href="/terms" className="hover:underline">Terms</a> and{' '}
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}