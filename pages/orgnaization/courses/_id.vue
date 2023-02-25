<template>
  <div style="" class="">
    <div class="row justify-content-between my-4">
      <div class="col-auto mt-2">
        <nuxt-link to="/orgnaization/dashboard">DASHBOARD /</nuxt-link>
        <nuxt-link to="/orgnaization/coursesList">COURSES LIST</nuxt-link>
        <span class="text-white">/ {{ courseName }}</span>
      </div>
    </div>

    <h2 class="text-center mb-5 text-white">
      Course Control <i class="fa-solid fa-gears"></i>
    </h2>

    <div class="sections-header">
      <div class="d-flex justify-content-start">
        <h6
          :class="[
            'section-header',
            'pb-2',
            'px-3',
            'pointer',
            { active: hasActiveClass[0] },
          ]"
          @click="changeSectionShow(0)"
        >
          Course Information
        </h6>
        <h6
          :class="[
            'section-header',
            'pb-2',
            'px-3',
            'pointer',
            { active: hasActiveClass[1] },
          ]"
          @click="changeSectionShow(1)"
        >
          Course Content
        </h6>
        <h6
          :class="[
            'section-header',
            'pb-2',
            'px-3',
            'pointer',
            { active: hasActiveClass[2] },
          ]"
          @click="changeSectionShow(2)"
        >
          Publishing
        </h6>
      </div>
      <hr />
    </div>

    <!-- <div v-show="spinnerLoadShow" class="text-center">
      <h6 class="text-white">
        Loading... <spinner-load :spinnerLoadShow="spinnerLoadShow" />
      </h6>
    </div> -->
    <!-- <information-couse /> -->
    <formCourse
      @getName="
        (value) => {
          courseName = value;
        }
      "
      :id="$route.params.id"
      action1="Show"
      v-show="shown == 0"
      @emitFinishInit="(value) => {
        getPublishStatus();
        readyToInit= value;
      }"
    />
    <publishing
      @changeStatus="
        (value) => {
          courseStatus = value;
        }
      "
      :courseStatus="courseStatus"
      v-show="shown == 2"
    />
    <add-curriculum v-if="readyToInit" :courseid="$route.params.id" v-show="shown == 1" />
    <!-- <formCourse action='Update'/> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashBoardLayout",
  data() {
    return {
      spinnerLoadShow: false,
      shown: 0,
      filePreview: "",
      fileName: "",
      courseStatus: null,
      hasActiveClass: [true, false, false],
      courseName: "Course Name",
      readyToInit:false
    };
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    changeSectionShow(sectionNumber) {
      this.shown = sectionNumber;
      this.alertActiveClasse(sectionNumber);
    },
    alertActiveClasse(sectionNumber) {
      this.hasActiveClass = [false, false, false];
      this.hasActiveClass[sectionNumber] = true;
    },
    async getPublishStatus() {
      let result = await this.sendRequest({
        url: "/orgnaization/getCourseStatus",
        dataSend: {
          course_id: this.$route.params.id,
        },
      });
      if (result.data.status) {
        this.courseStatus = result.data.courseStatus.status;
      }
    },
  },
  async mounted() {
    // this.spinnerLoadShow = true;
    // let result = await this.sendRequest({
    //   url: "/orgnaization/getCourseStatus",
    //   dataSend: {
    //     course_id: this.$route.params.id,
    //   },
    // });
    // this.spinnerLoadShow = false;
    // if (result.data.status) {
    //   this.courseStatus = result.data.courseStatus.status;
    // }
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.sections-header {
  position: relative;
}
a {
  color: #a4a4b2;
  text-decoration: none;
}
hr {
  position: absolute;
  bottom: -8px;
  color: white;
  width: 100%;
}
.section-header {
  /* color: #687484; */
  color: white;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
}
.section-header:hover {
  border-bottom: 2.5px solid #0258e3;
}
.active {
  /* color: #42bbff; */
  border-bottom: 2.5px solid #0258e3;
}
</style>