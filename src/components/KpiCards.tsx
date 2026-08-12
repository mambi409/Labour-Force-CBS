import React from 'react';
import { LabourDataPoint, MetricKey, METRIC_CONFIGS } from '../types';
import {
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Users,
  UserCheck,
  UserX,
  UserMinus,
  Briefcase,
  Activity,
  Baby,
} from 'lucide-react';

interface KpiCardsProps {
  data: LabourDataPoint[];
  selectedMetric: MetricKey | null;
  onSelectMetric: (key: MetricKey) => void;
}

const METRIC_ICONS: Record<MetricKey, React.ComponentType<{ className?: string }>> = {
  generalInformation: BookOpen,
  totalPopulation: Users,
  pop0To14: Baby,
  pop15Plus: UserCheck,
  employedPopulation: Briefcase,
  unemployedPopulation: UserX,
  economicallyNotActive: UserMinus,
  labourForce: Activity,
};

export const KpiCards: React.FC<KpiCardsProps> = ({
  data,
  selectedMetric,
  onSelectMetric,
}) => {
  if (!data || data.length === 0) return null;

  const sorted = [...data].sort((a, b) => a.year - b.year);
  const baseline = sorted[0]; // 2016
  const latest = sorted[sorted.length - 1]; // 2025 or latest

  const metricKeys: MetricKey[] = [
    'generalInformation',
    'totalPopulation',
    'pop0To14',
    'pop15Plus',
    'employedPopulation',
    'unemployedPopulation',
    'economicallyNotActive',
    'labourForce',
  ];

  return (
    <div className="my-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricKeys.map((key) => {
          const config = METRIC_CONFIGS[key];
          const isSelected = selectedMetric === key;
          const IconComp = METRIC_ICONS[key] || Users;

          let displayVal = '';
          let subText = '';
          let propLabel = '';
          let pctChangeText = '';
          let isPositive = true;

          if (key === 'generalInformation') {
            return (
              <button
                key={key}
                onClick={() => onSelectMetric(key)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between border bg-white ${
                  isSelected
                    ? 'border-slate-500 -translate-y-2 shadow-lg z-10'
                    : 'border-slate-200 shadow-xs hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] bg-[#02a0cc] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-[#0091c3] leading-snug flex-1">
                      {config.label}
                    </h3>
                    {isSelected && (
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                        style={{ backgroundColor: config.color }}
                      />
                    )}
                  </div>

                  <p className="text-base sm:text-lg text-slate-700 font-normal mt-2 leading-relaxed">
                    Glossary of terms and formulas used to calculate statistics.
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-sm">
                  {isSelected ? (
                    <div className="py-1 px-2.5 rounded-full bg-slate-100 text-slate-800 font-medium text-sm text-center uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Selected
                    </div>
                  ) : (
                    <div className="text-slate-500 text-sm text-center hover:text-indigo-600 font-normal">
                      Click to view glossary &rarr;
                    </div>
                  )}
                </div>
              </button>
            );
          }

          const latestValue = (latest[key] as number) ?? 0;
          const baselineValue = (baseline[key] as number) ?? 0;
          const diff = latestValue - baselineValue;
          const pctChange = baselineValue > 0 ? Number(((diff / baselineValue) * 100).toFixed(1)) : 0;
          
          displayVal = latestValue.toLocaleString();
          subText = `${latest.year} Total`;
          pctChangeText = `${diff >= 0 ? '+' : ''}${pctChange}%`;
          isPositive = diff >= 0;

          if (key === 'totalPopulation') {
            propLabel = '100% of Total';
          } else if (key === 'pop0To14' || key === 'pop15Plus') {
            const pct = ((latestValue / (latest.totalPopulation || 1)) * 100).toFixed(1);
            propLabel = `${pct}% of Total Pop`;
          } else if (key === 'employedPopulation' || key === 'unemployedPopulation') {
            const pct = ((latestValue / (latest.labourForce || 1)) * 100).toFixed(1);
            propLabel = `${pct}% of Labour Force`;
          } else if (key === 'labourForce' || key === 'economicallyNotActive') {
            const pct = ((latestValue / (latest.pop15Plus || 1)) * 100).toFixed(1);
            propLabel = `${pct}% of Pop 15+`;
          }

          return (
            <button
              key={key}
              onClick={() => onSelectMetric(key)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between border bg-white ${
                isSelected
                  ? 'border-slate-500 -translate-y-2 shadow-lg z-10'
                  : 'border-slate-200 shadow-xs hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] bg-[#02a0cc] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#0091c3] leading-snug flex-1">
                    {config.label}
                  </h3>
                  {isSelected && (
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                      style={{ backgroundColor: config.color }}
                    />
                  )}
                </div>

                <div className="mt-1">
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {displayVal}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                    {subText}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-500 truncate">{propLabel}</span>
                  <span
                    className={`inline-flex items-center gap-0.5 font-bold ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {pctChangeText}
                  </span>
                </div>

                {isSelected ? (
                  <div className="mt-1 py-1 px-2.5 rounded-full bg-slate-100 text-slate-800 font-semibold text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Selected
                  </div>
                ) : (
                  <div className="text-slate-400 text-xs text-center hover:text-indigo-600 font-medium mt-1">
                    Click to view chart &rarr;
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

