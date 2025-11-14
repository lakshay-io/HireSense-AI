// Reusable Card Component

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-8 shadow-sm ${className}`}
    >
      {title && (
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
