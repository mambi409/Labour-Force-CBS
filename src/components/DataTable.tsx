import React, { useState } from 'react';
import { LabourDataPoint } from '../types';
import { Table, Download } from 'lucide-react';

interface DataTableProps {
  data: LabourDataPoint[];
  onExportCsv: () => void;
}

export const DataTable: React.FC<DataTableProps> = ({ data, onExportCsv }) => {
  const [showPercentages, setShowPercentages] = useState<boolean>(false);

  const sortedData = [...data].sort((a, b) => a.year - b.year);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#02a0cc] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Table className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Official Curacao Labour Force Dataset (2016 – 2025)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 ml-10">
            Full breakdown including working-age (15+), active labour force, and economically inactive population
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setShowPercentages(false)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                !showPercentages ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Raw Counts
            </button>
            <button
              onClick={() => setShowPercentages(true)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                showPercentages ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Proportional (%)
            </button>
          </div>

          <button
            onClick={onExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Year</th>
              <th className="py-3.5 px-4 text-right">Total Population</th>
              <th className="py-3.5 px-4 text-right">Pop 0-14</th>
              <th className="py-3.5 px-4 text-right">Pop 15+</th>
              <th className="py-3.5 px-4 text-right">Labour Force</th>
              <th className="py-3.5 px-4 text-right">Employed</th>
              <th className="py-3.5 px-4 text-right">Unemployed</th>
              <th className="py-3.5 px-4 text-right">Inactive</th>
              <th className="py-3.5 px-4 text-right">Unemp Rate (% LF)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {sortedData.map((row) => (
              <tr
                key={row.year}
                className={`hover:bg-slate-50/80 transition-colors ${
                  row.isProjection ? 'bg-indigo-50/30' : ''
                }`}
              >
                <td className="py-3.5 px-4 font-extrabold text-slate-900 flex items-center gap-2">
                  <span>{row.year}</span>
                  {row.isProjection && (
                    <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold">
                      Simulated
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-4 text-right font-semibold text-slate-700">
                  {showPercentages ? '100.0%' : row.totalPopulation.toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                  {showPercentages
                    ? `${((row.pop0To14 / row.totalPopulation) * 100).toFixed(1)}%`
                    : (row.pop0To14 || 0).toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                  {showPercentages
                    ? `${((row.pop15Plus / row.totalPopulation) * 100).toFixed(1)}%`
                    : (row.pop15Plus || 0).toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                  {showPercentages
                    ? `${((row.labourForce / row.totalPopulation) * 100).toFixed(1)}%`
                    : (row.labourForce || 0).toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-right font-extrabold text-indigo-600">
                  {showPercentages
                    ? `${((row.employedPopulation / row.totalPopulation) * 100).toFixed(1)}%`
                    : row.employedPopulation.toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-right font-extrabold text-rose-600">
                  {showPercentages
                    ? `${((row.unemployedPopulation / row.totalPopulation) * 100).toFixed(1)}%`
                    : row.unemployedPopulation.toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                  {showPercentages
                    ? `${((row.economicallyNotActive / row.totalPopulation) * 100).toFixed(1)}%`
                    : (row.economicallyNotActive || 0).toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                  <span className={`px-2.5 py-1 rounded-lg font-extrabold border ${
                    row.unemploymentRate > 15 
                      ? 'bg-rose-50 text-rose-700 border-rose-100'
                      : row.unemploymentRate > 10
                      ? 'bg-amber-50 text-amber-700 border-amber-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}>
                    {row.unemploymentRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


