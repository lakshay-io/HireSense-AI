'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ServiceFactory from '@/services/ServiceFactory';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const authService = ServiceFactory.getAuthService();
  const validator = ServiceFactory.getValidationService();

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [alertMessage, setAlertMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { oldPassword: '', newPassword: '', confirmPassword: '' };
    let isValid = true;

    if (!formData.oldPassword) {
      newErrors.oldPassword = 'Current password is required';
      isValid = false;
    }

    // Validate new password
    const passwordValidation = validator.validatePassword(formData.newPassword);
    if (!passwordValidation.isValid) {
      newErrors.newPassword = passwordValidation.errors[0];
      isValid = false;
    }

    // Validate password match
    const matchValidation = validator.validatePasswordMatch(
      formData.newPassword,
      formData.confirmPassword
    );
    if (!matchValidation.isValid) {
      newErrors.confirmPassword = matchValidation.errors[0];
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertMessage(null);

    if (!validateForm() || !user) return;

    setIsLoading(true);

    try {
      const success = await authService.changePassword(user.id, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (success) {
        setAlertMessage({
          type: 'success',
          message: 'Password changed successfully!',
        });

        // Reset form
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error) {
      setAlertMessage({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to change password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <Card title="Change Password">
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Update your password to keep your account secure
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              error={errors.oldPassword}
              placeholder="Enter current password"
              autoComplete="current-password"
            />

            <Input
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              placeholder="Enter new password"
              autoComplete="new-password"
            />

            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />

            <div className="pt-2">
              <Button type="submit" fullWidth isLoading={isLoading}>
                Change Password
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/dashboard"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400"
            >
              ← Back to dashboard
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
