import React from 'react';
import { LabourDataPoint, MetricKey, METRIC_CONFIGS } from '../types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Award, ShieldAlert, BarChart3 } from 'lucide-react';

interface UnemploymentTrendChartProps {
  data: LabourDataPoint[];
  selectedMetric?: MetricKey;
}

export const UnemploymentTrendChart: React.FC<UnemploymentTrendChartProps> = ({
  data,
  selectedMetric = 'unemployedPopulation',
}) => {
  if (!data || data.length === 0) return null;

  const config = METRIC_CONFIGS[selectedMetric] || METRIC_CONFIGS.unemployedPopulation;
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  const formattedData = sortedData.map((d) => {
    const val = (d[selectedMetric] as number) ?? 0;
    return {
      year: d.year,
      value: val,
      totalPop: d.totalPopulation,
      labourForce: d.labourForce,
      pop15Plus: d.pop15Plus,
      unemployed: d.unemployedPopulation,
      unemploymentRate: d.unemploymentRate,
      isProjection: d.isProjection,
    };
  });

  const values = formattedData.map((d) => d.value);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const maxPoint = formattedData.find((d) => d.value === maxVal);
  const minPoint = formattedData.find((d) => d.value === minVal);

  const firstVal = formattedData[0]?.value || 1;
  const lastVal = formattedData[formattedData.length - 1]?.value || 0;
  const totalDiff = lastVal - firstVal;
  const totalPctChange = Number(((totalDiff / firstVal) * 100).toFixed(1));

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pt = payload[0].payload;
      return (
        <div
          className="text-white p-4 rounded-xl shadow-2xl text-xs space-y-2 min-w-[200px] border border-cyan-300/30"
          style={{ backgroundColor: '#1792c3' }}
        >
          <div className="font-extrabold border-b border-white/20 pb-1.5 text-sm flex items-center justify-between gap-3 text-white">
            <span className="text-white">Year {label}</span>
            {pt.isProjection && (
              <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                Projected
              </span>
            )}
          </div>

          <div>
            <span className="text-cyan-100 block text-[10px] uppercase font-bold tracking-wider">
              {config.label}
            </span>
            <span className="text-xl font-black text-white">
              {pt.value.toLocaleString()}
            </span>
          </div>

          <div className="pt-2 border-t border-white/20 space-y-1 text-white text-[11px]">
            <div className="flex justify-between">
              <span className="text-cyan-100">Total Population:</span>
              <strong className="text-white">{pt.totalPop.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-100">Labour Force:</span>
              <strong className="text-white">{pt.labourForce.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-100">Unemployment Rate:</span>
              <strong className="text-white font-extrabold">{pt.unemploymentRate}%</strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs my-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" style={{ color: config.color }} />
            <h3 className="text-base font-extrabold text-slate-900">
              {config.label} Trend Analysis (2016 – 2025)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {config.description} across the 9-year Curaçao Labour Force study period
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">2016-2025 Delta:</span>
            <span
              className={`font-black flex items-center gap-0.5 ${
                totalDiff >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {totalDiff >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {totalDiff >= 0 ? '+' : ''}
              {totalDiff.toLocaleString()} ({totalPctChange}%)
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Peak Year ({maxPoint?.year}):</span>
            <span className="font-extrabold text-slate-900">{maxVal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Responsive Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 20, right: 25, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={config.color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={true} />
            <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis
              tickLine={false}
              domain={[Math.floor(minVal * 0.9), Math.ceil(maxVal * 1.05)]}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={formatNumber}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke={config.color}
              strokeWidth={3}
              fill={`url(#gradient-${selectedMetric})`}
              dot={{ r: 5, fill: config.color, stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: config.color, stroke: '#ffffff', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Insights Banner */}
      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <span className="text-slate-400 font-bold block text-[10px] uppercase">2016 Baseline</span>
          <div className="text-sm font-extrabold text-slate-800 mt-0.5">
            {firstVal.toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <span className="text-slate-400 font-bold block text-[10px] uppercase">Lowest Recorded</span>
          <div className="text-sm font-extrabold text-slate-800 mt-0.5">
            {minVal.toLocaleString()} ({minPoint?.year})
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <span className="text-slate-400 font-bold block text-[10px] uppercase">2025 Latest Level</span>
          <div className="text-sm font-extrabold text-slate-800 mt-0.5">
            {lastVal.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
