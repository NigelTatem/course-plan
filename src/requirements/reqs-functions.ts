import buildRequirementFulfillmentGraph from './requirement-graph-builder';
import requirementJson from './typed-requirement-json';
import {
  CourseTaken,
  DecoratedCollegeOrMajorRequirement,
  RequirementFulfillment,
  RequirementFulfillmentStatistics,
  GroupedRequirementFulfillmentReport
} from './types';

type RequirementMap = { readonly [code: string]: readonly string[] };
type MutableRequirementMapWithMutableChildren = { [code: string]: string[] };

/** currently not being used but perhaps move to checkers-common
 * @param courseName : name of the course (as a code)
 * @param code : code to check courseName (can contain * to denote any value)
 * @returns if a code matches the course name (CS 2110 and CS 2*** returns true, AEM 3110 and AEM 32** returns false)
 */
// function ifCodeMatch(courseName: string, code: string): boolean {
//   for (let i = 0; i < courseName.length; i += 1) {
//     if (code[i] !== '*' && courseName[i] !== code[i]) return false;
//   }
//   return true;
// }

/** currently not being used but perhaps move to checkers-common
 * @param {string} subject : subject of course to check
 * @param {string} number : number of course to check
 * @returns if the course satisfies all-eligible query (not PE or 10XX course)
 */
// function ifAllEligible(subject: string, number: string): boolean {
//   return !ifCodeMatch(subject, 'PE') && !ifCodeMatch(number, '10**');
// }


/**
 * @param coursesTaken a list of all taken courses.
 * @param requirement the requirement to compute course fulfillment.
 * @returns a naively computed list of courses that fulfill the requirement, partitioned into sub-requirement filfillment.
 */
function filterAndPartitionCoursesThatFulfillRequirement(
  coursesTaken: readonly CourseTaken[],
  requirement: DecoratedCollegeOrMajorRequirement
): CourseTaken[][] {
  const { courses: requirementCourses } = requirement;
  const coursesThatFulfilledRequirement: CourseTaken[][] = requirementCourses.map(() => []);
  coursesTaken.forEach(courseTaken => {
    const { roster, courseId } = courseTaken;
    requirementCourses.forEach((subRequirementCourses, subRequirementIndex) => {
      if (subRequirementCourses[roster] && subRequirementCourses[roster].includes(courseId)) {
        // add the course to the list of courses used to fulfill that one sub-requirement
        coursesThatFulfilledRequirement[subRequirementIndex].push(courseTaken);
      }
    });
  });
  return coursesThatFulfilledRequirement;
}

function computeFulfillmentStatistics<T extends {}>({ requirement, courses: coursesThatFulfilledRequirement }: RequirementFulfillment<T>): RequirementFulfillmentStatistics {
  let minCountFulfilled = 0;
  coursesThatFulfilledRequirement.forEach(coursesThatFulfilledSubRequirement => {
    if (coursesThatFulfilledSubRequirement.length === 0) {
      return;
    }

    if (requirement.operator === 'or') {
      // Accumulating requirements with double counting with 'or/ operator
      switch (requirement.fulfilledBy) {
        case 'courses':
          minCountFulfilled += coursesThatFulfilledSubRequirement.length;
          break;
        case 'credits':
          minCountFulfilled += coursesThatFulfilledSubRequirement
            .map(course => course.credits)
            .reduce((a, b) => a + b);
          break;
        case 'self-check':
          return;
        default:
          throw new Error('Fulfillment type unknown.');
      }
    } else if (requirement.operator === 'and') {
      // Accumulating requirements without double counting with 'and' operator
      switch (requirement.fulfilledBy) {
        case 'courses':
          minCountFulfilled += 1;
          break;
        case 'credits':
          minCountFulfilled += coursesThatFulfilledSubRequirement
            .map(course => course.credits)
            .reduce((a, b) => Math.max(a, b), 0);
          break;
        case 'self-check':
          return;
        default:
          throw new Error('Fulfillment type unknown.');
      }
    }
  });

  if (requirement.totalCount === undefined) {
    return { minCountFulfilled };
  }

  let totalCountFulfilled = 0;
  Array.from(new Set(coursesThatFulfilledRequirement.flat()).values()).forEach(courseThatFulfilledRequirement => {
    // depending on what it is fulfilled by, either increase the count or credits you took
    switch (requirement.fulfilledBy) {
      case 'courses':
        totalCountFulfilled += 1;
        return;
      case 'credits':
        totalCountFulfilled += courseThatFulfilledRequirement.credits;
        return;
      case 'self-check':
        return;
      default:
        throw new Error('Fulfillment type unknown.');
    }
  });

  return { minCountFulfilled, totalCountFulfilled };
}

/**
 * @param coursesTaken a list of classes taken by the user, with some metadata (e.g. no. of credits)
 * helping to compute requirement progress.
 * @param college user's college.
 * @param majors user's list of majors.
 * @param minors user's list of minors.
 * @returns all requirements fulfillments, grouped by University, College, Major.
 */
export function computeRequirements(
  coursesTaken: readonly CourseTaken[],
  college: string,
  majors: readonly string[] | null,
  minors: readonly string[] | null
): readonly GroupedRequirementFulfillmentReport[] {
  // prepare grouped fulfillment summary
  const groups: GroupedRequirementFulfillmentReport[] = [];

  // check university & college & major & minor requirements
  if (!(college in requirementJson.college)) throw new Error('College not found.');

  const universityReqs = requirementJson.university.UNI;
  const collegeReqs = requirementJson.college[college];

  type RequirementWithSourceType = DecoratedCollegeOrMajorRequirement & {
    readonly sourceType: 'College' | 'Major' | 'Minor';
    readonly sourceSpecificName: string;
  };
  const requirementsToBeConsideredInGraph: readonly RequirementWithSourceType[] = [
    ...universityReqs.requirements.map(
      it => ({ ...it, sourceType: 'College', sourceSpecificName: college } as const)
    ),
    ...collegeReqs.requirements.map(
      it => ({ ...it, sourceType: 'College', sourceSpecificName: college } as const)
    ),
    ...(majors || [])
      .map(major => {
        const majorRequirement = requirementJson.major[major];
        if (majorRequirement == null) return [];
        return majorRequirement.requirements.map(
          it => ({ ...it, sourceType: 'Major', sourceSpecificName: major } as const)
        );
      })
      .flat(),
    ...(minors || [])
      .map(minor => {
        const minorRequirement = requirementJson.minor[minor];
        if (minorRequirement == null) return [];
        return minorRequirement.requirements.map(
          it => ({ ...it, sourceType: 'Minor', sourceSpecificName: minor } as const)
        );
      })
      .flat()
  ];

  const { requirementFulfillmentGraph } = buildRequirementFulfillmentGraph<
    RequirementWithSourceType,
    CourseTaken,
    undefined
  >({
    requirements: requirementsToBeConsideredInGraph,
    userCourses: coursesTaken,
    userChoiceOnFulfillmentStrategy: [],
    userChoiceOnDoubleCountingElimiation: [],
    // TODO assign an unique ID to each requirement entry.
    getRequirementUniqueID: requirement => `${requirement.name} ${requirement.description}`,
    getCourseUniqueID: course => `${course.roster} ${course.courseId}`,
    getAllCoursesThatCanPotentiallySatisfyRequirement: requirement => (
      requirement.courses
        .map((eligibleCourses): readonly CourseTaken[] => {
          const courses: CourseTaken[] = [];
          Object.entries(eligibleCourses).forEach(([roster, courseIds]) => {
            courseIds.forEach(courseId => courses.push({
              roster,
              courseId,
              // Only roster and courseId are used for equality comparison,
              // so other dummy values doesn't matter.
              code: 'DUMMY',
              subject: 'DUMMY',
              number: 'DUMMY',
              credits: 0
            }));
          });
          return courses;
        })
        .flat()
    ),
    getCorrespondingRequirementAndAllRelevantCoursesUnderFulfillmentStrategy: () => ({
      // Give back dummy value for now. Give it a real strategy when we have non-empty
      // userChoiceOnFulfillmentStrategy
      correspondingRequirement: requirementsToBeConsideredInGraph[0],
      coursesOfChosenFulfillmentStrategy: []
    }),
    // TODO: Replace this dummy implementation once we decided how to determine if a requirement is
    // double-countable. Meanwhile, make it always return true to match the old behavior.
    allowDoubleCounting: () => true
  });

  type FulfillmentStatistics = {
    readonly requirement: RequirementWithSourceType;
    readonly courses: readonly (readonly CourseTaken[])[];
  } & RequirementFulfillmentStatistics;
  const collegeFulfillmentStatistics: FulfillmentStatistics[] = [];
  const majorFulfillmentStatisticsMap = new Map<string, FulfillmentStatistics[]>();
  const minorFulfillmentStatisticsMap = new Map<string, FulfillmentStatistics[]>();
  requirementFulfillmentGraph.getAllRequirements().forEach(requirement => {
    const courses = requirementFulfillmentGraph.getConnectedCoursesFromRequirement(requirement);
    const requirementAndCourses = {
      requirement,
      courses: filterAndPartitionCoursesThatFulfillRequirement(courses, requirement)
    };
    const fulfillmentStatistics = {
      ...requirementAndCourses, ...computeFulfillmentStatistics(requirementAndCourses)
    };

    switch (requirement.sourceType) {
      case 'College':
        collegeFulfillmentStatistics.push(fulfillmentStatistics);
        break;
      case 'Major': {
        const existingArray = majorFulfillmentStatisticsMap.get(requirement.sourceSpecificName);
        if (existingArray != null) {
          existingArray.push(fulfillmentStatistics);
        } else {
          majorFulfillmentStatisticsMap.set(requirement.sourceSpecificName, [fulfillmentStatistics]);
        }
        break;
      }
      case 'Minor': {
        const existingArray = minorFulfillmentStatisticsMap.get(requirement.sourceSpecificName);
        if (existingArray != null) {
          existingArray.push(fulfillmentStatistics);
        } else {
          minorFulfillmentStatisticsMap.set(requirement.sourceSpecificName, [fulfillmentStatistics]);
        }
        break;
      }
      default:
        throw new Error();
    }
  });

  groups.push({
    groupName: 'College',
    specific: college,
    reqs: collegeFulfillmentStatistics
  });

  majorFulfillmentStatisticsMap.forEach((fulfillmentStatistics, majorName) => {
    groups.push({ groupName: 'Major', specific: majorName, reqs: fulfillmentStatistics });
  });
  minorFulfillmentStatisticsMap.forEach((fulfillmentStatistics, minorName) => {
    groups.push({ groupName: 'Minor', specific: minorName, reqs: fulfillmentStatistics });
  });

  return groups;
}

/**
 * @param groups all requirements fulfillments, grouped by University, College, Major.
 * @returns a object where keys are course code and values are a list of requirement a class fulfills.
 */
export function computeRequirementMap(groups: readonly GroupedRequirementFulfillmentReport[]): RequirementMap {
  const requirementsMap: MutableRequirementMapWithMutableChildren = {};
  groups.forEach(group => {
    group.reqs.forEach(({ requirement: { name: requirementName }, courses: coursesThatFulfilledRequirement }) => {
      coursesThatFulfilledRequirement.forEach(coursesThatFulfilledSubRequirement => {
        coursesThatFulfilledSubRequirement.forEach(({ code }) => {
          // Add course to dictionary with name
          if (code in requirementsMap) requirementsMap[code].push(requirementName);
          else requirementsMap[code] = [requirementName];
        });
      });
    });
  });
  return requirementsMap;
}
