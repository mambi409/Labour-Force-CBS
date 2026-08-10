import React from 'react';
import { LabourDataPoint, MetricKey, METRIC_CONFIGS } from '../types';
import { CheckCircle2, TrendingUp, TrendingDown, Layers } from 'lucide-react';

interface KpiCardsProps {
  data: LabourDataPoint[];
  selectedMetric: MetricKey;
  onSelectMetric: (key: MetricKey) => void;
}

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
    'totalPopulation',
    'pop0To14',
    'pop15Plus',
    'employedPopulation',
    'unemployedPopulation',
    'economicallyNotActive',
    'labourForce',
  ];

  return (
    <div className="my-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Select Labour Force Metric (7 Core CBS Categories)
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Click any card to analyze its historical trend below
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {metricKeys.map((key) => {
          const config = METRIC_CONFIGS[key];
          const latestValue = latest[key] ?? 0;
          const baselineValue = baseline[key] ?? 0;
          const diff = latestValue - baselineValue;
          const pctChange = baselineValue > 0 ? Number(((diff / baselineValue) * 100).toFixed(1)) : 0;
          const isSelected = selectedMetric === key;

          // Percentage of total pop or pop 15+
          let propLabel = '';
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
              className={`p-4 rounded-2xl text-left transition-all cursor-pointer relative flex flex-col justify-between border ${
                isSelected
                  ? 'bg-white border-2 shadow-md ring-2 ring-indigo-500/20 z-10 scale-[1.02]'
                  : 'bg-slate-200/90 hover:bg-slate-200 border-slate-300/80 shadow-xs hover:shadow-sm'
              }`}
              style={{
                borderColor: isSelected ? config.color : undefined,
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-extrabold text-slate-700 truncate leading-tight">
                    {config.label}
                  </span>
                  {isSelected && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                      style={{ backgroundColor: config.color }}
                    />
                  )}
                </div>

                <div className="mt-1">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {latestValue.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                    {latest.year} Total
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex flex-col gap-1 text-[10px]">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-500 truncate">{propLabel}</span>
                  <span
                    className={`inline-flex items-center gap-0.5 font-bold ${
                      diff >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {diff >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                    {diff >= 0 ? '+' : ''}
                    {pctChange}%
                  </span>
                </div>

                {isSelected ? (
                  <div className="mt-1 py-0.5 px-2 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-[9px] text-center uppercase tracking-wider flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 text-indigo-600" /> Selected
                  </div>
                ) : (
                  <div className="text-slate-400 text-[9px] text-center hover:text-indigo-600 font-medium mt-1">
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
