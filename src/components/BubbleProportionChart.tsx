import React, { useState } from 'react';
import { LabourDataPoint } from '../types';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { CircleDot, SlidersHorizontal } from 'lucide-react';

interface BubbleProportionChartProps {
  data: LabourDataPoint[];
}

export const BubbleProportionChart: React.FC<BubbleProportionChartProps> = ({ data }) => {
  const [xAxisMode, setXAxisMode] = useState<'year' | 'totalPopulation'>('year');
  const [sizeMode, setSizeMode] = useState<'unemployed' | 'totalPop'>('unemployed');

  const sortedData = [...data].sort((a, b) => a.year - b.year);
  const yearTicks = Array.from(new Set(sortedData.map((d) => d.year))).sort((a, b) => a - b);

  // Determine color according to unemployment rate severity
  const getBubbleColor = (rate: number, isProjection?: boolean) => {
    if (isProjection) return '#8b5cf6'; // violet for simulated
    if (rate > 7.5) return '#f43f5e'; // rose for severe peak (e.g., 2020)
    if (rate > 5.0) return '#f59e0b'; // amber for moderate
    return '#10b981'; // emerald for low/favorable
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const pt: LabourDataPoint = payload[0].payload;
      return (
        <div
          className="text-white p-3.5 rounded-xl shadow-xl text-xs space-y-1.5 border border-cyan-300/30"
          style={{ backgroundColor: '#1792c3' }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-extrabold text-sm text-white">{pt.year} Data Point</span>
            {pt.isProjection && (
              <span className="bg-white/20 text-white border border-white/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                Simulated
              </span>
            )}
          </div>
          <div className="pt-1 border-t border-white/20 grid grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <span className="text-cyan-100 block text-[10px]">Unemployment Rate</span>
              <strong className="text-white text-sm font-extrabold">{pt.unemploymentRate}%</strong>
            </div>
            <div>
              <span className="text-cyan-100 block text-[10px]">Employed Rate</span>
              <strong className="text-white text-sm font-extrabold">{pt.employmentRate}%</strong>
            </div>
            <div>
              <span className="text-cyan-100 block text-[10px]">Unemployed Count</span>
              <span className="font-semibold text-white">{pt.unemployedPopulation.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-cyan-100 block text-[10px]">Total Population</span>
              <span className="font-semibold text-white">{pt.totalPopulation.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <CircleDot className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Multi-Dimensional Bubble Matrix Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Bubble position encodes rate severity; Bubble volume encodes headcount magnitudes.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-[10px] uppercase font-extrabold text-slate-400 px-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> X-Axis:
            </span>
            <button
              onClick={() => setXAxisMode('year')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                xAxisMode === 'year' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Year
            </button>
            <button
              onClick={() => setXAxisMode('totalPopulation')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                xAxisMode === 'totalPopulation' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Population Size
            </button>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-[10px] uppercase font-extrabold text-slate-400 px-2">Size:</span>
            <button
              onClick={() => setSizeMode('unemployed')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                sizeMode === 'unemployed' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unemployed
            </button>
            <button
              onClick={() => setSizeMode('totalPop')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                sizeMode === 'totalPop' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Total Pop
            </button>
          </div>
        </div>
      </div>

      {/* Bubble Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 flex-wrap">
        <span className="font-bold text-slate-700">Severity Indicators:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          <span className="text-slate-600 font-medium">Favorable (&le; 5.0%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          <span className="text-slate-600 font-medium">Moderate (5.1% - 7.5%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
          <span className="text-slate-600 font-medium">Severe Peak (&gt; 7.5%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-violet-500 inline-block"></span>
          <span className="text-slate-600 font-medium">Simulated Projection</span>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={true} />
            <XAxis
              type="number"
              dataKey={xAxisMode}
              name={xAxisMode === 'year' ? 'Year' : 'Total Population'}
              domain={xAxisMode === 'year' ? ['dataMin - 1', 'dataMax + 1'] : ['dataMin - 5000', 'dataMax + 5000']}
              ticks={xAxisMode === 'year' ? yearTicks : undefined}
              interval={0}
              tickFormatter={(val) => (xAxisMode === 'year' ? val.toString() : val.toLocaleString())}
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis
              type="number"
              dataKey="unemploymentRate"
              name="Unemployment Rate"
              unit="%"
              domain={[0, 'dataMax + 2']}
              stroke="#64748b"
              fontSize={12}
            />
            <ZAxis
              type="number"
              dataKey={sizeMode === 'unemployed' ? 'unemployedPopulation' : 'totalPopulation'}
              range={[200, 2400]}
              name={sizeMode === 'unemployed' ? 'Unemployed Count' : 'Total Population'}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Labour Points" data={sortedData}>
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBubbleColor(entry.unemploymentRate, entry.isProjection)}
                  stroke="#ffffff"
                  strokeWidth={2}
                  className="transition-all hover:opacity-80 cursor-pointer"
                />
              ))}
              <LabelList
                dataKey="year"
                position="top"
                dy={-10}
                style={{ fontSize: '11px', fontWeight: '700', fill: '#334155', pointerEvents: 'none' }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
