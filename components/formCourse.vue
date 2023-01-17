<template>
  <div>
    <div v-show="spinnerLoadShow" class="text-center">
      <h6>
        Proccessing... <spinner-load :spinnerLoadShow="spinnerLoadShow" />
      </h6>
    </div>
    <form class="px-4 my-4">
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

      <!-- <label>Course Image</label>
    <div
      class="d-flex border border-dark justify-content-between"
      style="width: 100%; height: 45px"
    >
      <span class="p-2">{{ fileName }}</span>
      <inputfile
        @file-updated="captureFile($event)"
        :action="action"
      ></inputfile>
    </div> -->

      <div class="form-group my-4">
        <label for="">Course Image:</label>
        <input
          type="file"
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.image.length > 0 },
          ]"
          :value="this.image"
          :disabled="action === 'Show'"
        />
        <p class="text-danger" v-show="this.errorsMessages.image.length > 0">
          {{ this.errorsMessages.image[0] ?? "" }}
        </p>
      </div>

      <div class="form-group my-4">
        <label for=""> Select Category:</label>
        <select
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.category_id.length > 0 },
          ]"
          v-model="category"
          :disabled="action === 'Show'"
        >
          <option disabled selected value="">Select Category</option>
          <option
            class="py-4 px-3"
            :value="option.id"
            v-for="option in categories"
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

      <div class="form-group">
        <label for="description" class="d-block"></label>
        <textarea
          placeholder="Course Description"
          v-model="description"
          style="width: 100%"
          rows="5"
          :class="[
            'form-control',
            'p-2',
            { 'is-invalid': this.errorsMessages.description.length > 0 },
          ]"
        ></textarea>
        <p
          class="text-danger"
          v-show="this.errorsMessages.description.length > 0"
        >
          {{ this.errorsMessages.description[0] ?? "" }}
        </p>
      </div>

      <div class="m-4 mt-5" style="text-align: right">
        <button
          v-show="action == 'Save'"
          @click.prevent="saveCourseData()"
          class="btn btn-primary"
        >
          Save
          <spinner-load :spinnerLoadShow="spinnerLoadShow" />
        </button>
        <button
          v-show="action == 'Show'"
          @click.prevent="action = 'Update'"
          class="btn btn-primary"
        >
          Edite
        </button>
        <button
          v-show="action == 'Update'"
          @click.prevent=""
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
import spinnerLoad from "./spinnerLoad.vue";

export default {
  components: { spinnerLoad },
  props: {
    action1: String,
    id: null,
  },
  data() {
    return {
      spinnerLoadShow: false,
      name: "",
      subtitle: "",
      price: "",
      image: "",
      language: "",
      level: "",
      category: "",
      description: "",
      languages: [],
      levels: ["All Levels", "Beginner", "Medium", "Advanced"],
      categories: [],
      action: this.action1,
      fileName: "",
      errorsMessages: {
        name: [],
        subtitle: [],
        price: [],
        image: [],
        language_id: [],
        level: [],
        category_id: [],
        description: [],
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
    async saveCourseData() {
      this.spinnerLoadShow = true;
      let token = this.$store.state.auth.token;
      let result = await this.sendRequest({
        url: "/orgnaization/createCourse",
        dataSend: {
          token: token,
          name: this.name,
          level: this.level,
          subtitle: this.subtitle,
          description: this.description,
          price: this.price,
          image: this.image,
          oranization_id: token ? token.tokenable_id : "",
          language_id: this.language,
          category_id: this.category,
        },
      });
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
    async initCourseInfo() {
      let courseId = this.id;
      let result = await this.sendRequest({
        url: "/orgnaization/get-course-info",
        dataSend: {
          token: this.getToken(),
          course_id: courseId,
        },
      });
      if (result.data.status) {
        let courseInfo = result.data.course;
        this.name = courseInfo.name;
        this.subtitle = courseInfo.subtitle;
        this.price = courseInfo.price;
        this.description = courseInfo.description;
        this.level = courseInfo.level;
        this.language = courseInfo.language_id;
        this.category = courseInfo.category_id;
      } else {
        return this.$router.push("/error");
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
    async getCategories() {
      let result = await this.sendRequest({
        url: "/getCategories",
        dataSend: [],
      });
      if (result.data.status) {
        this.categories = result.data.categories;
      }
    },
  },
  async mounted() {
    this.spinnerLoadShow = true;
    if (this.id) {
      await this.initCourseInfo();
    }
    this.spinnerLoadShow = false;
    await this.getLanguages();
    await this.getCategories();
  },
};
</script>

<style scoped>
select,
input {
  border: 1px black solid;
  border-radius: 0;
  box-shadow: none;
  height: 43px;
}
</style>