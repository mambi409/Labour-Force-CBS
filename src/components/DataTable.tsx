import React, { useState } from 'react';
import { LabourDataPoint } from '../types';
import { computeDataPoint } from '../data/curacaoData';
import { Table, Download, Plus, Trash2 } from 'lucide-react';

interface DataTableProps {
  data: LabourDataPoint[];
  onAddRow: (point: LabourDataPoint) => void;
  onDeleteRow: (year: number) => void;
  onExportCsv: () => void;
}

export const DataTable: React.FC<DataTableProps> = ({ data, onAddRow, onDeleteRow, onExportCsv }) => {
  const [showPercentages, setShowPercentages] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // New row form state
  const [newYear, setNewYear] = useState<number>(2021);
  const [newTotalPop, setNewTotalPop] = useState<number>(150000);
  const [newPop0To14, setNewPop0To14] = useState<number>(25000);
  const [newPop15Plus, setNewPop15Plus] = useState<number>(125000);
  const [newEmployedPop, setNewEmployedPop] = useState<number>(60000);
  const [newUnempPop, setNewUnempPop] = useState<number>(11000);
  const [newInactivePop, setNewInactivePop] = useState<number>(54000);

  const sortedData = [...data].sort((a, b) => a.year - b.year);

  const handleCreateRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newYear || newTotalPop <= 0) return;

    const newPoint = computeDataPoint({
      year: Number(newYear),
      totalPopulation: Number(newTotalPop),
      pop0To14: Number(newPop0To14),
      pop15Plus: Number(newPop15Plus),
      employedPopulation: Number(newEmployedPop),
      unemployedPopulation: Number(newUnempPop),
      economicallyNotActive: Number(newInactivePop),
      labourForce: Number(newEmployedPop) + Number(newUnempPop),
    });

    onAddRow(newPoint);
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Official Curacao Labour Force Dataset (2016 – 2025)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
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
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>

          <button
            onClick={onExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Add Row Drawer / Form */}
      {isAdding && (
        <form onSubmit={handleCreateRow} className="mb-6 p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span className="uppercase tracking-widest text-[10px] text-indigo-600 font-extrabold">Insert Custom Year Data Point</span>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Year</label>
              <input
                type="number"
                value={newYear}
                onChange={(e) => setNewYear(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Total Population</label>
              <input
                type="number"
                value={newTotalPop}
                onChange={(e) => setNewTotalPop(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Population 0-14</label>
              <input
                type="number"
                value={newPop0To14}
                onChange={(e) => setNewPop0To14(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Population 15+</label>
              <input
                type="number"
                value={newPop15Plus}
                onChange={(e) => setNewPop15Plus(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Employed Pop</label>
              <input
                type="number"
                value={newEmployedPop}
                onChange={(e) => setNewEmployedPop(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Unemployed Pop</label>
              <input
                type="number"
                value={newUnempPop}
                onChange={(e) => setNewUnempPop(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Inactive Pop</label>
              <input
                type="number"
                value={newInactivePop}
                onChange={(e) => setNewInactivePop(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Save Data Point
            </button>
          </div>
        </form>
      )}

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
              <th className="py-3.5 px-4 text-center">Actions</th>
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

                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => onDeleteRow(row.year)}
                    title={`Delete data for ${row.year}`}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


