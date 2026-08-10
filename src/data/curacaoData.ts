import { LabourDataPoint } from '../types';

export interface RawLabourDataPoint {
  year: number;
  totalPopulation: number;
  pop0To14: number;
  pop15Plus: number;
  employedPopulation: number;
  unemployedPopulation: number;
  economicallyNotActive: number;
  labourForce: number;
  isProjection?: boolean;
}

export const RAW_CURACAO_DATA: RawLabourDataPoint[] = [
  {
    year: 2016,
    totalPopulation: 156721,
    pop0To14: 29382,
    pop15Plus: 127339,
    employedPopulation: 65118,
    unemployedPopulation: 9953,
    economicallyNotActive: 52268,
    labourForce: 75071,
  },
  {
    year: 2017,
    totalPopulation: 156597,
    pop0To14: 28539,
    pop15Plus: 128058,
    employedPopulation: 62834,
    unemployedPopulation: 10313,
    economicallyNotActive: 54911,
    labourForce: 73147,
  },
  {
    year: 2018,
    totalPopulation: 156230,
    pop0To14: 29950,
    pop15Plus: 126280,
    employedPopulation: 60729,
    unemployedPopulation: 9424,
    economicallyNotActive: 54113,
    labourForce: 70153,
  },
  {
    year: 2019,
    totalPopulation: 153545,
    pop0To14: 28665,
    pop15Plus: 124880,
    employedPopulation: 61547,
    unemployedPopulation: 12992,
    economicallyNotActive: 49715,
    labourForce: 74539,
  },
  {
    year: 2020,
    totalPopulation: 150789,
    pop0To14: 25735,
    pop15Plus: 125054,
    employedPopulation: 57050,
    unemployedPopulation: 13442,
    economicallyNotActive: 54562,
    labourForce: 70492,
  },
  {
    year: 2022,
    totalPopulation: 148924,
    pop0To14: 24238,
    pop15Plus: 124696,
    employedPopulation: 66722,
    unemployedPopulation: 10035,
    economicallyNotActive: 47479,
    labourForce: 76757,
  },
  {
    year: 2024,
    totalPopulation: 154934,
    pop0To14: 22001,
    pop15Plus: 132933,
    employedPopulation: 71919,
    unemployedPopulation: 6094,
    economicallyNotActive: 54919,
    labourForce: 78013,
  },
  {
    year: 2025,
    totalPopulation: 156929,
    pop0To14: 20952,
    pop15Plus: 135977,
    employedPopulation: 70980,
    unemployedPopulation: 3828,
    economicallyNotActive: 61170,
    labourForce: 74807,
  },
];

export function computeDataPoint(raw: RawLabourDataPoint): LabourDataPoint {
  const lf = raw.labourForce > 0 ? raw.labourForce : (raw.employedPopulation + raw.unemployedPopulation);
  const unempRate = lf > 0 ? Number(((raw.unemployedPopulation / lf) * 100).toFixed(2)) : 0;
  const empRate = Number((100 - unempRate).toFixed(2));
  const participationRate = raw.pop15Plus > 0 ? Number(((lf / raw.pop15Plus) * 100).toFixed(2)) : 0;
  const unempTotalPop = raw.totalPopulation > 0 ? Number(((raw.unemployedPopulation / raw.totalPopulation) * 100).toFixed(2)) : 0;

  return {
    year: raw.year,
    totalPopulation: raw.totalPopulation,
    pop0To14: raw.pop0To14,
    pop15Plus: raw.pop15Plus,
    employedPopulation: raw.employedPopulation,
    unemployedPopulation: raw.unemployedPopulation,
    economicallyNotActive: raw.economicallyNotActive,
    labourForce: lf,
    unemploymentRate: unempRate,
    employmentRate: empRate,
    labourParticipationRate: participationRate,
    unemploymentRateTotalPop: unempTotalPop,
    isProjection: raw.isProjection || false,
  };
}

export const INITIAL_CURACAO_DATA: LabourDataPoint[] = RAW_CURACAO_DATA.map(computeDataPoint);

export const KEY_EVENTS = [
  { year: 2016, title: 'Baseline Labour Force', description: 'Labour force at 75,071 with 13.26% unemployment (9,953 unemployed).' },
  { year: 2019, title: 'Pre-Pandemic Shift', description: 'Unemployment rose to 17.43% (12,992 individuals) in the active labour force.' },
  { year: 2020, title: 'COVID Pandemic Peak', description: 'Unemployment peaked at 19.07% of Labour Force (13,442 unemployed individuals).' },
  { year: 2022, title: 'Post-Pandemic Recovery', description: 'Reopening drives unemployment down to 13.07% as employed population grows to 66,722.' },
  { year: 2024, title: 'Economic Expansion', description: 'Employed population peaks at 71,919 with unemployment rate dropping to 7.81%.' },
  { year: 2025, title: 'Record Low Unemployment', description: 'Unemployment drops to a historic low of 5.12% (3,828 unemployed) with 135,977 working-age pop (15+).' },
];
