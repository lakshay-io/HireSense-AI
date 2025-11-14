'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-purple-900">
      <main className="flex w-full max-w-6xl flex-col items-center justify-center px-6 sm:px-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
          {/* Logo/Icon */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl sm:h-32 sm:w-32">
            <svg
              className="h-12 w-12 text-white sm:h-16 sm:w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HireSense-AI</span>
          </h1>

          {/* Subheading */}
          <h2 className="max-w-2xl text-xl font-semibold text-gray-700 dark:text-gray-300 sm:text-2xl">
            AI-Powered Recruitment Intelligence
          </h2>

          {/* Paragraph */}
          <p className="max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
            Transform your hiring process with cutting-edge artificial intelligence.
            HireSense-AI helps you identify top talent faster, reduce bias in candidate
            screening, and make data-driven hiring decisions. Our intelligent platform
            analyzes resumes, conducts initial screenings, and provides comprehensive
            candidate insights to streamline your recruitment workflow.
          </p>

          {/* CTA Buttons */}
          <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:gap-4">
            <Link href="/login">
              <button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl sm:w-auto sm:px-8 sm:py-3.5">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-full rounded-full border-2 border-gray-300 bg-white px-7 py-3 text-base font-semibold text-gray-700 shadow-md transition-all hover:border-gray-400 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 sm:w-auto sm:px-8 sm:py-3.5">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
