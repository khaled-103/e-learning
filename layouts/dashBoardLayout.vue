<template>
  <div class="">
    <sidbar />
    <div class="home-section">
      <navbar />
      <div class="holder my-3 mx-5">
        <div class=" mainContent  p-5">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "AuthOrg",
  head: {
    link: [
      {rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css'},
      {rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'},
    ],
    script:[{src:'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'}]
  },
  created() {
    if (this.$store.state.auth.token == null)
      this.$store.dispatch("auth/initToken");
  },
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
@import "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css";
@import "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap";


body{
  background: #fafafa;
}

.mainContent {
  box-shadow: 0 0 5px black;
}
* {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}
.home-section {
  position: relative;
  min-height: 100vh;
  width: calc(100% - 230px);
  left: 230px;
  background: #fff;
  transition: all 0.5s ease;
}


@media (max-width: 767px) {
  .home-section {
    width: 100%;
    left: 0;
  }
}
@media (max-width: 900px) {

  .holder {
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
}
</style>