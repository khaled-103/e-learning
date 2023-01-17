<template>
  <div class="col-lg-5 col-md-7 col-10">
    <general-error
      :showGeneralError="showGeneralError"
      :generalError="generalError"
    />
    <div class="content my-5 mx-2 py-5 px-5">
      <form action="">
        <h2>Verify email</h2>
        <p>we send code to your email please verify it to create account</p>
        <input
          required
          class="form-control my-3"
          type="text"
          placeholder="Enter Code .."
          name="verify_num"
          v-model="verifyNum"
        />
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary" @click.prevent="back()">
            back
          </button>
          <button
            type="submit"
            class="btn btn-danger mx-3"
            @click.prevent="signUp()"
          >
            Verify
          </button>
          <span
            class="spinner-border text-info spinner-border-sm"
            v-show="spinnerLoadShow"
          ></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {

  data() {
    return {
      spinnerLoadShow:false,
      showGeneralError: false,
      generalError: "",
      verifyNum: null,
      errorVerify: false,
      errorVerifyMessage: { verifyNum: [] },
    };
  },
  props: {
    url: null,
    dataSend: null,
    routeName: null,
    errorsMessages: null,
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
    async signUp() {
      this.spinnerLoadShow = true;
      let res = await this.sendRequest({
        url: `/${
          this.source == "user" ? "user" : "orgnaization"
        }/checkVerifyCode`,
        dataSend: {
          email: this.dataSend.email,
          code: this.verifyNum,
        },
      });
      this.spinnerLoadShow = false;
      if (res.data.status) {
        this.showGeneralError = false;
        let result = await this.sendRequest({
          url: this.url,
          dataSend: this.dataSend,
        });
        if (result.data.status) {
          this.setToken(result.data.data.token);
          this.$cookies.set("tokenInfo", this.getToken(), {
            path: "/",
            maxAge: 60 * 60,
          });
          if (window.history.state.idx > 0) return this.$router.back();
          else return this.$router.push({ name: this.routeName });
        }
      } else {
        this.generalError = res.data.msg;
        this.showGeneralError = true;
        console.log(res.data.msg);
      }
    },
    back() {
      this.$emit("showVerifyPage", false);
    },
  },
};
</script>

<style scoped>
.x-button {
  width: 100%;
}

.content {
  background: white;
  box-shadow: 1px -1px 6px black;
  border-radius: 10px 0 10px 0;
}
</style>