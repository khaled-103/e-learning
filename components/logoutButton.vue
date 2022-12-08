<template>
  <div>
    <button class="btn btn-dark" @click="Logout('user')">Logout user</button>
    <button class="btn btn-dark" @click="Logout('orgnaization')">Logout orgnaization</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  methods:{
    ...mapMutations({
      setToken: "auth/setToken",
      setUser: "auth/setUser",
    }),
    async Logout(source){
        let result = await axios.post(`http://127.0.0.1:8000/api/logout`,{
          token : this.$store.state.auth.token,
        });
        if(result.data.status){
          this.setToken(null);
          this.setUser(null);
          // delete cokkie from abdullla
          return this.$router.push({name: source == 'user' ? 'login' : 'orgnaization-login'});
        }
    }
  }
}
</script>

<style>

</style>
