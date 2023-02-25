<template>
  <div>
    <div v-show="spinnerLoadShow" class="text-center my-2">
      <h6>
        Proccessing... <spinner-load :spinnerLoadShow="spinnerLoadShow" />
      </h6>
    </div>

    <div v-for="section in sections" :key="section.id" class="Sections ">
      <div v-show="section.id != null" class="section-item my-4 ">
        <div class="d-flex ">
          <h6 class="m-3"> section {{ sections.indexOf(section) + 1 }} : {{ section.titel }} </h6>
          <i @click="ShowUpdateSection(section)" class="fa-solid fa-pen py-3 px-1" style="cursor: pointer;"></i>
          <!-- <i @click="deletSection(section)" class="fa-solid fa-trash py-3 px-3" style="cursor: pointer;"></i> -->
          <i data-bs-toggle="modal" :data-bs-target="'#myModal' + section.id" class="fa-solid fa-trash py-3 px-3"
            style="cursor: pointer"></i>

        </div>
        <!-- The Modal Delete Section -->
        <div class="modal fade" :id="'myModal' + section.id">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title">Delete Section</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <!-- Modal body -->
              <div class="modal-body">Are you sure to delete section Section {{ sections.indexOf(section) + 1 }} : {{
                section.titel
              }} ?</div>

              <!-- Modal footer -->
              <div class="modal-footer">
                <button class="btn btn-danger" data-bs-dismiss="modal" @click="deletSection(section)">
                  Delete
                </button>
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="section.lectuers != null">
          <div v-for="lecture in section.lectuers" :key="lecture.id" class="Lectures">
            <div v-if="lecture != null" class="my-2 p-2 d-flex justify-content-between Lecture-item">
              <span>Lecture {{ section.lectuers.indexOf(lecture) + 1 }}: {{ lecture.title }}</span>
              <div>
                <i @click="ShowupdateLecture(lecture)" style="text-align: end ;cursor: pointer;"
                  class="fa-regular fa-pen-to-square p-1"></i>
                <i data-bs-toggle="modal" :data-bs-target="'#myModal' + lecture.id+'lecture'" class="fa-solid fa-trash py-1 px-2"
                  style="cursor: pointer;"></i>
              </div>

              <!-- The Modal Delete Lecture -->
              <div class="modal fade" :id="'myModal' + lecture.id+'lecture'">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                      <h4 class="modal-title">Delete Lecture</h4>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">Are you sure to delete lecture {{ section.lectuers.indexOf(lecture) + 1 }}: {{ lecture.title }} ?</div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                      <button class="btn btn-danger" data-bs-dismiss="modal" @click="deletLecture(lecture, section)">
                        Delete
                      </button>
                      <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- update Lecture -->
            <div v-show="openUpdateLectre == lecture.id" class="updateLecture border border-dark mb-3">
              <button @click="closeUpdateLeutre(lecture)" class="btn">

                <i class="fa-solid fa-x"></i>
              </button>

              <div class="px-4">
                <div class="mb-2 d-flex justify-content-between" >
                  <label for="" class="col-2">update name</label>
                  <input v-model="Lecturetitel" type="text"
                    :class="['border border-dark py-1 px-2 col-10', { 'is-invalid': errorsMessages.title.length > 0 }]" />
                </div>
                <p class="text-danger" v-show="errorsMessages.title.length > 0" style="margin-left: 25%;">
                  {{ errorsMessages.title[0] ?? "" }}
                </p>

                <div class="d-flex justify-content-between" >
                  <label for="" class="col-2">update Lecture </label>
                  <div class="d-flex border border-dark justify-content-between col-10" style="height: 38px;">
                    <span v-show="!updateFileName" class="p-1 col-9">{{ lecture.file_name }}</span>
                    <span v-show="updateFileName" class="p-1 col-9">{{ fileName }}</span>
                    <input :id="'file-input' + lecture.id" class="hide-file-input" type="file"
                      @change="onFileChange($event)" />
                    <label class="file-label" :for="'file-input' + lecture.id"> Upload a file </label>
                  </div>
                </div>
                <div v-show="lecture.uploadPercentage">
                  <progress max="100" :value.prop="lecture.uploadPercentage"
                    style="height:10px;width: 45%;margin-left: 25.5%;margin-top: 5px;border-radius: 5px;"></progress>
                  <span style="font-size:14px;">{{ lecture.uploadPercentage }}%</span>
                </div>

                <div style="text-align: right">
                  <button @click="updateLecture(lecture, section)" class="mx-2 mt-3 mb-2 btnAddLecture">
                    update Lecture
                  </button>
                </div>
              </div>
            </div>
            <!-- end update Lecture -->
          </div>
        </div>

        <!-- new Lecture -->
        <div v-show="section.addLectre" class="NewLecture border border-dark -3">
          <button @click="closeAddLeutre(section)" class="btn">
            <i class="fa-solid fa-x"></i>
          </button>

          <div class="px-3">
            <div class="mb-2 d-flex justify-content-between">
              <label for="" class="col-2">Lecture name : </label>
              <input v-model="section.addLecturetitel" type="text"
                :class="['border border-dark py-1 px-2 col-10', { 'is-invalid': errorsMessages.title.length > 0 }]" />
            </div>
            <p class="text-danger" v-show="errorsMessages.title.length > 0" style="margin-left: 25%;">
              {{ errorsMessages.title[0] ?? "" }}
            </p>

            <div class="d-flex justify-content-between" style="position: relative;">
              <label for="" class="col-2">add video : </label>
              <div class="d-flex border border-dark justify-content-between col-10" style=" height: 38px;">
                <span class="p-1 col-9">{{ section.addFileName }}</span>
                <input type="file" :id="section.id" style="z-index: -1;"
                  :class="['hide-file-input col-2', { 'is-invalid': errorsMessages.lecture.length > 0 }]"
                  v-on:input="addFileChange(section, $event)" >
                <label class="file-label" :for="section.id"> Upload a file </label>
              </div>
            </div>

            <div v-show="section.uploadPercentage">
              <progress max="100" :value.prop="section.uploadPercentage"
                style="height:10px;width: 45%;margin-left: 25.5%;margin-top: 5px;border-radius: 5px;"></progress>
              <span style="font-size:14px;">{{ section.uploadPercentage }}%</span>
            </div>
            <p class="text-danger" v-show="errorsMessages.lecture.length > 0" style="margin-left: 25%;">
              {{ errorsMessages.lecture[0] ?? "" }}
            </p>

            <div style="text-align: right">
              <button @click="addNewLecture(section)" class="mx-2 mt-3 mb-2 btnAddLecture">
                <!-- <button class="mx-2 mt-3 mb-2 btnAddLecture"> -->
                Add Lecture
              </button>
            </div>
          </div>
        </div>
        <!-- end new Lecture -->

        <div style="text-align: right; margin-bottom: 10px;">
          <!-- <button  class="mx-5 my-2 btnAddLecture" > -->
          <button @click="ShowNewLectre(section)" v-show="!section.addLectre" class="mx-5 my-2 btnAddLecture">
            <i class="fa-solid fa-plus"></i> Add Lecture
          </button>
        </div>


        <!-- update Section -->
        <div v-show="openUpdateSection == section.id" class="updateSection border border-dark mb-3">
          <button @click="closeUpdateSection(section)" class="btn">
            <i class="fa-solid fa-x"></i>
          </button>

          <div class="px-5">
            <div class="">
              <label for="">section name : </label>
              <input v-model="section.updatesection" type="text"
                :class="{ 'is-invalid': errorsMessages.name.length > 0 }" />
              <p class="text-danger" v-show="errorsMessages.name.length > 0">
                {{ errorsMessages.name[0] ?? "" }}
              </p>
            </div>

            <div style="text-align: right">
              <button @click="updateSection(section)" class="mx-2 mt-2 mb-2 btnAddsection">
                update Section
              </button>
            </div>
          </div>
        </div>
        <!-- end update Section -->

      </div>
    </div>

    <!-- new Section -->
    <div v-show="addSection" class="NewSection border border-dark mb-5">
      <button @click="ShowNewSection" class="btn">
        <i class="fa-solid fa-x"></i>
      </button>
      <div class="px-5">
        <div class="">
          <label for="">section name : </label>
          <input v-model="sectiontitel" type="text" :class="{ 'is-invalid': this.errorsMessages.name.length > 0 }" />
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
    <button v-show="!addSection" @click="ShowNewSection()" class="mx-5 my-3 btnAddsection">
      <i class="fa-solid fa-plus"></i> Add Section
    </button>


    <!-- <i data-toggle="modal" data-target="#myModal" class="btn btn-info btn-lg" style="cursor: pointer;"></i> -->

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
          updatesection: '',
          lectuers: [
            {
              id: null,
              title: null,
              file_name: '',
              uploadPercentage: 0,
            }
          ],
          addLectre: false,
          uploadPercentage: 0,
          addLecturetitel: "",
          addFileName: '',
          addFilePreview: '',
        },
      ],
      addSection: false,
      sectiontitel: "",
      openUpdateSection: 0,

      lectuersForCoues: [],

      Lecturetitel: "",
      fileName: '',
      filePreview: '',
      openUpdateLectre: 0,
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
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),

    onFileChange($event) {
      const file = $event.target.files[0]
      this.filePreview = $event.target.files[0];
      const reader = new FileReader()
      if (file) {
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.updateFileName = true;
          this.fileName = file.name;
        }
      }
    },
    addFileChange: function (section, event) {
      console.log("hobsh");
      const file = event.target.files[0]
      section.addFilePreview = event.target.files[0];
      const reader = new FileReader()
      if (file) {
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.updateFileName = true;

          section.addFileName = file.name;
        }
      }
      console.log(section.id);
    },
    ShowNewSection() {
      this.addSection = !this.addSection;
      this.sectiontitel = '';
      this.errorsMessages.name = [];
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
          updatesection: '',
          lectuers: [],
          uploadPercentage: 0,
          addLectre: false,
          addLecturetitel: "",
          addFileName: '',
          addFilePreview: '',
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
    ShowUpdateSection(section) {
      section.updatesection = section.titel;
      this.openUpdateSection = section.id;
    },
    closeUpdateSection(section) {
      section.updatesection = '';
      this.openUpdateSection = 0;
      this.errorsMessages.name = [];
    },
    async updateSection(section) {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/orgnaization/updateSection",
        dataSend: {
          token: this.getToken(),
          section_id: section.id,
          course_id: this.courseid,
          name: section.updatesection,
        },
      });
      if (result.data.status) {
        section.titel = section.updatesection;
        this.openUpdateSection = 0;
        this.errorsMessages.name = [];
      } else if (result.data.errors != null) {
        let errors = result.data.errors;
        this.errorsMessages.name = errors.name ?? [];
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
          course_id: this.courseid
        },
      });
      if (result.data.status) {
        this.sections.splice(this.sections.indexOf(section), 1);
      } else {
        return this.$router.push("/error");
      }
      this.spinnerLoadShow = false;
    },
    ShowNewLectre(section) {
      section.addLectre = true;
      section.uploadPercentage = 0;
      section.addLecturetitel = '';
      section.addFileName = '';
      section.addFilePreview = '';

    },
    closeAddLeutre(section) {
      section.addLectre = false;
      this.updateFileName = false;
      this.errorsMessages.title = [];
      this.errorsMessages.lecture = [];
    },
    async addNewLecture(section) {
      this.spinnerLoadShow = true;
      let formdata = new FormData();
      formdata.append('token', JSON.stringify(this.getToken()));
      formdata.append('title', section.addLecturetitel);
      formdata.append('lecture', section.addFilePreview);
      formdata.append('section_id', section.id);

      let result = await axios.post(
        "http://127.0.0.1:8000/api/orgnaization/addLecture",
        formdata,
        {
          headers: {
            "x-laravel-version": "v9",
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            section.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }.bind(this)
        }
      );
      console.log(result.data);
      if (result.data.status) {
        this.lectuersForCoues.push(result.data.lecture);
        section.lectuers.push({
          id: result.data.lecture.id,
          title: section.addLecturetitel,
          file_name: result.data.lecture.file_name,
          uploadPercentage: 0
        })
        console.log(section);
        section.addLectre = false;
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
    async ShowupdateLecture(lecture) {
      this.openUpdateLectre = lecture.id;
      this.Lecturetitel = lecture.title;
      this.fileName = lecture.file_name;
      this.filePreview = "Empty"
    },
    closeUpdateLeutre(lecture) {
      this.openUpdateLectre = 0;
      lecture.uploadPercentage = 0;
      this.updateFileName = false;
      this.errorsMessages.title = [];
      this.errorsMessages.lecture = [];
    },
    async updateLecture(lectuer, section) {
      this.spinnerLoadShow = true;
      let formdata = new FormData();
      formdata.append('token', JSON.stringify(this.getToken()));
      formdata.append('lecture_id', lectuer.id);
      formdata.append('title', this.Lecturetitel);
      formdata.append('lecture', this.filePreview);
      formdata.append('section_id', section.id);
      let result = await axios.post(
        "http://127.0.0.1:8000/api/orgnaization/updateLecture",
        formdata,
        {
          headers: {
            "x-laravel-version": "v9",
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            lectuer.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }.bind(this)
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
    async deletLecture(lecture, section) {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/orgnaization/deletelectre",
        dataSend: {
          token: this.getToken(),
          lecture_id: lecture.id,
          section_id: section.id
        },
      });
      if (result.data.status) {
        section.lectuers.splice(section.lectuers.indexOf(lecture), 1);
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
        this.lectuersForCoues = result_lecture.data.lectuers
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
        result.data.sections.forEach(section => {
          this.sections.push({
            id: section.id,
            titel: section.name,
            updatesection: '',
            lectuers: [],
            uploadPercentage: 0,
            addLecturetitel: "",
            addFileName: '',
            addFilePreview: '',
            addLectre: false,
          });
        });
        this.sections.forEach(section => {
          this.lectuersForCoues.forEach(lectuer => {
            if (lectuer.section_id == section.id) {
              section.lectuers.push({
                id: lectuer.id,
                title: lectuer.title,
                file_name: lectuer.file_name,
                uploadPercentage: 0,

              })
            }
          })
        })

        this.sections.splice(0, 1)
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

<style>
.section-item {
  padding-bottom: 15px;
  background-color: #f7f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 2px white !important
}

.Lecture-item {
  border: 1px black solid;
  border-radius: 0;
  box-shadow: none !important;
  height: 45px;
}

.Lectures{
  width: 91%;
  margin: auto;
  position: relative;
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
  position: relative;
  background-color: #f7f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 2px white !important
}
.updateSection {
  width: 91%;
  margin: auto;
  background-color: #f7f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 2px white !important;
  position: relative;
}
span{
  overflow: hidden;
  text-overflow: ellipsis;
}


.updateSection input {
  position: relative;
  display: block;
  width: 100%;
  border: 1px black solid;
  border-radius: 0;
  box-shadow: none !important;
  height: 35px;
  padding: 2px 8px;
}
.NewSection input {
  position: relative;
  display: block;
  width: 100%;
  border: 1px black solid;
  border-radius: 0;
  box-shadow: none !important;
  height: 35px;
  padding: 2px 8px;
}
.NewLecture {
  position: relative;
  background-color: #f7f9fa;
  margin-bottom: 20px;
  width: 91%;
  margin: auto;
}
.UpdateLecture {
  position: relative;
  background-color: #f7f9fa;
  margin-bottom: 20px;
}
.NewLecture input {
  position: relative;
  border: 1px black solid;
  border-radius: 0;
  box-shadow: none !important;
  height: 35px;
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
}



.file-label {
  color: #fff;
  background-color: #3a32ae;
  padding: 6px;
  cursor: pointer;
}

input[type='file']:focus+.file-label {
  box-shadow: 0 0 0 4px #bae6fd;
}



input[type='file']:focus+.file-label12 {
  box-shadow: 0 0 0 4px #bae6fd;
}



@media (max-width: 846) {
  .NewLecture , .updateSection , .Lectures {
    width: 95%;
    margin: auto;
  }
}


</style>
