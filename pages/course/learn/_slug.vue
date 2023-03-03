<template>
  <div class="">
    <header class="row">
      <h4 class="col-md-auto  d-md-block d-none">
        <i class="fa-solid fa-graduation-cap" style="color: #fca902"> E</i
        >-learning
      </h4>
      <h6 class="col-md-9 col-12">The Complete Flutter Development Guide [2022 Edition]</h6>
    </header>

    <div class="spinners" v-if="!sections">
      <span class="loader"></span>
    </div>
    <div v-else style="overflow-x: hidden !important">
      <div class="content row">
        <div v-show="courseName" class="col-lg-9  col-12" style="padding-right: 0">
            <div class="">
              <video
            @play="markLectureEvent = !markLectureEvent"
            width="100%"
            height="100%"
            controls
            ref="videoPlayer"
          >
            <source :src="videoSrc" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
            </div>
          <course-learn-navigation @emitSectionShow="(value)=>{navNumberShown = value}"/>
          <div class="mt-4 mb-5" style="width:95%;margin:auto;">
            <course-learn-sections  :courseId="courseId"
              v-show="navNumberShown == 0"
              v-if="courseId"
              :sections="sections"
              :markLectureEvent="markLectureEvent"
              :currentLectureId="currentLectureId"
              :currentSectionId="currentSectionId"
              :isCurrrentLectureMark="isCurrrentLectureMark"
              @emitVideoSrc="
                (value) => {
                  videoSrc = value;
                }
              "
              @emitCurrentLectureId="(value)=>{currentLectureId = value}"
              @emitCurrentSectionId="(value)=>{currentSectionId = value}"
              @emitIsCurrrentLectureMark="(value)=>{isCurrrentLectureMark = value}"
              @emitCourseName="(value)=>{courseName = value}"
              @emitMarkLectureEvent="(value) => {markLectureEvent = value}"
            />
            <course-questions :courseId="courseId" v-if="sections" v-show="navNumberShown == 2"/>
            <overview v-if="sections" v-show="navNumberShown == 1"/>
          </div>
        </div>
        <div
          class="col-lg-3 d-lg-block d-none"
          style="padding-left: 0"
        >
          <div class="sections-side-bar">

            <course-learn-sections  :courseId="courseId"
            v-if="courseId"
            :sections="sections"
              :markLectureEvent="markLectureEvent"
              :currentLectureId="currentLectureId"
              :currentSectionId="currentSectionId"
              :isCurrrentLectureMark="isCurrrentLectureMark"
              @emitVideoSrc="
                (value) => {
                  videoSrc = value;
                }
              "
              @emitCurrentLectureId="(value)=>{currentLectureId = value}"
              @emitCurrentSectionId="(value)=>{currentSectionId = value}"
              @emitIsCurrrentLectureMark="(value)=>{isCurrrentLectureMark = value}"
              @emitCourseName="(value)=>{courseName = value}"
              @emitMarkLectureEvent="(value) => {markLectureEvent = value}"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  middleware: ["AuthUser","checkUserRegisterInCourse"],

  data() {
    return {
      courseName: "",
      videoSrc: "",
      markLectureEvent:false,
      navNumberShown:1,
      currentLectureId: null,
      currentSectionId: null,
      isCurrrentLectureMark: false,
      sections:null,
      courseId:null
    };
  },
  watch: {
    videoSrc() {
      const videoPlayer = this.$refs.videoPlayer;
      videoPlayer.load();
    },
  },
  methods:{
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    async getCourseContent() {
      let result = await this.sendRequest({
        url: "/learn/getCourseContent",
        dataSend: {
          course_slug: this.$route.params.slug,
        },
      });
      if (result.data.status) {
        this.courseName = result.data.courseContent.course.name;
        this.courseId = result.data.courseContent.course.id;
        this.sections = result.data.courseContent.sections;
      }
      console.log(result.data);
    },
  },
  mounted(){
    this.getCourseContent();
  }
};
</script>

<style scoped>

.sections-side-bar {
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  box-shadow: 1px 1px 6px #888a88;
  padding-bottom: 100px;
  background: white;
  width: inherit;
}
.content {
  margin-top: 44px;
  background: #fdfdfd;
}
header {
  width: 100vw;
  z-index: 2;
  background: #1c1d1f;
  padding: 7px 0 7px 8px;
  margin-right: 0;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: -0.5px -0.5px 1px white inset;
}
header h6 {
  color: #ededed;
  margin-top: 6px;
  overflow: hidden;
  border-bottom: none;
  font-weight: 300;
}
@media (max-width: 800px) {
  header h6 {
      font-size: 14px;

  }
}
header h4 {
  color: white;
  border-right: 1px solid white;
  font-size: 19px;
  margin-top: 2px;
}

.spinners {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid #1c1d1f;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid;
  border-color: orange transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>