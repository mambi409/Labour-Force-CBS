import React, { useState } from 'react';
import { LabourDataPoint } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Columns, ArrowRight } from 'lucide-react';

interface YearlyProportionDonutProps {
  data: LabourDataPoint[];
}

export const YearlyProportionDonut: React.FC<YearlyProportionDonutProps> = ({ data }) => {
  const sorted = [...data].sort((a, b) => a.year - b.year);
  const years = sorted.map((d) => d.year);

  const [selectedYear1, setSelectedYear1] = useState<number>(years[0] || 2016);
  const [selectedYear2, setSelectedYear2] = useState<number>(years[years.length - 1] || 2025);
  const [compareMode, setCompareMode] = useState<boolean>(true);

  const data1 = sorted.find((d) => d.year === Number(selectedYear1)) || sorted[0];
  const data2 = sorted.find((d) => d.year === Number(selectedYear2)) || sorted[sorted.length - 1];

  const COLORS = {
    employed: '#6366f1', // indigo-500
    unemployed: '#f43f5e', // rose-500
  };

  const getPieData = (item: LabourDataPoint) => [
    { name: 'Employed / Other', value: item.employedPopulation, percentage: item.employmentRate, color: COLORS.employed },
    { name: 'Unemployed', value: item.unemployedPopulation, percentage: item.unemploymentRate, color: COLORS.unemployed },
  ];

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0];
      return (
        <div
          className="text-white p-3 rounded-xl shadow-lg text-xs space-y-1 border border-cyan-300/30"
          style={{ backgroundColor: '#1792c3' }}
        >
          <div className="font-semibold flex items-center gap-1.5 text-white">
            <span className="w-2.5 h-2.5 rounded-full inline-block border border-white/50" style={{ backgroundColor: p.payload.color }}></span>
            {p.name}
          </div>
          <div>Headcount: <strong className="text-white">{p.value.toLocaleString()}</strong></div>
          <div>Share of Total: <strong className="text-white font-extrabold">{p.payload.percentage}%</strong></div>
        </div>
      );
    }
    return null;
  };

  const RenderDonut = ({ item, title }: { item: LabourDataPoint; title: string }) => {
    const pieData = getPieData(item);
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-2">
          <span className="text-sm font-bold text-slate-900">{title} ({item.year})</span>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold">
            Pop: {item.totalPopulation.toLocaleString()}
          </span>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend & Stat Breakdown */}
        <div className="w-full grid grid-cols-2 gap-3 mt-2 pt-3 border-t border-slate-200 text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col">
            <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">Employed Share</span>
            <span className="text-lg font-extrabold text-indigo-600 mt-0.5">{item.employmentRate}%</span>
            <span className="text-[10px] text-slate-400 mt-0.5">{item.employedPopulation.toLocaleString()}</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col">
            <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">Unemployed Share</span>
            <span className="text-lg font-extrabold text-rose-600 mt-0.5">{item.unemploymentRate}%</span>
            <span className="text-[10px] text-slate-400 mt-0.5">{item.unemployedPopulation.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#02a0cc] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Columns className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Yearly Proportional Composition Breakdown
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 ml-10">
            Compare exact labor force proportions between any selected years
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-all cursor-pointer border border-indigo-200"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>{compareMode ? 'Single View' : 'Compare 2 Years'}</span>
          </button>
        </div>
      </div>

      {/* Year Selectors */}
      <div className="flex items-center gap-4 mb-6 flex-wrap bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <label className="font-bold text-slate-700">Select Year 1:</label>
          <select
            value={selectedYear1}
            onChange={(e) => setSelectedYear1(Number(e.target.value))}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {compareMode && (
          <>
            <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />
            <div className="flex items-center gap-2">
              <label className="font-bold text-slate-700">Select Year 2:</label>
              <select
                value={selectedYear2}
                onChange={(e) => setSelectedYear2(Number(e.target.value))}
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {/* Donut Grid */}
      <div className={`grid grid-cols-1 ${compareMode ? 'md:grid-cols-2' : ''} gap-6`}>
        <RenderDonut item={data1} title={compareMode ? 'Baseline / Selected Year 1' : 'Selected Year'} />
        {compareMode && <RenderDonut item={data2} title="Comparison Year 2" />}
      </div>

      {/* Delta Callout in Compare Mode */}
      {compareMode && data1 && data2 && (
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-xs text-indigo-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <strong>Proportional Shift ({data1.year} → {data2.year}):</strong>
            <span className="ml-2">
              Unemployment rate shifted by{' '}
              <strong className={data2.unemploymentRate <= data1.unemploymentRate ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                {(data2.unemploymentRate - data1.unemploymentRate).toFixed(2)}% percentage points
              </strong>.
            </span>
          </div>
          <div className="text-[11px] font-bold text-indigo-700">
            Headcount delta: {(data2.unemployedPopulation - data1.unemployedPopulation).toLocaleString()} unemployed
          </div>
        </div>
      )}
    </div>
  );
};

