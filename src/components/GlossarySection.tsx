import React from 'react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'employed',
    term: 'Employed',
    definition:
      'All persons of 15 years and older who during the research period: a. had a job or have their own business; or b. who during the week preceding the research period performed any work for pay in cash or in kind, for 4 hours or more.',
  },
  {
    id: 'unemployed',
    term: 'Unemployed',
    definition:
      'All persons 15 years and older who during the research period: a. did not have a job or a business of their own; and b. had actively been seeking work in the preceding month of the research period; and c. who were available to start working or start a business within two weeks.',
  },
  {
    id: 'economically-not-active',
    term: 'Economically not active',
    definition:
      'All persons of 15 years and older who during the research period: a. did not have a job or own a business; and b. who were not actively seeking work.',
  },
  {
    id: 'labour-force',
    term: 'Labour force',
    definition:
      'The total number of persons who are employed added to the total number of persons who are unemployed.',
  },
  {
    id: 'unemployment-rate',
    term: 'Unemployment rate',
    definition:
      'The number of unemployed persons as a percentage of the labour force (employed and not employed). The economically inactive group is not counted in this calculation.',
  },
  {
    id: 'youth-unemployment-rate',
    term: 'Youth unemployment rate',
    definition: 'The unemployment rate in the age category of 15 to 24 years.',
  },
  {
    id: 'labour-force-participation-rate',
    term: 'Labour Force participation rate',
    definition:
      'The number of persons in the labour force as a percentage of the working age population.',
  },
  {
    id: 'gross-participation-rate',
    term: 'Gross Participation rate',
    definition:
      'The number of persons in the labour force as a percentage of the total population.',
  },
  {
    id: 'net-participation-rate',
    term: 'Net Participation rate',
    definition:
      'The number of persons working as a percentage of the total population.',
  },
  {
    id: 'underemployment',
    term: 'Underemployment',
    definition:
      'The percentage of employed persons who are employed and are seeking or are available for additional work during the reference period. Individuals 15 years and older were also classified in the following categories depending on their answers.',
  },
  {
    id: 'informal-labour',
    term: 'Informal labour',
    definition:
      'Working arrangements that are in practice or by law not subject to national labour legislation, income taxation, or entitlement to social protection or other employment categories; for example, advance notice of dismissal, severance pay or paid annual or sick leave (International Labour Organization, 2023).',
  },
  {
    id: 'unpaid-domestic-care-work',
    term: 'Unpaid domestic and care work',
    definition:
      'Activities under unpaid domestic services for household and family members and unpaid care services for household and family members (United Nations Development Programme, 2018). Refers to unpaid housework, such as cooking, cleaning and other household tasks, and taking care of household members, including children and older persons.',
  },
  {
    id: 'volunteer-work',
    term: 'Volunteer work',
    definition:
      'Unpaid non-compulsory work; that is, time individuals give without pay to activities performed either through an organization or directly for others outside their own household (International Labour Office, 2011).',
  },
];

export const GlossarySection: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs my-6">
      {/* Header */}
      <div className="pb-5 border-b border-slate-200 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Glossary & Official Definitions
        </h2>
      </div>

      {/* Grid of Definition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {GLOSSARY_TERMS.map((item) => (
          <div
            key={item.id}
            className="bg-slate-100 border border-slate-200/90 rounded-xl p-5 flex flex-col justify-between hover:bg-slate-200/60 transition-colors"
          >
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.term}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {item.definition}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

