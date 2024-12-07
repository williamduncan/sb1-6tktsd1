import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-20 h-20'
  };

  return (
    <img
      src={src || `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=random`}
      alt={alt}
      className={`rounded-full object-cover border-2 border-white shadow-sm ${sizeClasses[size]} ${className}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=random`;
      }}
    />
  );
}