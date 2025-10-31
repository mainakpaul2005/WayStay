'use client';

import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { PhoneAuthForm } from './PhoneAuthForm';

type AuthMode = 'login' | 'signup' | 'phone';

export function AuthComponent() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {renderAuthForm()}
      </div>
    </div>
  );
}