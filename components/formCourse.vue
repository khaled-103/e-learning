<template>
  <div>
    <div v-show="spinnerLoadShow" class="text-center">
      <h6 class="text-white">
        Proccessing... <spinner-load :spinnerLoadShow="spinnerLoadShow" />
      </h6>
    </div>
    <form class="px-4 my-4">
      <div class="text-end text-white">
        <label class="switch">
          <input type="checkbox" @change="toggleMode"/>
          <span class="slider round"></span>
        </label>
        Edit Mode
      </div>
      <div class="form-group my-4">
        <label for="">Course Name</label>
        <input
          type="text"
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.name.length > 0 },
          ]"
          placeholder="insert your Course Name"
          v-model="name"
          :disabled="action === 'Show'"
        />
        <p class="text-danger" v-show="this.errorsMessages.name.length > 0">
          {{ this.errorsMessages.name[0] ?? "" }}
        </p>
      </div>

      <div class="form-group my-4">
        <label for="">Course subtitle</label>
        <input
          type="text"
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.subtitle.length > 0 },
          ]"
          placeholder="insert your Course subtitle"
          v-model="subtitle"
          :disabled="action === 'Show'"
        />
        <p class="text-danger" v-show="this.errorsMessages.subtitle.length > 0">
          {{ this.errorsMessages.subtitle[0] ?? "" }}
        </p>
      </div>

      <div class="form-group my-4">
        <label for="">Teacher Of Course</label>
        <input
          type="text"
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.teacher.length > 0 },
          ]"
          placeholder="insert your Course teacher name"
          v-model="teacher"
          :disabled="action === 'Show'"
        />
        <p class="text-danger" v-show="this.errorsMessages.teacher.length > 0">
          {{ this.errorsMessages.teacher[0] ?? "" }}
        </p>
      </div>

      <div class="form-group my-4">
        <label for="">Course price:</label>
        <input
          type="text"
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.price.length > 0 },
          ]"
          placeholder="Insert Course Price"
          v-model="price"
          :disabled="action === 'Show'"
        />
        <p class="text-danger" v-show="this.errorsMessages.price.length > 0">
          {{ this.errorsMessages.price[0] ?? "" }}
        </p>
      </div>

      <div class="form-group my-4">
        <label for=""> Select language:</label>
        <select
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.language_id.length > 0 },
          ]"
          v-model="language"
          :disabled="action === 'Show'"
        >
          <option disabled selected value="">Select language</option>
          <option
            class="py-4 px-3"
            :value="option.id"
            v-for="option in languages"
            :key="option.id"
          >
            {{ option.language }}
          </option>
        </select>
        <p
          class="text-danger"
          v-show="this.errorsMessages.language_id.length > 0"
        >
          {{ this.errorsMessages.language_id[0] ?? "" }}
        </p>
      </div>
      <div class="form-group my-4">
        <label for=""> Select Level:</label>
        <select
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.level.length > 0 },
          ]"
          v-model="level"
          :disabled="action === 'Show'"
        >
          <option disabled selected value="">Select Level</option>
          <option
            class="py-4 px-3"
            :value="option"
            v-for="option in levels"
            :key="option"
          >
            {{ option }}
          </option>
        </select>
        <p class="text-danger" v-show="this.errorsMessages.level.length > 0">
          {{ this.errorsMessages.level[0] ?? "" }}
        </p>
      </div>

      <div class="form-group my-4">
        <label for="">Course Image:</label>
        <input
          type="file"
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.image.length > 0 },
          ]"
          accept="image/*"
          @change="handleFileUpload($event)"
          :disabled="action === 'Show'"
        />
        <p class="text-danger" v-show="this.errorsMessages.image.length > 0">
          {{ this.errorsMessages.image[0] ?? "" }}
        </p>
        <div v-show="image.length > 0">
          <div class="d-flex mt-3">
            <label for="" class="mt-2">Currnt Course Image</label>
            <img :src="image" class="mx-2" width="80px" height="60px" alt="" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="description" class="d-block">Course Description</label>
        <text-editor v-model="description" />
        <p
          class="text-danger"
          v-show="this.errorsMessages.description.length > 0"
        >
          {{ this.errorsMessages.description[0] ?? "" }}
        </p>
      </div>

      <div class="tags-holder">
        <p class="" style="color: #fff; font-size: 14px">
          Choose What Your Course Talks About? (What the course content)
        </p>
        <div class="mb-3 row">
          <div class="col-lg-6 col-12">
            <label for="description">Departments:</label>
            <div>
              <select
                class="form-control"
                @change="changeRelatedCategories()"
                v-model="selectedDepartment"
              >
                <option disabled selected value="">Choose Department</option>
                <option
                  class="py-4 px-3"
                  :value="department.id"
                  v-for="department in departments"
                  :key="department.id"
                >
                  {{ department.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="form-group">
              <label for=""> Select Category:</label>
              <select
                :class="[
                  'form-control',
                  'p-2',
                  { 'is-invalid': this.errorsMessages.category_id.length > 0 },
                ]"
                v-model="category"
                :disabled="action === 'Show'"
                @change="getTags($event)"
              >
                <option disabled selected value="">Select Category</option>
                <option
                  class="py-4 px-3"
                  :value="option.id"
                  v-for="option in relatedSubCategories"
                  :key="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
              <p
                class="text-danger"
                v-show="this.errorsMessages.category_id.length > 0"
              >
                {{ this.errorsMessages.category_id[0] ?? "" }}
              </p>
            </div>
          </div>
        </div>

        <div class="form-group my-4">
          <label class="typo__label">Select Tags:</label>
          <MultiSelectTags
            @getSelected="updatSelectedData"
            v-if="showTags"
            :selected="tagSelected"
            :tags="tags"
          ></MultiSelectTags>
        </div>
        <p class="text-danger" v-show="this.errorsMessages.tags.length > 0">
          {{ this.errorsMessages.tags[0] ?? "" }}
        </p>
      </div>

      <div class="m-4 mt-5" style="text-align: right">
        <button
          v-show="action == 'Save'"
          @click.prevent="saveCourseData()"
          class="btn btn-success"
        >
          Save Changes
          <spinner-load :spinnerLoadShow="spinnerLoadShow" />
        </button>
        =
        <button
          v-show="action == 'update'"
          @click.prevent="updateCourseData()"
          class="btn btn-primary"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import textEitor from "./textEditor.vue";

export default {
  components: {
    textEitor,
  },
  props: {
    action1: String,
    id: null,
  },
  data() {
    return {
      spinnerLoadShow: false,
      file: "",
      name: "",
      subtitle: "",
      price: "",
      image: "",
      language: "",
      level: "",
      category: "",
      description: "",
      teacher: "",
      languages: [],
      levels: ["All Levels", "Beginner", "Medium", "Advanced"],
      departments: [],
      categories: [],
      relatedSubCategories: [],
      action: this.action1,
      errorsMessages: {
        name: [],
        subtitle: [],
        price: [],
        image: [],
        language_id: [],
        level: [],
        category_id: [],
        description: [],
        teacher: [],
        tags: [],
      },
      tags: [],
      tagSelected: null,
      arr: [],
      selectedDepartment: "",
      showTags: true,
    };
  },
  methods: {
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    handleFileUpload($event) {
      this.file = $event.target.files[0];
    },
    toggleMode(){
      this.action = this.action == 'update' ? 'Show':'update';
    },
    async saveCourseData() {
      this.spinnerLoadShow = true;
      let token = this.getToken();
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("token", JSON.stringify(token));
      formData.append("description", this.description);
      formData.append("name", this.name);
      formData.append("level", this.level);
      formData.append("subtitle", this.subtitle);
      formData.append("teacher", this.teacher);
      formData.append("price", this.price);
      formData.append("language_id", this.language);
      formData.append("category_id", this.category);
      formData.append("oranization_id", token.tokenable_id);
      formData.append("tags", JSON.stringify(this.tagSelected));
      let result = await axios.post(
        "http://127.0.0.1:8000/api/orgnaization/createCourse",
        formData,
        {
          headers: {
            "x-laravel-version": "v9",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.spinnerLoadShow = false;
      if (result.data.status) {
        this.$toast.show({
          type: "success",
          title: "success",
          message: "Add new course successfully",
        });
        this.$router.push({ name: "orgnaization-coursesList" });
      } else if (result.data.errors != null) {
        let errors = result.data.errors;
        for (let item in this.errorsMessages) {
          this.errorsMessages[item] = errors[item] ?? [];
        }
      } else {
        console.log(result.data.msg);
      }
    },
    async updateCourseData() {
      this.spinnerLoadShow = true;
      let token = this.getToken();
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("token", JSON.stringify(token));
      formData.append("description", this.description);
      formData.append("name", this.name);
      formData.append("level", this.level);
      formData.append("subtitle", this.subtitle);
      formData.append("teacher", this.teacher);
      formData.append("price", this.price);
      formData.append("language_id", this.language);
      formData.append("category_id", this.category);
      formData.append("oranization_id", token.tokenable_id);
      formData.append("course_id", this.id);
      formData.append("tags", JSON.stringify(this.tagSelected));
      let result = await axios.post(
        "http://127.0.0.1:8000/api/orgnaization/updateCourse",
        formData,
        {
          headers: {
            "x-laravel-version": "v9",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.spinnerLoadShow = false;
      if (result.data.status) {
        this.$toast.show({
          type: "success",
          title: "success",
          message: "update course successfully",
        });
        this.image = result.data.courseImage;
      } else if (result.data.errors != null) {
        let errors = result.data.errors;
        for (let item in this.errorsMessages) {
          this.errorsMessages[item] = errors[item] ?? [];
        }
      } else {
        console.log(result.data.msg);
      }
    },
    async initCourseInfo() {
      let result = await this.sendRequest({
        url: "/orgnaization/get-course-info",
        dataSend: {
          token: this.getToken(),
          course_id: this.id,
        },
      });
      if (result.data.status) {
        let courseInfo = result.data.course;
        console.log(courseInfo);
        this.name = courseInfo.name;
        this.$emit("getName", this.name);
        this.subtitle = courseInfo.subtitle;
        this.price = courseInfo.price;
        this.description = courseInfo.description;
        this.teacher = courseInfo.teacher;
        this.level = courseInfo.level;
        this.language = courseInfo.language_id;
        this.image = courseInfo.image;
        await this.getDepartments();
        await this.getCategories();
        this.category = courseInfo.category_id;
        this.getInitDepartment(this.category);
        let localTag = await this.sendRequest({
          url: "/getTags",
          dataSend: {
            category_id: courseInfo.category_id,
          },
        });
        this.tags = localTag.data.tags;
        this.tagSelected = courseInfo.tags;
      }
    },
    async getLanguages() {
      let result = await this.sendRequest({
        url: "/getLanguages",
        dataSend: [],
      });
      if (result.data.status) {
        this.languages = result.data.languages;
      }
    },
    async getDepartments() {
      let result = await this.sendRequest({
        url: "/getCategories",
        dataSend: [],
      });
      if (result.data.status) {
        this.departments = result.data.categories;
      }
    },
    async getCategories() {
      let result = await this.sendRequest({
        url: "/getSubCategories",
        dataSend: [],
      });
      if (result.data.status) {
        this.categories = result.data.subCategories;
      }
    },
    async getTags(e) {
      this.category = e.target.value;
      this.tagSelected = [];
      this.arr = [];
      let result = await this.sendRequest({
        url: "/getTags",
        dataSend: {
          category_id: this.category,
        },
      });
      if (result.data.status) {
        this.tags = result.data.tags;
      }
    },
    async updatSelectedData(data) {
      data.selectedData.forEach((element) => {
        this.arr.push(element.id);
      });
      this.tagSelected = this.arr.filter(
        (item, index) => this.arr.indexOf(item) === index
      );
    },
    changeRelatedCategories() {
      this.relatedSubCategories = this.categories.filter((value) => {
        return value.parent_id == this.selectedDepartment;
      });
    },
    getInitDepartment(child) {
      let childCat = this.categories.find((value) => {
        return value.id == child;
      });
      if (childCat) {
        this.selectedDepartment = childCat.parent_id;
        this.changeRelatedCategories();
      }
    },
  },
  async mounted() {
    if (this.id) {
      this.spinnerLoadShow = true;
      this.showTags = false;
      await this.initCourseInfo();
      this.spinnerLoadShow = false;
      this.showTags = true;
    } else {
      await this.getDepartments();
      await this.getCategories();
    }
    await this.getLanguages();
    this.$emit('emitFinishInit',true);
  },
};
</script>

<style scoped>
select,
input {
  border-radius: 20px;
  box-shadow: none;
  height: 43px;
  padding-left: 20px !important;
  background: #efefef;
}
input,
select::placeholder {
  text-transform: capitalize;
}

label {
  color: #a4a4b2;
}

.tags-holder {
  padding: 15px 20px;
  margin-top: 20px;
  border-radius: 15px;
  background: #30305f;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 23px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>