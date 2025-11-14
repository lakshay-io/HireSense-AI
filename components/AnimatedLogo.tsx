'use client';

export const AnimatedLogo = () => {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 opacity-75"></div>

      {/* Inner circle */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-950">
        {/* AI Icon */}
        <svg
          className="h-5 w-5 text-gray-900 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>

        {/* Pulse effect */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-gray-400 to-gray-600 opacity-20"></div>
      </div>
    </div>
  );
};

// Add custom animation to tailwind config if needed
