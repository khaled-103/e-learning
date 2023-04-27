<template>
  <div class="holder">
    <h6>Categories</h6>
    <div v-if="location == 'nav'" class="pointer hideHover"></div>
    <div :class="[{ navCategoriesHolder: location == 'nav' }]">
      <div :class="[{ navCategories: location == 'nav' }]">
        <the-cat
          :key="department.id"
          :location="location"
          :category="department"
          v-for="department in departments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import theCat from "./theCat.vue";
export default {
  components: {
    theCat,
  },
  data() {
    return {
      departments: [],
    };
  },
  props: {
    location: {
      type: String,
      default: "nav",
    },
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    async getAllCategories() {
      try {
        let result = await this.sendRequest({
          url: "/homePage/getAllCategories",
          dataSend: {},
        });
        if (result.data.status) {
          let allCategories = result.data.allCategories;
          let departments = allCategories.filter((cat) => {
            return cat.parent_id == null;
          });
          for (let department of departments) {
            const departmentCategories = allCategories.filter((cat) => {
              return cat.parent_id == department.id;
            });
            this.departments.push({
              id: department.id,
              name: department.name,
              subCategories: departmentCategories,
            });
          }
        } else {
          console.error("cant get categories try again");
        }
      } catch (error) {
        console.error("cant get categories try again");
      }
    },
  },
  mounted() {
    this.getAllCategories();
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.holder {
  position: relative;
}
.navCategoriesHolder {
  position: absolute;
  width: 600px;
  top: 40px;
  left: 0;
  display: none;

}
.navCategories {
  width: 50%;
  border: 1px solid #999;
  background: white;
  height: 100%;
  z-index: 15;
  padding: 10px 0 10px 15px;
}

.hideHover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300%;
}
.hideHover:hover + .navCategoriesHolder {
  display: block;
}
.navCategoriesHolder:hover {
  display: block;
}
</style>