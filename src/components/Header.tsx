import React from 'react';
import { CbsLogo } from './CbsLogo';

interface HeaderProps {
  onOpenAi?: () => void;
  onResetData?: () => void;
  onExportCsv?: () => void;
  dataCount?: number;
  latestYear?: number;
  latestUnemploymentRate?: number;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 sticky top-0 z-30">
      <div className="bg-[#0091c3] rounded-lg shadow-md flex items-center justify-center px-6 py-6 sm:py-8 text-center">
        {/* CBS Logo & Title */}
        <div className="flex items-center justify-center gap-4 sm:gap-5">
          <CbsLogo className="h-12 sm:h-14 shrink-0" />
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Labour Force Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 font-normal mt-0.5">
              Central Bureau of Statistics (CBS) • Scenario Dashboard (2016–2025)
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};



