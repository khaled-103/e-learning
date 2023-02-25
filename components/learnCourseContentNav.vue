<template>
  <div>
    <div class="bg-white sections">
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
              >
                <input type="checkbox" v-model="lecture.isWatching" />
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
                    style="margin-right: 10px; font-size: 20px"
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
export default {
  props:{
    sections:null
  },
  methods:{
    toggleLectures(event) {
      let lectures = event.target.parentElement.lastElementChild;
      lectures.style.display =
        lectures.style.display == "block" ? "none" : "block";
      let icon = event.target.nextElementSibling;
      icon.classList.toggle("fa-chevron-down");
      icon.classList.toggle("fa-chevron-up");
    },
  }
};
</script>

<style scoped>


h5 {
  font-size: 14px;
  font-weight: 700;
}
h5,
.section {
  border-bottom: 1px solid #d1d7dc;
  margin-bottom: 0;
}
.section {
  position: relative;
  background: #f7f9fa;
}
.section h6 {
  font-weight: 600;
  font-size: 15px;
  padding-right: 22px;
  padding-left: 10px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
i.fa-chevron-down,
i.fa-chevron-up {
  position: absolute;
  top: 15px;
  right: 15px;
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
  background: black;
  color: white;
}
.lecture:hover a {
  color: white;
}
.lecture a {
  color: black;
  text-decoration: none;
  font-size: 14px;
}
.lecture a i {
  color: #555;
}
.lecture span {
  font-size: 14px;
  overflow: hidden;
}
.lecture .duration {
  color: #555;
  margin-left: 25px;
}

.lecture input {
  margin-right: 10px;
}
</style>