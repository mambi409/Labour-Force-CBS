import React from 'react';

interface CbsLogoProps {
  className?: string;
}

export const CbsLogo: React.FC<CbsLogoProps> = ({ className = 'h-10' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 220 160"
        className="h-full w-auto max-h-12 object-contain"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Swoosh 1 (Top dark cyan wing) */}
        <path
          d="M 45 72 C 85 40, 150 10, 210 5 C 170 20, 110 40, 65 72 Z"
          fill="#0077b6"
        />
        {/* Swoosh 2 (Middle cyan wing) */}
        <path
          d="M 58 68 C 100 48, 160 28, 215 32 C 175 42, 115 58, 75 70 Z"
          fill="#0096c7"
        />
        {/* Swoosh 3 (Bottom light cyan wing) */}
        <path
          d="M 72 66 C 115 55, 170 48, 210 58 C 175 62, 125 70, 88 71 Z"
          fill="#48cae4"
        />

        {/* CBS Big Bold Text */}
        <text
          x="14"
          y="128"
          fill="#008ac9"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="68"
          letterSpacing="-1"
        >
          CBS
        </text>

        {/* Central Bureau of Statistics Subtitle */}
        <text
          x="2"
          y="152"
          fill="#008ac9"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
          fontSize="18"
          letterSpacing="0"
        >
          Central Bureau of Statistics
        </text>
      </svg>
    </div>
  );
};
