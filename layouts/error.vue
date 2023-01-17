<template>
  <div style="height:100vh;" class="d-flex justify-content-center align-items-center bg-dark text-white">
    <div class="text-center text-danger">
      <i class="fa-solid fa-bug fa-4x"></i>
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <NuxtLink class="text-danger" to="/">Home page</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>