<template>
  <div class="requirement">
    <div class="requirement-header">
      <button
        class="requirement-dropdown"
        type="button"
        @click="showDropdown = !showDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        :aria-expanded="showDropdown"
      >
        <div class="requirement-header">
          <drop-down-arrow :isFlipped="showDropdown" :fillColor="emGreen" />
          <p v-if="selectedRequirement.reqId === ''" class="requirement-header-text">
            New Requirement
          </p>
          <p v-else class="requirement-header-text">
            {{ selectedRequirement.reqName }}
          </p>
        </div>
      </button>
      <button class="courseMenu-section full-opacity-on-hover" @click="deleteRequirement">
        <div class="courseMenu-left">
          <img src="@/assets/images/trash.svg" alt="delete req trashcan icon" />
        </div>
      </button>
    </div>
    <div v-if="showDropdown">
      <p class="requirement-header-subtext">Please select a major/minor requirement.</p>
      <all-requirements-dropdown
        :available-choices="availableRequirements"
        :choice="selectedRequirement.reqName"
        @on-select="selectRequirement"
      />
      <new-course-modal
        @close-course-modal="closeCourseModal"
        v-if="isCourseModalOpen"
        @add-course="addCourse"
        :year="year"
        :season="season"
        :filterForRequirementID="selectedRequirement.reqId"
      />
      <div class="requirement-courses">
        <div v-for="c in uniqueify(selectedRequirement.courses)" :key="c.crseId">
          <div class="requirement-courseWrapper">
            <course
              :courseObj="c"
              :active="false"
              :isReqCourse="false"
              :compact="false"
              :isSchedGenCourse="true"
              @delete-course="deleteCourse"
              :isSemesterCourseCard="false"
            />
          </div>
        </div>
        <add-course-button
          v-if="selectedRequirement.reqId !== ''"
          :compact="false"
          :should-clear-padding="true"
          @click="openCourseModal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AddCourseButton from '@/components/AddCourseButton.vue';
import NewCourseModal from '@/components/Modals/NewCourse/NewCourseModal.vue';
import { emGreen } from '@/assets/constants/scss-variables';
import DropDownArrow from '@/components/DropDownArrow.vue';
import AllRequirementsDropdown from '@/components/ScheduleGenerate/AllRequirementsDropdown.vue';
import Course from '@/components/Course/Course.vue';
import { ReqCourses } from '@/components/ScheduleGenerate/ScheduleGenerateSideBar.vue';

export default defineComponent({
  props: {
    availableRequirements: {
      type: Object as PropType<Readonly<Record<string, string>>>,
      required: true,
    },
    selectedRequirement: {
      type: Object as PropType<ReqCourses>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    year: { type: Number, required: true },
    season: { type: String as PropType<FirestoreSemesterSeason>, required: true },
  },
  emits: {
    'add-course': (course: CornellCourseRosterCourse, index: number) =>
      typeof course === typeof 'CornellCourseRosterCourse' && typeof index === typeof 'number',
    'delete-course': (code: string, index: number) =>
      typeof code === typeof 'string' && typeof index === typeof 'number',
    'select-requirement': (reqId: string, index: number) =>
      typeof reqId === typeof 'string' && typeof index === 'number',
    // 'add-available-requirement': (requirement: ReqCourses) =>
    //   typeof requirement === typeof 'ReqCourses',
    // 'delete-available-requirement': (reqId: string) => typeof reqId === typeof 'string',
    'delete-requirement': () => true,
  },
  data() {
    return {
      showDropdown: true,
      isCourseModalOpen: false,
      emGreen,
    };
  },
  components: {
    AddCourseButton,
    NewCourseModal,
    DropDownArrow,
    AllRequirementsDropdown,
    Course,
  },
  computed: {
    requirementChoice(): string {
      return this.selectedRequirement.reqName;
    },
  },
  methods: {
    openCourseModal() {
      this.isCourseModalOpen = !this.isCourseModalOpen;
    },
    closeCourseModal() {
      this.isCourseModalOpen = false;
    },
    closeDropdownIfOpen() {
      this.showDropdown = false;
    },
    selectRequirement(requirement: string) {
      // TODO: uncomment once we limit the number of requirement groups of each type
      // if (this.selectedRequirement.reqId !== '') {
      //   this.$emit('add-available-requirement', this.selectedRequirement);
      // }
      this.$emit('select-requirement', requirement, this.index);
      // this.$emit('delete-available-requirement', requirement);
    },
    deleteRequirement() {
      this.$emit('delete-requirement');
    },
    addCourse(course: CornellCourseRosterCourse) {
      this.$emit('add-course', course, this.index);
    },
    deleteCourse(code: string) {
      this.$emit('delete-course', code, this.index);
    },
    uniqueify(courses: FirestoreSemesterCourse[]): FirestoreSemesterCourse[] {
      const uniqueCourses: FirestoreSemesterCourse[] = [];
      const courseIds: number[] = [];
      courses.forEach(course => {
        if (!courseIds.includes(course.crseId)) {
          uniqueCourses.push(course);
          courseIds.push(course.crseId);
        }
      });
      return uniqueCourses;
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';
.requirement {
  border-top: 1px solid;
  border-color: $inactiveGray;
  margin-bottom: 0.5rem;

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 6px;
  }

  &-dropdown {
    padding-bottom: 3px;
  }

  &-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 28px;
    &-text {
      color: $emGreen;
      margin-bottom: 0;
      margin-left: 12px;
      font-size: 16px;
      font-weight: 900;
    }
    &-subtext {
      color: $inactiveGray;
    }
  }
  &-courses {
    margin-top: 1rem;
    margin-bottom: 1.2rem;
  }
  &-courseWrapper {
    padding: 0.2rem;
  }
}
</style>
