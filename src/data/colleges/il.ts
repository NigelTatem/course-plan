import { CollegeOrMajorRequirement, Course } from '../../requirements/types';
import {
  courseIsFWS,
  courseMatchesCodeOptions,
  includesWithSingleRequirement,
  includesWithSubRequirements,
} from '../../requirements/checkers';
import { AdvisorGroup } from '../../tools/advisors/types';

const FLcourses: readonly string[] = [
  'ARAB',
  'BENGL',
  'BURM',
  'CHIN',
  'FREN',
  'GERST',
  'GREEK',
  'HEBRW',
  'HINDI',
  'INDO',
  'ITAL',
  'JAPAN',
  'KHMER',
  'KOREA',
  'LATIN',
  'NEPAL',
  'PERSN',
  'POLSH',
  'PORT',
  'RUSSA',
  'SANSK',
  'SINHA',
  'SPAN',
  'SWAHL',
  'TAG',
  'THAI',
  'TURK',
  'VIET',
  'YORUB',
  'ZULU',
];

const ilrRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'First Year Core Fart',
    description:
      'Students are required to fulfill the following core requirements during the first four semesters of enrollment in the ILR school.',
    source:
      'https://www.ilr.cornell.edu/student-experience/curriculum-requirements/undergraduate-requirements',
    checker: includesWithSubRequirements(
      ['ILRID 1500', 'ILRID 2500'],
      ['ILROB 1220'],
      ['ILRLR 1100'],
      ['ECON 1110'],
      ['ECON 1120']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1, 1],
    slotNames: ['ILRID 1500 or ILRID 2500', 'ILROB 1220', 'ILRLR 1100', 'ECON 1110', 'ECON 1120'],
  },
  {
    name: 'Second Year Core Requirements',
    description:
      'Students are required to fulfill the following core requirements during the first four semesters of enrollment in the ILR school.',
    source:
      'https://www.ilr.cornell.edu/student-experience/curriculum-requirements/undergraduate-requirements',
    checker: includesWithSubRequirements(
      ['ILRST 2100'],
      ['ILRLR 2010'],
      ['ILRHR 2600'],
      ['ILRLR 2050'],
      ['ILRLE 2400']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1, 1],
    slotNames: ['ILRST 2100', 'ILRLR 2010', 'ILRHR 2600', 'ILRLR 2050', 'ILRLE 2400'],
  },
  {
    name: 'First-Year Writing Seminars',
    description: 'All students are required to take two first-year writing seminars.',
    source:
      'https://www.ilr.cornell.edu/student-experience/curriculum-requirements/undergraduate-requirements',
    checker: [courseIsFWS],
    fulfilledBy: 'courses',
    perSlotMinCount: [2],
    slotNames: ['Course'],
  },
  {
    name: 'ILR Advanced Writing Course',
    description:
      'Courses must be taken for a letter grade in order to count toward the ILR Requirements',
    source:
      'https://www.ilr.cornell.edu/student-experience/curriculum-requirements/undergraduate-requirements/ilr-advanced-writing-courses',
    checker: includesWithSingleRequirement(
      'ILRHR 2360',
      'ILRHR 2640',
      'ILRIC 2650',
      'ILRIC 2310',
      'ILRIC 2370',
      'ILRIC 2385',
      'ILRIC 2390',
      'ILRLE 2400',
      'ILRLR 2060',
      'ILROB 2230',
      'ENGL 2880'
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
  {
    name: 'Distribution Requirement: Western Intellectual Tradition',
    description: 'Complete one course from this category.',
    source:
      'https://www.ilr.cornell.edu/student-experience/curriculum-requirements/undergraduate-requirements',
    checker: includesWithSubRequirements([
      'AMST 1115',
      'AMST 1530',
      'AMST 1531',
      'AMST 1640',
      'AMST 2020',
      'AMST 2220',
      'AMST 2640',
      'AMST 2760',
      'AMST 3032',
      'AMST 3121',
      'AMST 3131',
      'AMST 3140',
      'AMST 3450',
      'AMST 3533',
      'AMST 3605',
      'AMST 3665',
      'ARTH 2200',
      'ARTH 2400',
      'ARTH 2600',
      'ARTH 3440',
      'ARTH 3760',
      'ASIAN 3305',
      'CAPS 3857',
      'CLASS 2601',
      'CLASS 2603',
      'CLASS 2604',
      'CLASS 2612',
      'CLASS 2651',
      'CLASS 2661',
      'CLASS 2675',
      'CLASS 2681',
      'CLASS 3642',
      'COML 2010',
      'COML 2020',
      'COML 2033',
      'COML 3630',
      'COML 4471',
      'DSOC 1101',
      'DSOC 3010',
      'GOVT 1615',
      'GOVT 1817',
      'GOVT 2605',
      'GERST 4250',
      'HIST 1510',
      'HIST 1511',
      'HIST 1585',
      'HIST 1960',
      'HIST 2810',
      'HIST 3490',
      'HIST 3500',
      'HIST 3510',
      'HIST 3700',
      'ILRLR 4820',
      'ILRLR 4880',
      'JWST 2651',
      'JWST 2724',
      'LAW 4051',
      'NTRES 3320',
      'PHIL1100',
      'PHIL 1450',
      'PHIL 2220',
      'PHIL 2410',
      'PHIL 2530',
      'PHIL 2610',
      'SOC 1101',
      'SOC 2190',
      'SOC 2560',
    ]),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
  {
    name: 'Distribution Requirement: Cultural Perspective',
    description: 'Complete one course from this category.',
    source:
      'https://www.ilr.cornell.edu/student-experience/curriculum-requirements/undergraduate-requirements',
    checker: includesWithSubRequirements([
      'ASRC 1330',
      'ASRC 1500',
      'ASRC 2003',
      'ASRC 2235',
      'ASRC 2240',
      'ASRC 2300',
      'ASRC 2308',
      'ASRC 2543',
      'ASRC 2670',
      'ASRC 2674',
      'ASRC 3310',
      'ASRC 3501',
      'ASRC 4502',
      'ASRC 4600',
      'ASRC 4601',
      'ASRC 4602',
      'ASRC 6600',
      'AIIS 2390',
      'AIIS 2600',
      'AIIS 2660',
      'AMST 2401',
      'AMST 3420',
      'ANTHR 1400',
      'ANTHR 2400',
      'ANTHR 2430',
      'ANTHR 2465',
      'ANTHR 2560',
      'ANTHR 3255',
      'ANTHR 3420',
      'ANTHR 3479',
      'ANTHR 3545',
      'ARKEO 2522',
      'ARKEO 3800',
      'ARCH 3402',
      'ARTH 3820',
      'ARTH 3850',
      'ARTH 3856',
      'ASIAN 1191',
      'ASIAN 2280',
      'ASIAN 2211',
      'ASIAN 2212',
      'ASIAN 2215',
      'ASIAN 2218',
      'ASIAN 2222',
      'ASIAN 2225',
      'ASIAN 2245',
      'ASIAN 2247',
      'ASIAN 2250',
      'ASIAN 2259',
      'ASIAN 2260',
      'ASIAN 2262',
      'ASIAN 2267',
      'ASIAN 3374',
      'ASIAN 2275',
      'ASIAN 2277',
      'ASIAN 2279',
      'ASIAN 2298',
      'ASIAN 3321',
      'ASIAN 3327',
      'ASIAN 3346',
      'ASIAN 3351',
      'ASIAN 3355',
      'ASIAN 3359',
      'ASIAN 3374',
      'ASIAN 3389',
      'ASIAN 3396',
      'ASIAN 4436',
      'ASIAN 4489',
      'ASIAN 6651',
      'CAPS 3049',
      'CLASS 2634',
      'CRP 1101',
      'COML 3743',
      'DSOC 2010',
      'DSOC 3290',
      'DSOC 4300',
      'DSOC 6060',
      'ENGL 2090',
      'FGSS 4640',
      'FDSC 2500',
      'GOVT 1313',
      'GOVT 2807',
      'GOVT 3313',
      'GOVT 3353',
      'GOVT 3537',
      'GOVT 3977',
      'HIST 1960',
      'HIST 1970',
      'HIST 2161',
      'HIST 2180',
      'HIST 2530',
      'HIST 2969',
      'HIST 3519',
      'HIST 3700',
      'HIST 4590',
      'HIST 4963',
      'JWST 2556',
      'JWST 2575',
      'JWST 2644',
      'JWST 4525',
      'LATA 1301',
      'LATA 2200',
      'MUSIC 1302',
      'NES 2523',
      'NES 2537',
      'NES 3658',
      'SPAN 2150',
      'SPAN 2205',
      'SPAN 3440',
    ]),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
  {
    name: 'Distribution Requirement: Science & Technology',
    description: 'Complete one course from this category.',
    source:
      'https://www.ilr.cornell.edu/student-experience/curriculum-requirements/undergraduate-requirements',
    checker: includesWithSubRequirements([
      'AMST 2980',
      'AMST 3911',
      'ANTHR 1200',
      'ANTHR 1300',
      'ANTHR 2200',
      'ANTHR 2750',
      'ANTHR 3390',
      'AEP 1100',
      'ASTRO 1101',
      'ASTRO 1102',
      'ASTRO 1103',
      'ASTRO 1104',
      'ASTRO 1105',
      'ASTRO 1106',
      'ASTRO 1107',
      'ASTRO 1195',
      'ASTRO 2201',
      'ASTRO 2202',
      'ASTRO 2211',
      'BIOG 1101',
      'BIOG 1103',
      'BIOG 1105',
      'BIOG 1107',
      'BIOG 1108',
      'BIOG 1140',
      'BIOEE 1540',
      'BIOEE 1560',
      'BIOEE 1610',
      'BIOEE 2070',
      'BIOEE 2670',
      'BIOMG 1150',
      'BIOMG 1290',
      'BIOMG 2820',
      'BEE 3299',
      'BSOC 2101',
      'BSOC 2821',
      'BSOC 3011',
      'BSOC 3111',
      'BSOC 4071',
      'CHEM 1150',
      'CHEM 1560',
      'CHEM 1570',
      'CHEM 2070',
      'CHEM 2080',
      'CHEM 2150',
      'COGST 1101',
      'EAS 1101',
      'EAS 1220',
      'EAS 1310',
      'EAS 1700',
      'EAS 2680',
      'EAS 3340',
      'ECE 2500',
      'FDSC 4800',
      'HIST 2810',
      'HD 1150',
      'HD 2200',
      'HD 2610',
      'INFO 1200',
      'INFO 4240',
      'MUSIC 1466',
      'NTRES 2010',
      'NS 1150',
      'PHIL 2810',
      'PHIL 2860',
      'PHIL 3810',
      'PHYS 1101',
      'PHYS 1102',
      'PHYS 1112',
      'PHYS 1201',
      'PHYS 1203',
      'PHYS 2207',
      'PHYS 2208',
      'PLBIO 2400',
      'PLBIO 2410',
      'PLPPM 2013',
      'PLPPM 2015',
      'PLSCI 2013',
      'PSYCH 2050',
      'PSYCH 2090',
      'PSYCH 2230',
      'STS 2011',
      'STS 4331',
      'VIEN 2204',
    ]),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
  // TODO: breakdown this req in next PR
  {
    name: 'Economic Policy Electives',
    description: 'Complete one course from this category.',
    source:
      'https://www.ilr.cornell.edu/current-students/curriculum-requirements/undergraduate-requirements/economic-policy-electives',
    checker: includesWithSubRequirements([
      'AEM 2300',
      'AEM 2350',
      'AEM 4300',
      'AEM 4315',
      'AEM 4350',
      'AMST 3230',
      'CS 2850',
      'ECON 3120',
      'ECON 3300',
      'ECON 3340',
      'ECON 3410',
      'ECON 3420',
      'ECON 3430',
      'ECON 3440',
      'ECON 3450',
      'ECON 3460',
      'ECON 3670',
      'ECON 3480',
      'ECON 3485',
      'ECON 3770',
      'ECON 3720',
      'ECON 3801',
      'ECON 3810',
      'ECON 3830',
      'ECON 3840',
      'ECON 3850',
      'ECON 4260',
      'ECON 4290',
      'ECON 4510',
      'ECON 4904',
      'ILRHR 6601',
      'ILRIC 6350',
      'ILRLE 4420',
      'ILRLE 4460',
      'ILRLE 4470',
      'ILRLE 6420',
      'ILRLE 6480',
      'PAM 2040',
      'PAM 3240',
      'PAM 3340',
      'PAM 3400',
      'PAM 3600',
      'PAM 5340',
    ]),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
  {
    name: 'International & Comparative Labor Electives',
    description: 'Complete one course from this category.',
    source:
      'https://www.ilr.cornell.edu/current-students/curriculum-requirements/undergraduate-requirements/international-comparative-labor-electives',
    checker: includesWithSubRequirements([
      'AEM 3388',
      'AEM 3557',
      'AMST 2152',
      'AMST 3549',
      'ASIAN 4443',
      'DSOC 3547',
      'ECON 3330',
      'ECON 3340',
      'ECON 3450',
      'FGSS 4360',
      'GOVT 3303',
      'GOVT 6303',
      'GOVT 6413',
      'ILRIC 2301',
      'ILRIC 2310',
      'ILRIC 2350',
      'ILRIC 2360',
      'ILRIC 2370',
      'ILRIC 2385',
      'ILRIC 2390',
      'ILRIC 3325',
      'ILRIC 3342',
      'ILRIC 3375',
      'ILRIC 4011',
      'ILRIC 4031',
      'ILRIC 4311',
      'ILRIC 4313',
      'ILRIC 4314',
      'ILRIC 4325',
      'ILRIC 4332',
      'ILRIC 4333',
      'ILRIC 4335',
      'ILRIC 4337',
      'ILRIC 4340',
      'ILRIC 4343',
      'ILRIC 4344',
      'ILRIC 4347',
      'ILRIC 4357',
      'ILRIC 4360',
      'ILRIC 4367',
      'ILRIC 4372',
      'ILRIC 4375',
      'ILRIC 4390',
      'ILRIC 4395',
      'ILRIC 5300',
      'ILRIC 5310',
      'ILRIC 5375',
      'ILRIC 6000',
      'ILRIC 6010',
      'ILRIC 6011',
      'ILRIC 6013',
      'ILRIC 6014',
      'ILRIC 6020',
      'ILRIC 6311',
      'ILRIC 6332',
      'ILRIC 6333',
      'ILRIC 6343',
      'ILRIC 6350',
      'ILRIC 6370',
      'ILRIC 6372',
      'ILRLR 2080',
      'ILRLR 3068',
      'ILRLR 3830',
      'ILRHR 2690',
      'ILRHR 4650',
      'ILRHR 6616',
      'ILRHR 6900',
      'ILRLE 6420',
    ]),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
  {
    name: 'Labor History Electives',
    description: 'Complete one course from this category.',
    source:
      'https://www.ilr.cornell.edu/current-students/curriculum-requirements/undergraduate-requirements/labor-history-electives',
    checker: includesWithSubRequirements([
      'AMST 1540',
      'AMST 3022',
      'AMST 3060',
      'AMST 3065',
      'AMST 3240',
      'AMST 3590',
      'AMST 3845',
      'AMST 3860',
      'AMST 3870',
      'AMST 4314',
      'AMST 4533',
      'ECON 3300',
      'ECON 3330',
      'ECON 3340',
      'FGSS 4360',
      'HIST 2062',
      'HIST 4085',
      'HIST 6065',
      'ILRLR 2063',
      'ILRLR 2070',
      'ILRLR 3020',
      'ILRLR 3040',
      'ILRLR 3070',
      'ILRLR 3071',
      'ILRLR 3850',
      'ILRLR 3880',
    ]),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
  {
    // TODO: don't check the minimum 24 and 16 credits yet
    name: 'Elective Requirements',
    description:
      'Students are required to take 40 ILR elective credits for graduation. Within these 40 ILR elective credits, students must take ' +
      'A minimum of 24 credits must be taken within the ILR school. Up to 16 credits may be taken outside ILR in the following areas: Foreign language (Up to 12 credits) ' +
      'Advanced mathematics (as approved by ILR Social Statistics department), and Out of College Advanced ILR Electives',
    source:
      'https://www.ilr.cornell.edu/current-students/undergraduate-student-resources/curriculum-requirements/undergraduate-requirements',
    checker: [
      (course: Course): boolean => {
        if (
          courseMatchesCodeOptions(course, [
            'AEM 1200',
            'AEM 2010',
            'AEM 2210',
            'AEM 2241',
            'AEM 2300',
            'AEM 2500',
            'AEM 3230',
            'AEM 3249',
            'AEM 3250',
            'AEM 3320',
            'AEM 3249',
            'AEM 3547',
            'AEM 4300',
            'AEM 4415',
            'AEM 4500',
            'AEM 4510',
            'AEM 4940',
            'AEM 4970',
            'ASRC 3652',
            'COMM 2450',
            'COMM 3189',
            'COMM 4200',
            'CS 2800',
            'DSOC 2050',
            'DSOC 2090',
            'DSOC 2750',
            'DSOC 3010',
            'DSOC 3547',
            'DSOC 3700',
            'ECON 3030',
            'ECON 3040',
            'ECON 3125',
            'ECON 3130',
            'ECON 3140',
            'ECON 3320',
            'ECON 3350',
            'ECON 3720',
            'ECON 3760',
            'ECON 3800',
            'ECON 3830',
            'ECON 3840',
            'ECON 4220',
            'ECON 4260',
            'ECON 4290',
            'ECON 4510',
            'ECON 4560',
            'ECON 4610',
            'ECON 4904',
            'FSAD 4440',
            'GOVT 3547',
            'HADM 1740',
            'HADM 2210',
            'HADM 2230',
            'HADM 2250',
            'HADM 2740',
            'HADM 3030',
            'HADM 3040',
            'HADM 3850',
            'HADM 3870',
            'HADM 4115',
            'HADM 4125',
            'HADM 4130',
            'HADM 4140',
            'HADM 4145',
            'HADM 4150',
            'HADM 4220',
            'HADM 4395',
            'HADM 4770',
            'HADM 4818',
            'HADM 4850',
            'HADM 6030',
            'HADM 6090',
            'HADM 6145',
            'HADM 6240',
            'HD 2650',
            'HD 2820',
            'HIST 1955',
            'INFO 4240',
            'ITAL 4710',
            'LAW 6652',
            'MATH 1920',
            'MATH 2210',
            'MATH 2940',
            'NBA 3000',
            'NBA 4120',
            'NBA5111',
            'NBA 5360',
            'NBA 5690',
            'NBA 5900',
            'NBA 6330',
            'NCC 5500',
            'NCC 5540',
            'NCC 5560',
            'NCC 5590',
            'ORIE 3150',
            'PAM 2000',
            'PAM 2040',
            'PAM 3240',
            'PAM 3340',
            'PAM 3400',
            'PSYCH 2800',
            'PSYCH 3800',
            'SOC 2190',
            'SOC 2560',
            'SOC 3120',
            'SOC 3570',
          ])
        ) {
          return true;
        }
        if (FLcourses.some(language => course.subject?.includes(language) ?? false)) {
          return true;
        }
        return ['IL'].includes(course.acadGroup);
      },
    ],
    fulfilledBy: 'credits',
    perSlotMinCount: [40],
    allowCourseDoubleCounting: true,
  },
];
export default ilrRequirements;

export const ilrAdvisors: AdvisorGroup = {
  advisors: [{ name: 'Rebecca Schimenti', email: 'rss347@cornell.edu' }],
};
