<template>
  <div>
    <div v-if="sections" class="bg-white sections border">
      <h5 class="p-3">Course content</h5>
      <div :key="index" v-for="(section, index) in sections">
        <div class="section">
          <h6 class="section-head py-3" @click="toggleLectures">
            Section {{ index + 1 }}: {{ section.name }}
          </h6>
          <i class="fa-solid fa-chevron-down"></i>
          <div class="lectures">
            <div
              class="lecture"
              :key="idx"
              v-for="(lecture, idx) in section.lectures"
            >
              <div
                @click="loadThisLecture(lecture)"
                v-if="lecture.type == 'video'"
                class="d-flex"
              >
                <i
                  :ref="'watch' + lecture.id"
                  class="check text-success fa"
                ></i>
                <!-- <span class="check  bg-white" :ref="'watch' + lecture.id"
                  ><i class="fa-regular fa-circle-check"></i></span
                > -->
                <!-- <input :id="'lectre'+lecture.id" type="checkbox" :value="lecture.id" v-model="lecture.isWatching" /> -->
                <span
                  >{{ idx + 1 }}.{{ lecture.title }}
                  <div class="duration">
                    <span
                      ><i class="fa-solid fa-circle-play"></i>
                      {{ lecture.lecture_duration }}</span
                    >
                  </div></span
                >
              </div>
              <div v-else>
                <a
                  :title="lecture.file_name"
                  :href="lecture.lecture_path"
                  download
                  target="_blank"
                >
                  <i
                    class="fa-regular fa-file"
                    style="margin-right: 10px; font-size: 16px"
                  ></i>
                  {{ idx + 1 }}.{{ lecture.title }}
                  <i class="fa fa-download mx-3"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      listWatched: {},
    };
  },
  computed: {},
  props: {
    markLectureEvent: null,
    currentLectureId: null,
    currentSectionId: null,
    sections: null,
    isCurrrentLectureMark: false,
    courseId: Number,
  },
  watch: {
    markLectureEvent(value) {
      this.markLectureWatched();
    },
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    toggleLectures(event) {
      let lectures = event.target.parentElement.lastElementChild;
      lectures.style.display =
        lectures.style.display == "block" ? "none" : "block";
      let icon = event.target.nextElementSibling;
      icon.classList.toggle("fa-chevron-down");
      icon.classList.toggle("fa-chevron-up");
    },
    loadThisLecture(lecture) {
      this.$emit("emitVideoSrc", lecture.lecture_path);
      this.$emit("emitCurrentLectureId", lecture.id);
      this.$emit("emitCurrentSectionId", lecture.section_id);
      this.$emit(
        "emitIsCurrrentLectureMark",
        this.initLectureIsWatching(lecture.id)
      );

      window.scrollTo(0, 0);
    },
    initLectureIsWatching(lectureId) {
      let learnTrack = this.$cookies.get("learnTrack");
      console.log(learnTrack);
      if (learnTrack) {
        let listWatching = learnTrack[this.courseId];
        if (listWatching) {
          let res = listWatching.find((value) => {
            return value == lectureId;
          });
          return res != null;
        }
      }
      return false;
    },
    markLectureWatched() {
      const span = this.$refs["watch" + this.currentLectureId];
      span[0].classList.add("fa-check");
      if (!this.isCurrrentLectureMark) {
        console.log("marked");
        this.setLearnTrackCookie();
        this.$emit("emitIsCurrrentLectureMark", true);
      } else console.log("already marked");
    },
    setLearnTrackCookie() {
      let learnTrack = this.$cookies.get("learnTrack");
      if (!learnTrack) {
        this.$cookies.set(
          "learnTrack",
          {},
          {
            path: "/",
            maxAge: 60 * 60 * 24 * 7 * 30 * 12,
          }
        );
        learnTrack = this.$cookies.get("learnTrack");
      }
      let currentCourseTrack = learnTrack[this.courseId];
      if (!currentCourseTrack) {
        learnTrack[this.courseId] = [];
      }
      currentCourseTrack = learnTrack[this.courseId];
      currentCourseTrack.push(this.currentLectureId);

      this.$cookies.set("learnTrack", learnTrack, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7 * 30 * 12,
      });
      learnTrack = this.$cookies.get("learnTrack");
    },
  },
  async mounted() {

    let learnTrack = this.$cookies.get("learnTrack");
    if (learnTrack) {
      let listWatching = learnTrack[this.courseId];
      if (listWatching != null) {
        for (let item of listWatching) {
          const span = this.$refs["watch" + item];
          span[0].classList.add("fa-check");
        }
      }
    }
  },
};
</script>

<style scoped>
.check {
  text-align: center;
  width: 15px;
  height: 15px;
  font-size: 12px;
  border: 1px solid #444;
  display: block;

  padding-top: 2px;
  margin: 2px 5px 0 0;
}

h5 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0;
  border-bottom: 1px solid #d1d7dc;
}
h5,
.section {
  border-bottom: 1px solid #d1d7dc;
  margin-bottom: 0;
}
.section {
  position: relative;
  background: #fcfcfc;
}
.section h6 {
  font-weight: 600;
  font-size: 15px;
  padding-right: 25px;
  padding-left: 8px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
i.fa-chevron-down,
i.fa-chevron-up {
  position: absolute;
  top: 15px;
  right: 10px;
  font-size: 12px;
}
.lectures {
  display: none;
}

.lecture {
  background-color: white;
  padding: 10px 0 10px 15px;
  transition: all 0.25s;
  cursor: pointer;
}
.lecture:hover {
  background: #222;
  color: white;
}
.lecture:hover a {
  color: white;
}
.lecture a {
  color: black;
  text-decoration: none;
  font-size: 14.5px;
  font-weight: 400;
}
.lecture a i {
  color: #555;
}
.lecture span {
  font-size: 14.5px;
  font-weight: 400;
}
.lecture .duration {
  color: #555;
  margin-left: 25px;
}

.lecture input {
  margin-right: 10px;
}
</style>