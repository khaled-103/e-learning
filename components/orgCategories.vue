<template>
  <div class="" style="margin-top:100px;">
    <!-- <hr> -->
    <p class="" style="color:#a4a4b2">What does your company offer?</p>
    <div class="mb-3 row">
      <label for="description" class="col-lg-3 col-12"
        >Orgnaization Departments:</label
      >
      <div class="col-lg-8 col-12">
        <select
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
    <div class="mb-3 row">
      <label for="description" class="col-lg-3 col-12"
        >Orgnaization Categories:</label
      >
      <div class="col-lg-8 col-12">
        <select v-model="selectedRelatedCategory" @change="addNewCategory()">
          <option disabled selected value="">Choose Categories</option>
          <option
            class="py-4 px-3"
            :value="relatedSubCategorie.id"
            v-for="relatedSubCategorie in relatedSubCategories"
            :key="relatedSubCategorie.id"
          >
            {{ relatedSubCategorie.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="selectedCategories d-flex">
      <span
        class="catTag badge bg-success text white mx-1 p-2"
        :key="item.id"
        v-for="item in shownValues"
      >
        {{ item.name }}
        <i
          class="fa fa-xmark text-white p-1"
          @click="removeCategory(item.id)"
        ></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedDepartment: "",
      selectedRelatedCategory: "",
      shownValues: [],
      relatedSubCategories: [],
    };
  },
  props: {
    departments: [],
    categories: [],
    selectedValues: [],
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    changeRelatedCategories() {
      this.relatedSubCategories = this.categories.filter((value) => {
        if (value.parent_id == this.selectedDepartment) {
          let res = this.shownValues.find((item) => {
            return item.id == value.id;
          });
          if (!res) {
            return value;
          }
        }
      });
    },
    async addNewCategory() {
      this.pushToShownVlaues(this.selectedRelatedCategory);
      let result = await this.sendRequest({
        url: "/orgnaization/addNewCategory",
        dataSend: {
          token: this.getToken(),
          id: this.selectedRelatedCategory,
        },
      });
      if (result.data.status) {
        this.relatedSubCategories = this.relatedSubCategories.filter(
          (value) => {
            return value.id != this.selectedRelatedCategory;
          }
        );
        this.selectedRelatedCategory = "";
      }
    },
    async removeCategory(id) {
      this.shownValues = this.shownValues.filter((value) => {
        return value.id != id;
      });
      this.changeRelatedCategories();
      let result = await this.sendRequest({
        url: "/orgnaization/deleteCategory",
        dataSend: {
          token: this.getToken(),
          id: id,
        },
      });
      if (result.data.status) {

      }
    },
    pushToShownVlaues(target) {
      let name = this.categories.find((value) => {
        return value.id == target;
      }).name;
      this.shownValues.push({ id: target, name: name });
    },
  },
  mounted() {
    for (let item of this.selectedValues) {
      this.pushToShownVlaues(item.categories_id);
    }
  },
};
</script>

<style scoped>
label {
  margin-top: 5px;
  padding-left: 0;
  font-weight: 500;
  color: white;
}
select {
  border: 1px solid #a4a4b2;
  padding: 5px 10px;
  width: 100%;
  border-radius: 20px;
}
i.fa-xmark {
  border-radius: 50%;
  background: red;
  margin-left: 4px;
  cursor: pointer;
}
.selectedCategories {
  flex-wrap: wrap;
}
.catTag {
  flex-basis: auto;
  margin-bottom: 5px;
}
</style>