'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Smartphone, 
  Shield, 
  ArrowLeft, 
  AlertCircle, 
  Loader2,
  MessageSquare,
  Clock
} from 'lucide-react';
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
  const [timeLeft, setTimeLeft] = useState(0);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);

  const { signInWithPhone, confirmPhoneSignIn } = useAuth();

  // Timer for resend code
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

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

  const formatPhoneNumber = (phone: string) => {
    // Basic phone number formatting for display
    if (phone.startsWith('+1')) {
      const digits = phone.slice(2);
      if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
    }
    return phone;
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic phone number validation
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+1${cleanPhone}`;

    if (!recaptchaVerifier.current) {
      setError('reCAPTCHA not initialized');
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithPhone(formattedPhone, recaptchaVerifier.current);
      setConfirmationResult(result);
      setStep('verification');
      setTimeLeft(60); // 60 seconds countdown
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
    setTimeLeft(0);
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {step === 'phone' ? (
        <>
          {/* Phone Number Entry */}
          <div className="text-center space-y-2 mb-6">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              We'll send you a verification code via SMS
            </p>
          </div>

          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Include country code (e.g., +1 for US/Canada)
              </p>
            </div>

            {/* reCAPTCHA Container */}
            <div className="flex justify-center">
              <div id="recaptcha-container" ref={recaptchaRef}></div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending code...
                </>
              ) : (
                <>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Verification Code
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onSwitchToLogin}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Email Sign In
          </Button>
        </>
      ) : (
        <>
          {/* Verification Code Entry */}
          <div className="text-center space-y-2 mb-6">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">
              Code sent to {formatPhoneNumber(phoneNumber)}
            </p>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">
                Verification Code
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
              <p className="text-xs text-muted-foreground text-center">
                Enter the 6-digit code we sent to your phone
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading || verificationCode.length !== 6}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </Button>
          </form>

          {/* Resend Code */}
          <div className="text-center space-y-2">
            {timeLeft > 0 ? (
              <p className="text-sm text-muted-foreground flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" />
                Resend code in {timeLeft}s
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-sm text-primary hover:underline"
                disabled={loading}
              >
                Didn't receive a code? Send again
              </button>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onSwitchToLogin}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Email Sign In
          </Button>
        </>
      )}
    </div>
  );
}