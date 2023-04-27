<template>
  <div>
    <div
      class="pointer d-flex pb-2 justify-content-between parentCat"
      @click="showSubCategoriesInSideBar = true"
    >
      <h6>{{ category.name }}</h6>
      <span><i class="fa-solid fa-chevron-right"></i></span>
    </div>
    <div
      v-show="showSideSubCat"
      :class="[
        { navSubCat: location == 'nav' },
        { sideSubCat: location == 'side' },
      ]"
    >
      <div
        v-if="location == 'side'"
        class="d-flex mb-3 pointer"
        @click="showSubCategoriesInSideBar = false"
      >
        <span><i class="fa-solid fa-chevron-left"></i></span>
        <h6>Back</h6>
      </div>
      <div :key="subCat.id" v-for="subCat in category.subCategories">
        <div class="pointer pb-2">
          <h6
            @click="
              $router.push({ name: 'category-id', params: { id: subCat.id } })
            "
          >
            {{ subCat.name }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: Object,
    location: {
      type: String,
      default: "nav",
    },
  },
  data() {
    return {
      showSubCategoriesInSideBar: false,
    };
  },
  computed: {
    showSideSubCat() {
      if (this.location == "nav") {
        return true;
      }
      return this.showSubCategoriesInSideBar;
    },
  },
  methods: {
    showSubCatInSideBar() {
      this.showSubCategoriesInSideBar = true;
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.sideSubCat {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: white;
  padding: 0 12px;
}
.navSubCat {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: auto;
  background: white;
  z-index: 6;
  border: 1px solid #999;
  border-left: none;
  padding: 10px 15px;
}

.parentCat:hover + .navSubCat {
  display: block;
}
.navSubCat:hover {
  display: block;
}

.parentCat:hover * {
  color: #a435f0;
}

.navSubCat h6:hover {
  color: #a435f0;
}
.sideSubCat h6 {
  font-size: 14px;
}
h6 {
  color: #555;
  font-weight: 400;
}
span {
  color: #555;
  margin-right: 10px;
  font-size: 13px;
}
</style>