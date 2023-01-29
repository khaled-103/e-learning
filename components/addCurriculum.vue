<template>
  <div class="">
    <div v-show="spinnerLoadShow" class="text-center my-2">
      <h6 class="text-white">
        Proccessing... <spinner-load :spinnerLoadShow="spinnerLoadShow" />
      </h6>
    </div>

    <ul v-for="(section, index) in sections" :key="index" class="Sections">
      <div
        v-show="section.id != null"
        class="section-item my-4 border p-1 shadow border-dark"
      >
        <div class="d-flex">
          <h6 class="m-3">Section {{ index }} : {{ section.titel }}</h6>
          <i
            @click="ShowUpdateSection(section)"
            class="fa-solid fa-pen py-3 px-1"
            style="cursor: pointer"
          ></i>
          <i
            @click="deletSection(section)"
            class="fa-solid fa-trash py-3 px-3"
            style="cursor: pointer"
          ></i>
        </div>



        <div v-if="section.lectuers != null">
          <ul
            v-for="(lecture, idx) in section.lectuers"
            :key="idx"
            class="Lectures"
          >
            <div
              v-if="lecture != null"
              class="mx-2 my-2 p-2 d-flex justify-content-between Lecture-item"
            >
              <h6>Lecture {{ idx + 1 }}: {{ lecture.title }}</h6>
              <div>
                <i
                  @click="ShowupdateLecture(lecture)"
                  style="text-align: end; cursor: pointer"
                  class="fa-regular fa-pen-to-square p-1"
                ></i>
                <i
                  @click="deletLecture(lecture, section)"
                  class="fa-solid fa-trash py-1 px-2"
                  style="cursor: pointer"
                ></i>
              </div>
            </div>
            <!-- update Lecture -->
            <div
              v-show="openUpdateLectre == lecture.id"
              class="NewLecture border border-dark mb-3"
              style="margin-left: 1%; width: 90%"
            >
              <button @click="closeUpdateLeutre(lecture)" class="btn">
                <i class="fa-solid fa-x"></i>
              </button>

              <div class="px-5">
                <div
                  class="mb-2 d-flex justify-content-between"
                  style="width: 95%"
                >
                  <label for="">Lecture name : </label>
                  <input
                    v-model="Lecturetitel"
                    type="text"
                    :class="[
                      'border border-dark py-1 px-2',
                      { 'is-invalid': errorsMessages.title.length > 0 },
                    ]"
                  />
                </div>
                <p
                  class="text-danger"
                  v-show="errorsMessages.title.length > 0"
                  style="margin-left: 25%"
                >
                  {{ errorsMessages.title[0] ?? "" }}
                </p>

                <div class="d-flex justify-content-between" style="width: 95%">
                  <label for="">Update Lecture : </label>
                  <div
                    class="d-flex border border-dark justify-content-between"
                    style="width: 73%; height: 38px;position:relative;"
                  >
                    <span v-show="!updateFileName" class="p-1">{{
                      lecture.file_name
                    }}</span>
                    <span v-show="updateFileName" class="p-1">{{
                      fileName
                    }}</span>
                    <input
                      id="file-input"
                      class="hide-file-input"
                      type="file"
                      @change="onFileChange($event)"
                    />
                    <label class="file-label" for="file-input">
                      Upload a file
                    </label>
                  </div>
                </div>
                <div v-show="lecture.uploadPercentage">
                  <progress
                    max="100"
                    :value.prop="lecture.uploadPercentage"
                    style="
                      height: 10px;
                      width: 45%;
                      margin-left: 25.5%;
                      margin-top: 5px;
                      border-radius: 5px;
                    "
                  ></progress>
                  <span style="font-size: 14px"
                    >{{ lecture.uploadPercentage }}%</span
                  >
                </div>

                <div style="text-align: right">
                  <button
                    @click="updateLecture(lecture, section)"
                    class="mx-2 mt-3 mb-2 btnAddLecture"
                  >
                    <!-- <button class="mx-2 mt-3 mb-2 btnAddLecture"> -->
                    update Lecture
                  </button>
                </div>
              </div>
            </div>
            <!-- end update Lecture -->
          </ul>
        </div>

        <!-- new Lecture -->
        <div
          v-show="openAddLectre == section.id"
          class="NewLecture border border-dark mb-3"
        >
          <button @click="closeAddLeutre(section)" class="btn">
            <i class="fa-solid fa-x"></i>
          </button>

          <div class="px-5">
            <div class="mb-2 d-flex justify-content-between" style="width: 95%">
              <label for="">Lecture name : </label>
              <input
                v-model="Lecturetitel"
                type="text"
                :class="[
                  'border border-dark py-1 px-2',
                  { 'is-invalid': errorsMessages.title.length > 0 },
                ]"
              />
            </div>
            <p
              class="text-danger"
              v-show="errorsMessages.title.length > 0"
              style="margin-left: 25%"
            >
              {{ errorsMessages.title[0] ?? "" }}
            </p>

            <div class="d-flex justify-content-between" style="width: 95%">
              <label for="">add video : </label>
              <div
                class="d-flex border border-dark justify-content-between"
                style="width: 73%; height: 38px;position:relative;"
              >
                <span class="p-1">{{ fileName }}</span>
                <input
                  id="file-input"
                  type="file"
                  :class="[
                    'hide-file-input',
                    { 'is-invalid': errorsMessages.lecture.length > 0 },
                  ]"
                  @change="onFileChange($event)"
                />
                <label class="file-label" for="file-input">
                  Upload a file
                </label>
              </div>
            </div>
            <div v-show="section.uploadPercentage">
              <progress
                max="100"
                :value.prop="section.uploadPercentage"
                style="
                  height: 10px;
                  width: 45%;
                  margin-left: 25.5%;
                  margin-top: 5px;
                  border-radius: 5px;
                "
              ></progress>
              <span style="font-size: 14px"
                >{{ section.uploadPercentage }}%</span
              >
            </div>
            <p
              class="text-danger"
              v-show="errorsMessages.lecture.length > 0"
              style="margin-left: 25%"
            >
              {{ errorsMessages.lecture[0] ?? "" }}
            </p>

            <div style="text-align: right">
              <button
                @click="addNewLecture(section)"
                class="mx-2 mt-3 mb-2 btnAddLecture"
              >
                <!-- <button class="mx-2 mt-3 mb-2 btnAddLecture"> -->
                Add Lecture
              </button>
            </div>
          </div>
        </div>
        <!-- end new Lecture -->

        <div style="text-align: right; margin-bottom: 10px">
          <!-- <button  class="mx-5 my-2 btnAddLecture" > -->
          <button
            @click="ShowNewLectre(section)"
            v-show="openAddLectre != section.id"
            class="mx-5 my-2 btnAddLecture"
          >
            <i class="fa-solid fa-plus"></i> Add Lecture
          </button>
        </div>

        <!-- update Section -->
        <div
          v-show="section.updatesection"
          class="NewSection border border-dark mb-3"
        >
          <button @click="closeUpdateSection(section)" class="btn">
            <i class="fa-solid fa-x"></i>
          </button>

          <div class="px-5">
            <div class="">
              <label for="">section name : </label>
              <input
                v-model="sectiontitel"
                type="text"
                :class="{ 'is-invalid': errorsMessages.name.length > 0 }"
              />
              <p class="text-danger" v-show="errorsMessages.name.length > 0">
                {{ errorsMessages.name[0] ?? "" }}
              </p>
            </div>

            <div style="text-align: right">
              <button
                @click="updateSection(section)"
                class="mx-2 mt-2 mb-2 btnAddsection"
              >
                update Section
              </button>
            </div>
          </div>
        </div>
        <!-- end update Section -->
      </div>
    </ul>

    <!-- new Section -->
    <div v-show="addSection" class="NewSection border border-dark mb-5">
      <button @click="ShowNewSection" class="btn">
        <i class="fa-solid fa-x"></i>
      </button>
      <div class="px-5">
        <div class="">
          <label for="">section name : </label>
          <input
            v-model="sectiontitel"
            type="text"
            :class="{ 'is-invalid': this.errorsMessages.name.length > 0 }"
          />
          <p class="text-danger" v-show="this.errorsMessages.name.length > 0">
            {{ this.errorsMessages.name[0] ?? "" }}
          </p>
        </div>
        <div style="text-align: right">
          <button @click="addNewSection()" class="mx-2 mt-3 mb-2 btnAddsection">
            Add Section
          </button>
        </div>
      </div>
    </div>
    <!-- end new Section -->
    <button
      v-show="!addSection"
      @click="ShowNewSection()"
      class="mx-5 my-3 btnAddsection"
    >
      <i class="fa-solid fa-plus"></i> Add Section
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  props: {
    courseid: null,
  },
  data() {
    return {
      sections: [
        {
          id: null,
          titel: null,
          updatesection: false,
          lectuers: [
            {
              id: null,
              title: null,
              file_name: "",
              uploadPercentage: 0,
            },
          ],
          uploadPercentage: 0,
        },
      ],
      addSection: false,
      sectiontitel: "",

      lectuersForCoues: [],
      Lecturetitel: "" /**/,
      fileName: "",
      filePreview: "",

      openUpdateLectre: 0,
      openAddLectre: 0,

      updateFileName: false,
      spinnerLoadShow: false,
      errorsMessages: {
        name: [],
        lecture: [],
        title: [],
      },
    };
  },
  methods: {
    ShowNewLectre(section) {
      this.openAddLectre = section.id;
      this.openUpdateLectre = 0;
      this.Lecturetitel = ""; /**/
      this.fileName = ""; /**/
      this.filePreview = "";
    },
    closeUpdateLeutre(lecture) {
      this.openUpdateLectre = 0;
      lecture.uploadPercentage = 0;
      this.updateFileName = false;
      this.errorsMessages.title = [];
      this.errorsMessages.lecture = [];
    },
    closeAddLeutre(section) {
      this.openAddLectre = 0;
      this.updateFileName = false;
      this.errorsMessages.title = [];
      this.errorsMessages.lecture = [];
    },
    ShowNewSection() {
      this.addSection = !this.addSection;
      this.sectiontitel = "";
      this.errorsMessages.name = [];
    },
    closeUpdateSection(section) {
      section.updatesection = false;
      this.errorsMessages.name = [];
    },
    onFileChange($event) {
      const file = $event.target.files[0];
      this.filePreview = $event.target.files[0];
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.updateFileName = true;
          this.fileName = file.name;
        };
      }
    },
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),

    ShowUpdateSection(section) {
      this.sectiontitel = section.titel;
      section.updatesection = !section.updatesection;
    },
    async updateSection(section) {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/orgnaization/updateSection",
        dataSend: {
          token: this.getToken(),
          section_id: section.id,
          course_id: this.courseid,
          name: this.sectiontitel,
        },
      });
      if (result.data.status) {
        section.titel = this.sectiontitel;
        (this.sectiontitel = ""),
          (section.updatesection = !section.updatesection);
        this.errorsMessages.name = [];
      } else if (result.data.errors != null) {
        let errors = result.data.errors;
        this.errorsMessages.name = errors.name ?? [];
      }
      this.updatesection = false;
      this.spinnerLoadShow = false;
    },
    async deletLecture(lecture, section) {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/orgnaization/deletelectre",
        dataSend: {
          token: this.getToken(),
          lecture_id: lecture.id,
          section_id: section.id,
        },
      });
      if (result.data.status) {
        section.lectuers.splice(section.lectuers.indexOf(lecture), 1);
      } else {
        return this.$router.push("/error");
      }
      this.spinnerLoadShow = false;
    },
    async deletSection(section) {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/orgnaization/deleteSection",
        dataSend: {
          token: this.getToken(),
          section_id: section.id,
          course_id: this.courseid,
        },
      });
      if (result.data.status) {
        this.sections.splice(this.sections.indexOf(section), 1);
      } else {
        return this.$router.push("/error");
      }
      this.spinnerLoadShow = false;
    },
    async ShowupdateLecture(lecture) {
      this.openAddLectre = 0;
      this.openUpdateLectre = lecture.id;
      this.Lecturetitel = lecture.title;
      this.fileName = lecture.file_name;
      this.filePreview = "Empty";
    },
    async updateLecture(lectuer, section) {
      this.spinnerLoadShow = true;
      let formdata = new FormData();
      formdata.append("token", JSON.stringify(this.getToken()));
      formdata.append("lecture_id", lectuer.id);
      formdata.append("title", this.Lecturetitel);
      formdata.append("lecture", this.filePreview);
      formdata.append("section_id", section.id);
      let result = await axios.post(
        "http://127.0.0.1:8000/api/orgnaization/updateLecture",
        formdata,
        {
          headers: {
            "x-laravel-version": "v9",
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            lectuer.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        }
      );
      console.log(result.data);
      if (result.data.status) {
        lectuer.title = this.Lecturetitel;
        lectuer.file_name = this.fileName;
        this.openUpdateLectre = 0;
        this.updateFileName = false;
        this.Lecturetitel = "";
        this.filePreview = "";
        this.fileName = "";
        lectuer.uploadPercentage = 0;
        this.errorsMessages.title = [];
        this.errorsMessages.lecture = [];
      } else if (result.data.errors != null) {
        let errors = result.data.errors;
        this.errorsMessages.lecture = errors.lecture ?? [];
        this.errorsMessages.title = errors.title ?? [];
      } else {
        return this.$router.push("/error");
      }
      this.spinnerLoadShow = false;
    },
    async addNewLecture(section) {
      this.spinnerLoadShow = true;
      let formdata = new FormData();
      formdata.append("token", JSON.stringify(this.getToken()));
      formdata.append("title", this.Lecturetitel);
      formdata.append("lecture", this.filePreview);
      formdata.append("section_id", section.id);

      let result = await axios.post(
        "http://127.0.0.1:8000/api/orgnaization/addLecture",
        formdata,
        {
          headers: {
            "x-laravel-version": "v9",
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            section.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        }
      );
      console.log(result.data);
      if (result.data.status) {
        this.lectuersForCoues.push(result.data.lecture);
        section.lectuers.push({
          id: result.data.lecture.id,
          title: this.Lecturetitel,
          file_name: result.data.lecture.file_name,
          uploadPercentage: 0,
        });
        console.log(section);
        this.openAddLectre = 0;
        this.updateFileName = false;
        this.Lecturetitel = "";
        this.filePreview = "";
        this.fileName = "";
        section.uploadPercentage = 0;
        this.errorsMessages.title = [];
        this.errorsMessages.lecture = [];
      } else if (result.data.errors != null) {
        let errors = result.data.errors;
        this.errorsMessages.lecture = errors.lecture ?? [];
        this.errorsMessages.title = errors.title ?? [];
      } else {
        return this.$router.push("/error");
      }
      this.spinnerLoadShow = false;
    },
    async addNewSection() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/orgnaization/addSection",
        dataSend: {
          token: this.getToken(),
          course_id: this.courseid,
          name: this.sectiontitel,
        },
      });
      if (result.data.status) {
        console.log();
        this.sections.push({
          id: result.data.section.id,
          titel: this.sectiontitel,
          updatesection: false,
          lectuers: [],
          uploadPercentage: 0,
        });

        this.addSection = !this.addSection;
        this.sectiontitel = "";
      } else if (result.data.errors != null) {
        let errors = result.data.errors;
        this.errorsMessages.name = errors.name ?? [];
      } else {
        return this.$router.push("/error");
      }
      this.spinnerLoadShow = false;
    },
    async initLectuerInfo(sectionId) {
      let result_lecture = await this.sendRequest({
        url: "/orgnaization/allLectuer",
        dataSend: {
          token: this.getToken(),
          course_id: this.courseid,
        },
      });
      if (result_lecture.data.status) {
        this.lectuersForCoues = result_lecture.data.lectuers;
      } else {
        return this.$router.push("/error");
      }
    },
    async initSectionAndLectuerInfo() {
      let result = await this.sendRequest({
        url: "/orgnaization/allSections",
        dataSend: {
          token: this.getToken(),
          course_id: this.courseid,
        },
      });
      if (result.data.status) {
        result.data.sections.forEach((section) => {
          this.sections.push({
            id: section.id,
            titel: section.name,
            updatesection: false,
            lectuers: [],
            uploadPercentage: 0,
          });
        });
        this.sections.forEach((section) => {
          this.lectuersForCoues.forEach((lectuer) => {
            if (lectuer.section_id == section.id) {
              section.lectuers.push({
                id: lectuer.id,
                title: lectuer.title,
                file_name: lectuer.file_name,
                uploadPercentage: 0,
              });
            }
          });
        });
      } else {
        return this.$router.push("/error");
      }
    },
  },
  async mounted() {
    this.spinnerLoadShow = true;
    if (this.courseid) {
      await this.initLectuerInfo();
      await this.initSectionAndLectuerInfo();
    }
    this.spinnerLoadShow = false;
  },
};
</script>

<style scoped>
.section-item {
  width: 90.5%;
  margin-left: 3.2%;
  background: #efefef;
  border: none !important;
  border-radius: 10px;
  box-shadow: 0px 0px 2px white !important;
}

.Lecture-item {
  width: 90%;
  border: 1px black solid;
  border-radius: 0;
  box-shadow: none !important;
  height: 45px;
}

.btnAddsection,
.btnAddLecture {
  color: white;
  font-size: 15px;
  padding: 5px;
  background-color: #224079;
  border: 1px #152b53 solid;
  border-radius: 0;
}

.btnAddsection:hover,
.btnAddsection:active,
.btnAddLecture:hover,
.btnAddLecture:active {
  background-color: #355796;
}

.NewSection {
  background-color: #f7f9fa;
  width: 87.5%;
  margin: auto;
}

.NewSection input {
  display: block;
  width: 100%;
  border: 1px black solid;
  border-radius: 0;
  box-shadow: none !important;
  height: 35px;
  padding: 2px 8px;
}

.NewLecture {
  background-color: #f7f9fa;
  width: 86.5%;
  margin-left: 5%;
}

.NewLecture input {
  /* display: block; */
  width: 73%;
  border: 1px black solid;
  border-radius: 0;
  box-shadow: none !important;
  height: 35px;
  /* padding: 2px 8px; */
}

.hide-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.file-label {
  color: #fff;
  background-color: #3a32ae;
  padding: 6px;
  cursor: pointer;
}

input[type="file"]:focus + .file-label {
  box-shadow: 0 0 0 4px #bae6fd;
}

@media (max-width: 1200px) {
  .section-item {
    width: 93%;
    margin-left: 2%;
  }
}

@media (max-width: 1000px) {
  .section-item {
    width: 93%;
    margin-left: 1%;
  }
}

@media (max-width: 846) {
  .section-item {
    width: 90%;
    margin-left: 0;
  }
}

@media (max-width: 500px) {
  .section-item {
    width: 96%;
    margin-left: -10px;
  }
}
</style>
