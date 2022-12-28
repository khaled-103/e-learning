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
      type="user"
    />
    <reset-password
      @showResetPasswordPage="
        (value) => {
          showResetPasswordPage = value;
        }
      "
      v-show="showResetPasswordPage"
      :email="email"
      type="user"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showResetPasswordPage: false,
      email: null,
    };
  },
};
</script>

<style>
</style>