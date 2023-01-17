<template>
    <Nuxt />
</template>

<script>
export default {
head:{
    link: [
      {rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css'},
      {rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'},
    ],
    script:[{src:'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'}],
  },
  created(){
    if(this.$store.state.auth.token == null)
      this.$store.dispatch('auth/initToken');
  }

}
</script>

<style>
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
</style>
