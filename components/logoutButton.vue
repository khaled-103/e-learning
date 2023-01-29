<template>
  <div>
    <li class="side-link">
      <a
        class="d-flex align-items-center text-decoration-none text-white"
        @click="Logout()"
      >
        <i class="fa-solid fa-right-from-bracket"></i>
        <span class="links_name">Logout</span>
      </a>
    </li>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
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
        url: "/logout",
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

<style scoped>
.side-link {
  position: relative;
  list-style: none;
  height: 50px;
  margin: 0 15px 0 15px;
  border-radius: 10px 10px 0 0;
  margin-top: 10px;
  margin-bottom: 10px;
}

.side-link a {
  height: 100%;
  width: 100%;
  transition: all 0.4s ease;
  cursor: pointer;
}
.side-link a:hover,
.side-link a:active {
  background: #0258e3;
  border-radius: 10px;
}
.side-link i {
  min-width: 60px;
  text-align: center;
  font-size: 18px;
  color: white;
}

.side-link a .links_name {
  font-size: 15px;
  font-weight: 400;
}
</style>
