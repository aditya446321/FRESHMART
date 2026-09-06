import React from 'react';

interface FreshMartLogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'light' | 'dark';
}

export const FreshMartLogo: React.FC<FreshMartLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  theme = 'light'
}) => {
  // Dimension scales
  const iconDimensions = {
    sm: { w: 28, h: 28 },
    md: { w: 36, h: 36 },
    lg: { w: 44, h: 44 },
    xl: { w: 64, h: 64 }
  }[size];

  const textSizes = {
    sm: 'text-base tracking-tight',
    md: 'text-xl tracking-tight',
    lg: 'text-2xl tracking-tight',
    xl: 'text-3xl tracking-tight'
  }[size];

  // Bag & leaf SVG matching the user's exact uploaded brand logo
  const logoIcon = (
    <svg
      width={iconDimensions.w}
      height={iconDimensions.h}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-2xs"
    >
      {/* Green Bag Body with soft rounded corners and slight trapezoid taper */}
      <path
        d="M26 44C26 38.4772 30.4772 34 36 34H84C89.5228 34 94 38.4772 94 44L99.2 92C99.8 97.5 95.5 102 90 102H30C24.5 102 20.2 97.5 20.8 92L26 44Z"
        fill="#16A34A"
      />
      {/* Bag Handle looping into Leaf Contour */}
      {/* Outer loop forming handle arch and leaf perimeter */}
      <path
        d="M50 34V22C50 14.268 56.268 8 64 8C71.732 8 78 14.268 78 22V36C82 42 82 52 76 62C70 72 59 75 57 75C55 75 51 68 51 59C51 49 57 41 62 36V22C62 20.8954 62.8954 20 64 20C65.1046 20 66 20.8954 66 22V34"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Leaf Accent Vein */}
      <path
        d="M65 44C61 51 57 60 57 73"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{logoIcon}</div>;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-1.5 ${className}`}>
        {logoIcon}
        <span className={`font-black tracking-tight text-emerald-600 font-display ${textSizes}`}>
          Fresh<span className={theme === 'dark' ? 'text-white' : 'text-neutral-900'}>mart</span>
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {logoIcon}
      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <span className={`font-black tracking-tight text-emerald-600 font-display leading-none ${textSizes}`}>
            Fresh<span className={theme === 'dark' ? 'text-white' : 'text-neutral-900'}>mart</span>
          </span>
        </div>
        <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mt-0.5">
          21-Min Grocery Delivery • Mumbai
        </span>
      </div>
    </div>
  );
};

export const BasketFreshLogo = FreshMartLogo;
