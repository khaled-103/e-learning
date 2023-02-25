<template>
  <div>
    <form>
      <div class="text-end my-3">
        <button
          type="submit"
          class="btn btn-success btn-sm"
          @click.prevent="submitChanges()"
        >
          Save Changes <spinner-load :spinnerLoadShow="spinnerLoadShow" />
        </button>
        <!-- <img style="" :src="'http://127.0.0.1:8000/uploads/images/org/'+imageProfilePath" alt=""> -->
      </div>
      <div class="mb-3 row">
        <label for="image" class="col-lg-3 col-12">Orgnaization Image: </label>
        <div class="col-lg-8 col-12">
          <input
            required
            type="file"
            id="image"
            placeholder="Orgnaization Image"
            name="image"
            accept="image/*"
            class="form-control"
            @change="handleFileUpload($event)"
          />
          <p class="text-danger" v-show="this.errorsMessages.image.length > 0">
            {{ errorsMessages.image[0] ?? "" }}
          </p>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="description" class="col-lg-3 col-12"
          >Orgnaization Description:</label
        >
        <div class="col-lg-8 col-12">
          <input
            required
            type="text"
            id="description"
            placeholder="Orgnaization Description"
            name="description"
            v-model="description"
          />
          <p
            class="text-danger"
            v-show="this.errorsMessages.description.length > 0"
          >
            {{ errorsMessages.description[0] ?? "" }}
          </p>
        </div>
      </div>

      <org-categories
        v-if="orgCategoriesComponent.selectedCategories"
        :departments="orgCategoriesComponent.departments"
        :categories="orgCategoriesComponent.categories"
        :selectedValues="orgCategoriesComponent.selectedCategories"
      />
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      uploadPercentage: 0,
      imageProfilePath: null,
      file: "",
      description: "",
      spinnerLoadShow: false,
      errorsMessages: {
        image: [],
        description: [],
      },
      orgCategoriesComponent: {
        departments: [],
        categories: [],
        selectedCategories: null,
      },
    };
  },
  props: {
    orgProfileInfo: null,
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    handleFileUpload($event) {
      this.file = $event.target.files[0];
    },
    clearErrorMessages() {
      this.errorsMessages = {
        image: [],
        description: [],
      };
    },
    async submitChanges() {
      this.spinnerLoadShow = true;
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("token", JSON.stringify(this.getToken()));
      formData.append("description", this.description);
      let result = await axios.post(
        "http://127.0.0.1:8000/api/orgnaization/saveAdditionalInfoChanges",
        formData,
        {
          headers: {
            "x-laravel-version": "v9",
            "Content-Type": "multipart/form-data",
          }
        }
      );
      if (result.data.status) {
        this.clearErrorMessages();
        this.$toast.show({
          type: "success",
          title: "success",
          message: "Change your profile done",
        });
      } else if (result.data.errors != null) {
        let errors = result.data.errors;
        for (let item in this.errorsMessages) {
          this.errorsMessages[item] = errors[item] ?? [];
        }
      } else {
        this.$toast.show({
          type: "danger",
          title: "Failed",
          message: "Something error !!",
        });
      }
      this.spinnerLoadShow = false;
    },
    async getMainCategories() {
      let result = await this.sendRequest({
        url: "/getCategories",
        dataSend: {},
      });
      if (result.data.status) {
        console.log(result.data);
        this.orgCategoriesComponent.departments = result.data.categories;
      }
    },
    async getSubCategories() {
      let result = await this.sendRequest({
        url: "/getSubCategories",
        dataSend: {},
      });
      if (result.data.status) {
        this.orgCategoriesComponent.categories = result.data.subCategories;
      }
    },
    async getselectedCategories() {
      let result = await this.sendRequest({
        url: "/getSelectedOrgCategories",
        dataSend: {
          id: this.getToken().tokenable_id,
        },
      });
      if (result.data.status) {
        this.orgCategoriesComponent.selectedCategories = result.data.categories;
      }
    },
  },
  async mounted() {
    this.description = this.orgProfileInfo.description;
    this.imageProfilePath = this.orgProfileInfo.image;
    await this.getMainCategories();
    await this.getSubCategories();
    await this.getselectedCategories();
  },
};
</script>

<style scoped>
label {
  margin-top: 5px;
  padding-left: 0;
  font-weight: 450;
  color: white;
}
input,
select {
  border: 1px solid #a4a4b2;
  padding: 5px 15px;
  width: 100%;
  border-radius: 20px;
}
p.text-danger {
  font-size: 14px;
  margin-bottom: 0;
}
</style>