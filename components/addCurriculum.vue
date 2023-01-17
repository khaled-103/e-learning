<template>
  <div>
    <ul v-for="section in sections" :key="section" class="Sections">
      <div class="section-item my-4 border border-dark">
        <h6 class="m-3">{{ section.titel }}</h6>
        <ul v-for="lecture in section.lectures" :key="lecture" class="Lectures">
          <div class="mx-2 my-2 p-2 d-flex justify-content-between Lecture-item">
            <span>Lecture : {{ lecture.titel }}</span>
            <div>
              <i style="text-align: end" class="fa-regular fa-pen-to-square"></i>
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
        </ul>
        <!-- new Lecture -->
        <div v-show="section.addLecture" class="NewLecture border border-dark mb-3">
          <button @click="section.addLecture = !section.addLecture" class="btn">
            <i class="fa-solid fa-x"></i>
          </button>

          <div class="px-5">
            <div class="mb-2 d-flex justify-content-between" style="width: 65%">
              <label for="">Lecture name : </label>
              <input v-model="Lecturetitel" type="text" class="border border-dark py-1 px-2" />
            </div>

            <div class="d-flex justify-content-between" style="width: 65%">
              <label for="">add video : </label>
              <div class="d-flex border border-dark justify-content-between" style="width: 73%; height: 40px">
                <span class="p-2">{{ fileName }}</span>
                <inputfile @file-updated="captureFile($event)" :action="action"></inputfile>
              </div>
            </div>

            <div style="text-align: right">
              <button @click="addNewLecture(section.id)" class="mx-2 mt-3 mb-2 btnAddLecture">
                Add Lecture
              </button>
            </div>
          </div>
        </div>
        <!-- end new Lecture -->

        <button @click="section.addLecture = !section.addLecture" v-show="!section.addLecture"
          class="mx-5 my-2 btnAddLecture">
          <i class="fa-solid fa-plus"></i> Add Lecture
        </button>
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
          <input v-model="sectiontitel" type="text" />
        </div>

        <label for="">descrtion : </label>
        <input v-model="sectiondescrtion" type="text" />

        <div style="text-align: right">
          <button @click="addNewSection()" class="mx-2 mt-3 mb-2 btnAddsection">
            Add Section
          </button>
        </div>
      </div>
    </div>
    <!-- end new Section -->

    <button @click="ShowNewSection()" v-show="!addSection" class="mx-5 my-3 btnAddsection">
      <i class="fa-solid fa-plus"></i> Add Section
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sectionId: 1,
      sections: [
        {
          id: 1,
          titel: "section1",
          descrtion: "descrtion1",
          lectures: [{ titel: "Lecturetitel" }, { titel: "Lecturetitel" }],
          addLecture: false,
        },
      ],
      addSection: false,
      sectiontitel: "",
      sectiondescrtion: "",

      Lecturetitel: "",
    };
  },
  methods: {
    ShowNewSection() {
      this.addSection = !this.addSection;
    },
    addNewSection() {
      this.sectionId += 1;
      this.sections.push({
        id: this.sectionId,
        titel: this.sectiontitel,
        descrtion: this.sectiondescrtion,
        lectures: [],
        addLecture: false,
      });
      this.addSection = !this.addSection;
      this.sectiontitel = "";
      this.sectiondescrtion = "";
    },
    addNewLecture(id) {
      this.sections[id - 1].lectures.push({ titel: this.Lecturetitel });
      this.sections[id - 1].addLecture = !this.sections[id - 1].addLecture;
      this.sectiontitel = "";

      // sectiondescrtion = '';
    }
  },
};
</script>

<style>
.section-item {
  width: 90.5%;
  margin-left: 3.2%;
  background-color: #f7f9fa;
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
  width: 87%;
  margin-left: 4.3%;
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
