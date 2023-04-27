<template>
  <div>
    <button
      @click.prevent="login()"
      type="submit"
      class="btn btn-primary x-button mt-1"
    >
      Login
    </button>
    <spinner-load :spinnerLoadShow="spinnerLoadShow" />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      spinnerLoadShow: false,
    };
  },
  props: {
    url: null,
    dataSend: null,
    errorsMessages: null,
    routeName: null,
    source: null,
  },
  methods: {
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    ...mapMutations({
      setToken: "auth/setToken",
      setUser: "auth/setUser",
    }),
    async login() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: this.url,
        dataSend: this.dataSend,
      });
      this.spinnerLoadShow = false;
      if (result.data.status) {
        this.clearErrorsMessages();
        this.$emit("showGeneralError", false);
        this.setToken(result.data.data.token);
        this.setUser(result.data.data[this.source]);
        this.$cookies.set("tokenInfo", this.getToken(), {
          path: "/",
          maxAge: 60 * 60,
        });
        return this.$router.push(this.$route.query.redirect || 'index');
      } else if (result.data.errors != null) {
        this.$emit("showGeneralError", false);
        let errors = result.data.errors;
        for (let item in this.errorsMessages) {
          this.errorsMessages[item] = errors[item] ?? [];
        }
      } else {
        this.clearErrorsMessages();
        this.$emit("generalError", result.data.msg);
        this.$emit("showGeneralError", true);
      }
    },
    clearErrorsMessages() {
      for (let item in this.errorsMessages) {
        this.errorsMessages[item] = [];
      }
    },
  },
};
</script>

<style scoped>
.x-button {
  color: white;
  width: 100%;
  padding: 4px 10px;
  border-radius: 25px;
}
</style>