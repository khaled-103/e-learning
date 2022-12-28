<template>
  <div>
    <forget-password
      @emailValue="
        (value) => {
          email = value;
        }
      "
      @showResetPasswordPage="
        (value) => {
          showResetPasswordPage = value;
        }
      "
      v-show="!showResetPasswordPage"
      type="orgnaization"
    />
    <reset-password
      @showResetPasswordPage="
        (value) => {
          showResetPasswordPage = value;
        }
      "
      v-show="showResetPasswordPage"
      :email="email"
      type="orgnaization"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showResetPasswordPage: false,
      email:null
    };
  },
};
</script>

<style>
</style>