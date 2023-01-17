<template>
  <div>
    <div class="row justify-content-between my-4">
      <div class="col-auto mt-2">
        <nuxt-link to="/index">Dashboard</nuxt-link> /
        <nuxt-link :to="{name:'orgnaization-coursesList'}">coursesList</nuxt-link>
        <span>/ CourseLists</span>
      </div>
    </div>
    <div class="content mx-3 pb-2 mb-5">
      <h2 class="my-4 text-center">Creat New Course <i class="fa-solid fa-paintbrush"></i></h2>
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
  font-weight: bold;
  color: #34495e;
  text-decoration: none;
  padding: 0.25em;
  border-radius: 0.25em;
  background: white;
}
</style>
