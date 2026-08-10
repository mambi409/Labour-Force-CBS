import React from 'react';
import { Bot, Download, RotateCcw, Activity } from 'lucide-react';
import { CbsLogo } from './CbsLogo';

interface HeaderProps {
  onOpenAi: () => void;
  onResetData: () => void;
  onExportCsv: () => void;
  dataCount: number;
  latestYear: number;
  latestUnemploymentRate: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAi,
  onResetData,
  onExportCsv,
  dataCount,
  latestYear,
  latestUnemploymentRate,
}) => {
  return (
    <header className="h-20 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100 border-b border-slate-300/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* CBS Logo & Title */}
      <div className="flex items-center gap-4 sm:gap-6">
        <CbsLogo className="h-12" />
        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Curaçao Labour Force Statistics
            </h1>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider flex items-center gap-1 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Official CBS Data
            </span>
          </div>
          <p className="text-xs text-slate-500 hidden sm:block font-medium">
            Central Bureau of Statistics (CBS) • Scenario Dashboard (2016–2025)
          </p>
        </div>
      </div>

      {/* Right Metrics & Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden lg:flex items-center gap-4 text-right border-r border-slate-200 pr-4">
          <div>
            <div className="text-xs font-semibold text-slate-900">{latestYear} Unemp. Rate</div>
            <div className="text-xs text-emerald-600 font-bold flex items-center justify-end gap-1">
              <Activity className="w-3 h-3" />
              {latestUnemploymentRate}%
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900">Total Dataset</div>
            <div className="text-xs text-slate-500">{dataCount} Recorded Years</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetData}
            title="Reset data"
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-800 bg-white/90 hover:bg-white border border-slate-300/80 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={onExportCsv}
            title="Export CSV"
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-800 bg-white/90 hover:bg-white border border-slate-300/80 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">CSV Export</span>
          </button>

          <button
            onClick={onOpenAi}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Analyst</span>
          </button>
        </div>
      </div>
    </header>
  );
};


