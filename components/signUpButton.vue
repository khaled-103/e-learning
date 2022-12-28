<template>
  <div>
    <button
      type="submit"
      class="btn btn-primary x-button"
      @click.prevent="sendVerifyEmail()"
    >
      Sign Up
    </button>
    <spinner-load :spinnerLoadShow="spinnerLoadShow"/>
  </div>
</template>

<script>

import { mapActions } from "vuex";

export default {
  data() {
    return {
      spinnerLoadShow:false
    };
  },
  props: {
    url: null,
    dataSend: null,
    errorsMessages: null,
    source: null,
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),

    async sendVerifyEmail() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: this.url,
        dataSend: this.dataSend,
      });
      this.spinnerLoadShow = false;
      if (result.data.status) {
        this.clearErrorsMessages();
        this.$emit('showGeneralError',false);
        this.$emit("showVerifyPage", true);
      } else if (result.data.errors) {
        this.$emit('showGeneralError',false);
        let errors = result.data.errors;
        for (let item in this.errorsMessages) {
          this.errorsMessages[item] = errors[item] ?? [];
        }
      } else {
        this.clearErrorsMessages();
        this.$emit('showGeneralError',true);
        this.$emit('generalError',result.data.msg);
      }
    },
    clearErrorsMessages(){
      for (let item in this.errorsMessages) {
          this.errorsMessages[item] =  [];
      }
    }
  },
};
</script>

<style>
</style>