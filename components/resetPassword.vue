<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center text-center">
      <div class="col-lg-5 col-md-7 col-10">
        <general-error
          :showGeneralError="showGeneralError"
          :generalError="generalError"
        />
        <div class="content mt-2 mx-2 py-5 px-5">
          <i class="fa-regular fa-user icon"></i>
          <h4 class="my-3">Reset Password</h4>
          <div v-show="!showResetFeilds" class="reset-code-validate">
            <p>we send code to your email. enter this code</p>
            <form>
              <div class="mb-3">
                <input
                  required
                  type="text"
                  :class="[
                    'form-control',
                    {
                      'is-invalid': errorsMessages.code.length > 0,
                    },
                  ]"
                  id="code"
                  placeholder="Enter code ..."
                  name="code"
                  v-model="code"
                />
                <p
                  class="text-danger"
                  v-show="this.errorsMessages.code.length > 0"
                >
                  {{ errorsMessages.code[0] ?? "" }}
                </p>
              </div>
              <div class="mb-3">
                <input
                  required
                  type="password"
                  :class="[
                    'form-control',
                    {
                      'is-invalid': errorsMessages.password.length > 0,
                    },
                  ]"
                  id="password"
                  placeholder="Enter new password ..."
                  name="password"
                  v-model="password"
                />
                <p
                  class="text-danger"
                  v-show="this.errorsMessages.password.length > 0"
                >
                  {{ errorsMessages.password[0] ?? "" }}
                </p>
              </div>
              <div class="mb-3">
                <input
                  required
                  type="password"
                  :class="[
                    'form-control',
                    {
                      'is-invalid':
                        this.errorsMessages.password_confirmation.length > 0,
                    },
                  ]"
                  id="password_confirmation"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  v-model="password_confirmation"
                />
                <p
                  class="text-danger"
                  v-show="this.errorsMessages.password_confirmation.length > 0"
                >
                  {{ this.errorsMessages.password_confirmation[0] ?? "" }}
                </p>
              </div>
              <button
                @click.prevent="back()"
                type="submit"
                class="btn btn-primary"
              >
                Back
              </button>

              <button
                @click.prevent="resetPassword()"
                type="submit"
                class="btn btn-danger"
              >
                Reset Now
              </button>
              <spinner-load :spinnerLoadShow="spinnerLoadShow" />

              <!-- <button
                @click.prevent="verifyCode()"
                type="submit"
                class="btn btn-danger"
              >
                Verify
              </button> -->

              <!-- <spinner-load :spinnerLoadShow="spinnerLoadShow" /> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      code: null,
      spinnerLoadShow: false,
      showResetFeilds: false,
      password: null,
      password_confirmation: null,
      errorsMessages: {
        code: [],
        password: [],
        password_confirmation: [],
      },
      showGeneralError: false,
      generalError: false,
    };
  },
  props: {
    type: null,
    email: null,
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    clearErrorsMessages() {
      for (let item in this.errorsMessages) {
        this.errorsMessages[item] = [];
      }
    },
    back() {
      this.$emit("showResetPasswordPage", false);
    },
    async resetPassword() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: `/${this.type}/resetPassword`,
        dataSend: {
          email: this.email,
          code: this.code,
          password:this.password,
          password_confirmation:this.password_confirmation,
        },
      });
      this.spinnerLoadShow = false;
      if (result.data.status) {
        this.showGeneralError = false;
        this.clearErrorsMessages();
        console.log(result.data);
        return this.$router.push({
          name: this.type == "user" ? "user-login" : "orgnaization-login",
        });
      } else if (result.data.errors != null) {
        this.showGeneralError = false;
        let errors = result.data.errors;
        for (let item in this.errorsMessages) {
          this.errorsMessages[item] = errors[item] ?? [];
        }
      } else {
        this.clearErrorsMessages();
        this.generalError = result.data.msg;
        this.showGeneralError = true;
      }
    },
  },
};
</script>

<style scoped>
.icon {
  border-radius: 50%;
  padding: 20px;
  background: #1089ff;
  color: white;
  font-size: 24px;
}
.x-button {
  width: 100%;
}

.content {
  background: white;
  box-shadow: 1px -1px 6px black;
  border-radius: 10px;
}
</style>