<template>
  <div>
    <div class="row justify-content-between my-4">
      <div class="col-auto mt-2">
        <nuxt-link :to="{name:'orgnaization-dashboard'}">DASHBOARD /</nuxt-link>
        <nuxt-link :to="{name:'orgnaization-coursesList'}">COURSES LIST</nuxt-link>
        <span class="text-white">/ ADD COURSE</span>
      </div>
    </div>
    <div class="content mx-3 pb-2 mb-5">
      <h2 class="my-4 text-white text-center">Creat New Course <i class="fa-solid fa-paintbrush"></i></h2>
      <formCourse action1="Save" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashBoardLayout",
};
</script>

<style scoped>
a {
  color: #a4a4b2;
  text-decoration: none;
}

</style>
