<template>
  <div class="">
    <sidbar />
    <div class="home-section">
        <navbar/>
        <div class="mainContent p-3">
          <Nuxt />
        </div>
    </div>
  </div>
</template>

<script>
import { Script } from 'vm';
export default {
  middleware: "AuthOrg",
  head:{
    link: [
      {rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'},
    ],
    script:[{src:'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'}],
  },
  created(){
    if(this.$store.state.auth.token == null)
      this.$store.dispatch('auth/initToken');
  }
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css';
@import 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css';
@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap';
body{
  background: #fafafa;
}
*{
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}
.home-section {
  position: relative;
  background: rgb(221, 238, 245);
  min-height: 100vh;
  width: calc(100% - 240px);
  left: 240px;
  transition: all 0.5s ease;
}

@media (max-width: 767px){
   .home-section{
    width: 100%;
    left:0
   }
}
</style>