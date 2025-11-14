'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ServiceFactory from '@/services/ServiceFactory';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const authService = ServiceFactory.getAuthService();
  const validator = ServiceFactory.getValidationService();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'email' | 'password'>('email');

  const [errors, setErrors] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [alertMessage, setAlertMessage] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertMessage(null);

    // Validate email
    const emailValidation = validator.validateEmail(email);
    if (!emailValidation.isValid) {
      setErrors({ ...errors, email: emailValidation.errors[0] });
      return;
    }

    setIsLoading(true);

    try {
      // Check if email exists in the system
      const userRepo = ServiceFactory.getUserRepository();
      const user = userRepo.findByEmail(email);

      if (!user) {
        setAlertMessage({
          type: 'error',
          message: 'No account found with this email address.',
        });
      } else {
        setAlertMessage({
          type: 'info',
          message: 'Email verified! Please enter your new password.',
        });
        setStep('password');
      }
    } catch (error) {
      setAlertMessage({
        type: 'error',
        message: 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertMessage(null);

    // Validate new password
    const passwordValidation = validator.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setErrors({ ...errors, newPassword: passwordValidation.errors[0] });
      return;
    }

    // Validate password match
    const matchValidation = validator.validatePasswordMatch(newPassword, confirmPassword);
    if (!matchValidation.isValid) {
      setErrors({ ...errors, confirmPassword: matchValidation.errors[0] });
      return;
    }

    setIsLoading(true);

    try {
      const success = await authService.resetPassword({
        email,
        newPassword,
      });

      if (success) {
        setAlertMessage({
          type: 'success',
          message: 'Password reset successful! Redirecting to login...',
        });

        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      setAlertMessage({
        type: 'error',
        message: error instanceof Error ? error.message : 'Password reset failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 dark:from-gray-900 dark:via-black dark:to-purple-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>

        <Card title="Reset Password">
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            {step === 'email'
              ? 'Enter your email address to reset your password'
              : 'Enter your new password'}
          </p>

          {alertMessage && (
            <div className="mb-4">
              <Alert
                type={alertMessage.type}
                message={alertMessage.message}
                onClose={() => setAlertMessage(null)}
              />
            </div>
          )}

          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: '' });
                }}
                error={errors.email}
                placeholder="you@example.com"
                autoComplete="email"
              />

              <Button type="submit" fullWidth isLoading={isLoading}>
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({ ...errors, newPassword: '' });
                }}
                error={errors.newPassword}
                placeholder="Enter new password"
                autoComplete="new-password"
              />

              <Input
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                error={errors.confirmPassword}
                placeholder="Confirm new password"
                autoComplete="new-password"
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setStep('email')}
                >
                  Back
                </Button>
                <Button type="submit" fullWidth isLoading={isLoading}>
                  Reset Password
                </Button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400"
            >
              ← Back to home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
