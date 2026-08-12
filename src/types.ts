export interface LabourDataPoint {
  year: number;
  totalPopulation: number;
  pop0To14: number;
  pop15Plus: number;
  employedPopulation: number;
  unemployedPopulation: number;
  economicallyNotActive: number;
  labourForce: number;
  // Derived rates
  unemploymentRate: number; // % of Labour Force
  employmentRate: number; // % of Labour Force
  labourParticipationRate: number; // Labour Force / Pop 15+ * 100
  unemploymentRateTotalPop: number; // % of Total Pop
  isProjection?: boolean;
}

export type MetricKey =
  | 'generalInformation'
  | 'totalPopulation'
  | 'pop0To14'
  | 'pop15Plus'
  | 'employedPopulation'
  | 'unemployedPopulation'
  | 'economicallyNotActive'
  | 'labourForce';

export interface MetricMeta {
  key: MetricKey;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
}

export const METRIC_CONFIGS: Record<MetricKey, MetricMeta> = {
  generalInformation: {
    key: 'generalInformation',
    label: 'General Information',
    shortLabel: 'General Information',
    description: 'General Labour Force Overview & Unemployment Rate (%)',
    color: '#0284c7',
    bgLight: 'bg-sky-50/80',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-100 text-sky-800',
  },
  totalPopulation: {
    key: 'totalPopulation',
    label: 'Total Population',
    shortLabel: 'Total Pop',
    description: 'Total resident population of Curaçao',
    color: '#2563eb',
    bgLight: 'bg-blue-50/80',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    badgeBg: 'bg-blue-100 text-blue-800',
  },
  pop0To14: {
    key: 'pop0To14',
    label: 'Population 0-14 Years',
    shortLabel: 'Pop 0-14',
    description: 'Youth population aged 0 to 14 years',
    color: '#0284c7',
    bgLight: 'bg-sky-50/80',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-100 text-sky-800',
  },
  pop15Plus: {
    key: 'pop15Plus',
    label: 'Population 15+ Years',
    shortLabel: 'Pop 15+',
    description: 'Working-age population (15 years and older)',
    color: '#7c3aed',
    bgLight: 'bg-violet-50/80',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    badgeBg: 'bg-violet-100 text-violet-800',
  },
  employedPopulation: {
    key: 'employedPopulation',
    label: 'Employed Population',
    shortLabel: 'Employed',
    description: 'Currently gainfully employed individuals',
    color: '#059669',
    bgLight: 'bg-emerald-50/80',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100 text-emerald-800',
  },
  unemployedPopulation: {
    key: 'unemployedPopulation',
    label: 'Unemployed Population',
    shortLabel: 'Unemployed',
    description: 'Actively seeking work but currently jobless',
    color: '#e11d48',
    bgLight: 'bg-rose-50/80',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    badgeBg: 'bg-rose-100 text-rose-800',
  },
  economicallyNotActive: {
    key: 'economicallyNotActive',
    label: 'Economically Not Active Population',
    shortLabel: 'Inactive Pop',
    description: 'Students, retirees, caregivers, and non-seeking adults',
    color: '#d97706',
    bgLight: 'bg-amber-50/80',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100 text-amber-800',
  },
  labourForce: {
    key: 'labourForce',
    label: 'Labour Force',
    shortLabel: 'Labour Force',
    description: 'Total active labor pool (Employed + Unemployed)',
    color: '#4f46e5',
    bgLight: 'bg-indigo-50/80',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-100 text-indigo-800',
  },
};

export interface ScenarioParams {
  projectedYear: number;
  populationGrowthRate: number; // e.g. +0.5%
  targetUnemploymentRate: number; // e.g. 3.0%
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
