<template>
  <div>
    <button class="btn btn-dark" @click="Logout()">Logout</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations,mapActions } from "vuex";
export default {
  props: {
    source: null,
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    ...mapMutations({
      setToken: "auth/setToken",
      setUser: "auth/setUser",
    }),
    async Logout() {
      let result = await this.sendRequest({
        url: "http://127.0.0.1:8000/api/logout",
        dataSend: {
          token: this.$store.state.auth.token,
        },
      });
      if (result.data.status) {
        this.setToken(null);
        this.setUser(null);
        this.$cookies.remove("tokenInfo");
        return this.$router.push({
          name: this.source == "user" ? "user-login" : "orgnaization-login",
        });
      }
    },
  },
};
</script>

<style>
</style>
