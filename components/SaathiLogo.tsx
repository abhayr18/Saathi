'use client';

import React from 'react';

interface SaathiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark' | 'auto';
}

export const SaathiLogo: React.FC<SaathiLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'auto',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-11 h-11 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  const devanagariSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const englishSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Logo Mark: Generational Embrace in Warm Saffron */}
      <div
        className={`${iconSizes[size]} bg-gradient-to-tr from-amber-600 via-saath-600 to-orange-400 p-0.5 shadow-md shadow-saath-500/25 flex items-center justify-center shrink-0 border border-white/30`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Subtle Heart Embrace Backdrop */}
          <path
            d="M24 41C24 41 8 30 8 18C8 11 13 6 19.5 6C22.5 6 25.5 7.5 27 10C28.5 7.5 31.5 6 34.5 6C41 6 46 11 46 18C46 30 30 41 30 41L27 43.5L24 41Z"
            fill="white"
            fillOpacity="0.22"
          />

          {/* Elder Citizen (Loving Head & Shoulders) */}
          <circle cx="18" cy="15" r="5" fill="white" />
          <path
            d="M11 31C11 25.5 14.5 22.5 18 22.5C21 22.5 24 24.5 24.8 27.5"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Youth Student Companion (Leaning in warmly) */}
          <circle cx="31" cy="13" r="4.5" fill="#FFE5CC" />
          <path
            d="M25 28C26 23.5 28.5 20.5 31.5 20.5C35 20.5 38 23.5 38 28.5"
            stroke="#FFE5CC"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Interlocked Caring Hands Arc */}
          <path
            d="M13 36C18 39.5 27 40.5 34 35"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Diya / Sunshine Spark of Joy */}
          <circle cx="38" cy="8" r="2.2" fill="#FDE047" />
          <path
            d="M38 2.5V4.5M42 4L40.5 5.5M43.5 8H41.5"
            stroke="#FDE047"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Name & Tagline Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`${devanagariSizes[size]} font-black tracking-tight ${
              variant === 'light' ? 'text-white' : 'text-stone-900'
            } font-display`}
          >
            साथी
          </span>
          <span
            className={`${englishSizes[size]} font-black tracking-tight text-saath-600 font-sans`}
          >
            Saathi
          </span>
          {size !== 'sm' && (
            <span className="hidden sm:inline-block bg-orange-100 text-saath-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-orange-200 ml-1">
              Ecosystem
            </span>
          )}
        </div>

        {showSubtitle && (
          <p
            className={`text-[10px] sm:text-[11px] font-bold ${
              variant === 'light' ? 'text-orange-100/90' : 'text-stone-500'
            } tracking-tight leading-tight mt-0.5`}
          >
            Connected Senior Care
          </p>
        )}
      </div>
    </div>
  );
};
