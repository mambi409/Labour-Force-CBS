import React, { useState } from 'react';
import { LabourDataPoint, MetricKey } from './types';
import { INITIAL_CURACAO_DATA } from './data/curacaoData';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { UnemploymentTrendChart } from './components/UnemploymentTrendChart';
import { BubbleProportionChart } from './components/BubbleProportionChart';
import { YearlyProportionDonut } from './components/YearlyProportionDonut';
import { DataTable } from './components/DataTable';
import { AiAnalystDrawer } from './components/AiAnalystDrawer';
import { BarChart3, PieChart, Table, CircleDot } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<LabourDataPoint[]>(INITIAL_CURACAO_DATA);
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('totalPopulation');
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'bubble' | 'composition' | 'table'>('overview');

  const sortedData = [...data].sort((a, b) => a.year - b.year);
  const latestPoint = sortedData[sortedData.length - 1] || INITIAL_CURACAO_DATA[INITIAL_CURACAO_DATA.length - 1];

  const handleResetData = () => {
    setData(INITIAL_CURACAO_DATA);
  };

  const handleDeleteRow = (year: number) => {
    setData((prev) => prev.filter((d) => d.year !== year));
  };

  const handleExportCsv = () => {
    const headers = 'Year,Total Population,Population 0-14,Population 15+,Labour Force,Employed Population,Unemployed Population,Economically Not Active,Unemployment Rate (%)\n';
    const rows = sortedData
      .map(
        (d) =>
          `${d.year},${d.totalPopulation},${d.pop0To14},${d.pop15Plus},${d.labourForce},${d.employedPopulation},${d.unemployedPopulation},${d.economicallyNotActive},${d.unemploymentRate}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `curacao_labour_force_2016_2025.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white" style={{ background: 'linear-gradient(180deg, #89cae6 0%, #ffffff 100%)' }}>
      {/* Header */}
      <Header
        onOpenAi={() => setIsAiOpen(true)}
        onResetData={handleResetData}
        onExportCsv={handleExportCsv}
        dataCount={data.length}
        latestYear={latestPoint.year}
        latestUnemploymentRate={latestPoint.unemploymentRate}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Interactive 7 CBS Metric Category Squares */}
        <KpiCards
          data={data}
          selectedMetric={selectedMetric}
          onSelectMetric={setSelectedMetric}
        />

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white text-indigo-600 border-x border-t border-slate-200 shadow-xs -mb-[9px] z-10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Proportional Trends</span>
          </button>

          <button
            onClick={() => setActiveTab('bubble')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bubble'
                ? 'bg-white text-indigo-600 border-x border-t border-slate-200 shadow-xs -mb-[9px] z-10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <CircleDot className="w-4 h-4" />
            <span>Bubble Matrix Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('composition')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'composition'
                ? 'bg-white text-indigo-600 border-x border-t border-slate-200 shadow-xs -mb-[9px] z-10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Composition & Donut Comparison</span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'table'
                ? 'bg-white text-slate-900 border-x border-t border-slate-200 shadow-xs -mb-[9px] z-10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Data Inspector</span>
          </button>
        </div>

        {/* Tab Content Views */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <UnemploymentTrendChart data={data} selectedMetric={selectedMetric} />

            <BubbleProportionChart data={data} />
          </div>
        )}

        {activeTab === 'bubble' && (
          <div className="space-y-6">
            <BubbleProportionChart data={data} />
          </div>
        )}

        {activeTab === 'composition' && (
          <div className="space-y-6">
            <YearlyProportionDonut data={data} />
          </div>
        )}

        {activeTab === 'table' && (
          <div className="space-y-6">
            <DataTable
              data={data}
              onDeleteRow={handleDeleteRow}
              onExportCsv={handleExportCsv}
            />
          </div>
        )}

      </main>

      {/* AI Analyst Drawer */}
      <AiAnalystDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        dataset={data}
      />
    </div>
  );

}
