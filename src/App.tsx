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
import { BarChart3, PieChart, Table, CircleDot, BookOpen, Info } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<LabourDataPoint[]>(INITIAL_CURACAO_DATA);
  const [selectedMetric, setSelectedMetric] = useState<MetricKey | null>(null);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'bubble' | 'composition' | 'table'>('overview');

  const handleSelectMetric = (key: MetricKey) => {
    setSelectedMetric((prev) => (prev === key ? null : key));
  };

  const sortedData = [...data].sort((a, b) => a.year - b.year);
  const latestPoint = sortedData[sortedData.length - 1] || INITIAL_CURACAO_DATA[INITIAL_CURACAO_DATA.length - 1];

  const handleResetData = () => {
    setData(INITIAL_CURACAO_DATA);
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
    <div className="min-h-screen text-slate-900 font-sans antialiased bg-[#dce6f1] selection:bg-indigo-600 selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Interactive 8 CBS Metric Category Squares */}
        <KpiCards
          data={data}
          selectedMetric={selectedMetric}
          onSelectMetric={handleSelectMetric}
        />

        {/* Content Section - Rendered based on selected card */}
        {selectedMetric === 'generalInformation' ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs my-6 min-h-[320px]">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0091c3] flex items-center justify-center border border-sky-100">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  General Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Glossary of terms and formulas used to calculate statistics.
                </p>
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50 my-4">
              <div className="w-12 h-12 rounded-full bg-white text-[#0091c3] flex items-center justify-center mx-auto mb-3 shadow-xs border border-slate-200">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
                Glossary & Definitions Space
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                This page is prepared for your terms and calculation formulas. Share the details whenever you are ready and they will be added here!
              </p>
            </div>
          </div>
        ) : selectedMetric ? (
          <div>
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
                <DataTable data={data} onExportCsv={handleExportCsv} />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-8 sm:p-12 text-center shadow-xs my-6">
            <div className="w-12 h-12 bg-[#02a0cc] text-white rounded-[10px] flex items-center justify-center mx-auto mb-4 shadow-xs">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
              Select a Card Above
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Click on any of the category cards above to display historical trend charts, analytics, and detailed data breakdowns.
            </p>
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
