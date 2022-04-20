import { CollegeOrMajorRequirement } from '../../types';
import { includesWithSubRequirements } from '../checkers-common';

const inequalityRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Inequality Core Course',
    description:
      'This course reviews contemporary approaches to understanding social' +
      ' inequality and the processes by which it comes to be seen as legitimate,' +
      ' natural, or desirable. Offered every spring semester.',
    source: 'https://inequality.cornell.edu/minor-overview-and-requirements',
    checker: includesWithSubRequirements(['PAM 2208', 'SOC 2208', 'DSOC 2090']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
  {
    name: 'Inequality Overview Course',
    description: 'An Overview Course',
    source: 'https://inequality.cornell.edu/minor-overview-and-requirements',
    checker: includesWithSubRequirements([
      'SOC 2220',
      'DSOC 2220',
      'PAM 2220',
      'ILROB 2220',
      'PHIL 1950',
      'AMST 2225',
      'GOVT 2225',
      'DSOC 3700',
      'SOC 3710',
      'PAM 3370',
      'SOC 3370',
      'ILROB 6260',
      'PAM 4470',
      'SOC 4470',
      'ILRLE 4426',
      'ECON 3450',
    ]),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
  {
    name: 'Inequality Electives',
    description:
      'Four electives chosen from the full list of elective courses. ' +
      'If enrolled in the Health Equity Track, two of those four electives must ' +
      'be electives labelled with the indicated health-equity focus. The other two ' +
      'can be chosen from the broader list and can include other health-equity courses.',
    source: 'https://inequality.cornell.edu/minor-overview-and-requirements',
    checker: includesWithSubRequirements([
      'CRP 1101',
      'CRP 2010',
      'CRP 3201',
      'CRP 6201',
      'CRP 4040',
      'CRP 5040',
      'ECON 3855',
      'CRP 4770',
      'CRP 6770',
      'AIIS 1110',
      'AMST 1601',
      'AIIS 4000',
      'AIIS 6000',
      'DSOC 1101',
      'DSOC 2710',
      'AMST 2710',
      'AMST 5710',
      'DSOC 5710',
      'EDUC 2710',
      'EDUC 5710',
      'SOC 2710',
      'SOC 5710',
      'DSCO 3130',
      'DSCO 5130',
      'DSOC 3700',
      'SOC 3710',
      'EDUC 2210',
      'DSOC 2210',
      'EDUC 2610',
      'EDUC 3110',
      'COMM 3110',
      'HD 3110',
      'ASRC 1500',
      'AMST 1500',
      'GOVT 1503',
      'ASRC 3350',
      'AMST 3355',
      'ENGL 3950',
      'FGSS 3350',
      'ASRC 4002',
      'AMST 4002',
      'SOC 4010',
      'ASRC 4602',
      'ASRC 6602',
      'AMST 1101',
      'AMST 4051',
      'LAW 4051',
      'ANTHR 2400',
      'ANTHR 2468',
      'BSOC 2468',
      'FGSS 2467',
      'STS 2468',
      'ANTHR 3405',
      'AMST 3405',
      'EDUC 3405',
      'LSP 3405',
      'ANTHR 3703',
      'AAS 3030',
      'AMST 3703',
      'AMST 6703',
      'ANTHR 6703',
      'AAS 1100',
      'BSOC 2061',
      'PHIL 2960',
      'STS 2061',
      'ECON 3875',
      'AEM 6300',
      'ECON 4290',
      'ENGL 2620',
      'AAS 2620',
      'AMST 2620',
      'FGSS 2010',
      'FGSS 2290',
      'LGBT 2290',
      'GOVT 2152',
      'AMST 2152',
      'LSP 2152',
      'GOVT 3071',
      'AMST 3071',
      'GOVT 3131',
      'AMST 3131',
      'LAW 4131',
      'HIST 1540',
      'AMST 1540',
      'ILRLR 1845',
      'HIST 2512',
      'AMST 2512',
      'ASRC 2512',
      'FGSS 2512',
      'HIST 2541',
      'ASRC 2308',
      'LATA 2308',
      'HIST 2721',
      'AMST 2722',
      'BSOC 2721',
      'STST 2721',
      'HIST 3652',
      'ASRC 3652',
      'HIST 4945',
      'HIST 6945',
      'LSP 2460',
      'AMST 2460',
      'COML 2032',
      'FGSS 2460',
      'SPAN 2460',
      'NES 3720',
      'JWST 3720',
      'JWST 6720',
      'NES 6720',
      'RELST 3720',
      'RELST 6720',
      'BIONB 3215',
      'FGSS 3210',
      'LGBT 3210',
      'PMA 4701',
      'AMST 4705',
      'FGSS 4701',
      'LGBT 4701',
      'LSP 4701',
      'LSP 6701',
      'PMA 6701',
      'SHUM 4701',
      'PHIL 2410',
      'PHIL 4490',
      'FGSS 4491',
      'PHIL 6490',
      'PSYCH 4800',
      'PSYCH 6800',
      'STS 4231',
      'FGSS 4231',
      'HIST 4231',
      'STS 4650',
      'BSOC 4650',
      'SOC 1101',
      'SOC 2190',
      'SOC 2208',
      'DSOC 2090',
      'PAM 2208',
      'SOC 2250',
      'SOC 3190',
      'SOC 3680',
      'GOVT 3683',
      'SOC 4120',
      'HD 3320',
      'FGSS 3320',
      'HD 3530',
      'NS 2600',
      'NS 3060',
      'NS 4500',
      'NS 4998',
      'PAM 2030',
      'SOC 2030',
      'PAM 3180',
      'SOC 3180',
      'PAM 3780',
      'PAM 4160',
      'SOC 4160',
      'PAM 4280',
      'ECON 3710',
      'ILRHR 2640',
      'ILRIC 2310',
      'ILRIC 2350',
      'ILRLE 2400',
      'ILRLR 2010',
      'ILRLR 2060',
      'ILRLR 3830',
      'ILRLR 4023',
      'ILRLR 4033',
      'ILRLR 4035',
      'FGSS 4035',
      'AEM 2015',
      'AEM 3385',
    ]),
    fulfilledBy: 'courses',
    perSlotMinCount: [4],
    slotNames: ['Course'],
  },
];

export default inequalityRequirements;
