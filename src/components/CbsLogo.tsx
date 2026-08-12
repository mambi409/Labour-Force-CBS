import React from 'react';

interface CbsLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'brand';
}

export const CbsLogo: React.FC<CbsLogoProps> = ({
  className = 'h-10 sm:h-12',
}) => {
  return (
    <div className={`flex items-center shrink-0 ${className}`}>
      <img
        src="/cbs_logo-01.png"
        alt="CBS Central Bureau of Statistics Curaçao"
        className="h-full w-auto max-h-14 object-contain"
      />
    </div>
  );
};







