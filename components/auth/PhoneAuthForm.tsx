'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { auth } from '@/lib/firebase';

interface PhoneAuthFormProps {
  onSwitchToLogin: () => void;
}

export function PhoneAuthForm({ onSwitchToLogin }: PhoneAuthFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);

  const { signInWithPhone, confirmPhoneSignIn } = useAuth();

  useEffect(() => {
    if (step === 'phone' && recaptchaRef.current && !recaptchaVerifier.current) {
      try {
        recaptchaVerifier.current = new RecaptchaVerifier(auth, recaptchaRef.current, {
          size: 'normal',
          callback: () => {
            // reCAPTCHA solved
          },
          'expired-callback': () => {
            setError('reCAPTCHA expired. Please try again.');
          }
        });
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error);
        setError('Error initializing reCAPTCHA');
      }
    }

    return () => {
      if (recaptchaVerifier.current) {
        recaptchaVerifier.current.clear();
        recaptchaVerifier.current = null;
      }
    };
  }, [step]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!phoneNumber.trim()) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    if (!recaptchaVerifier.current) {
      setError('reCAPTCHA not initialized');
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithPhone(phoneNumber, recaptchaVerifier.current);
      setConfirmationResult(result);
      setStep('verification');
    } catch (error: any) {
      console.error('Error sending SMS:', error);
      setError(error.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      setLoading(false);
      return;
    }

    if (!confirmationResult) {
      setError('No verification code sent');
      setLoading(false);
      return;
    }

    try {
      await confirmPhoneSignIn(confirmationResult, verificationCode);
      // User will be redirected automatically by the auth state change
    } catch (error: any) {
      console.error('Error verifying code:', error);
      setError(error.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setStep('phone');
    setVerificationCode('');
    setConfirmationResult(null);
    setError('');
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Phone Authentication</h1>
          <p className="text-gray-500">
            {step === 'phone' 
              ? 'Enter your phone number to receive a verification code' 
              : 'Enter the verification code sent to your phone'
            }
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <>
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Include country code (e.g., +1 for US)
                </p>
              </div>

              <div id="recaptcha-container" ref={recaptchaRef}></div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Verification Code'}
              </Button>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-500">
                  Enter the 6-digit code sent to {phoneNumber}
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendCode}
                disabled={loading}
              >
                Resend Code
              </Button>
            </form>
          </>
        )}

        <div className="text-center text-sm">
          <span className="text-gray-500">Prefer email? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in with email
          </button>
        </div>
      </div>
    </Card>
  );
}