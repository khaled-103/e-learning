<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center text-center">
      <div class="col-lg-5 col-md-7 col-10">
        <general-error
          :showGeneralError="showGeneralError"
          :generalError="generalError"
        />
        <div class="content mt-2 mx-2 py-5 px-5">
          <div class="email-component-reset">
            <i class="fa-regular fa-user icon"></i>
            <h4 class="my-3">Forget Password</h4>
            <form>
              <div class="mb-3">
                <input
                  required
                  type="email"
                  :class="[
                    'form-control',
                    {
                      'is-invalid': errorsMessages.email.length > 0,
                    },
                  ]"
                  id="email"
                  placeholder="Enter your email to reset Your password"
                  name="email"
                  v-model="email"
                />
                <p
                  class="text-danger"
                  v-show="this.errorsMessages.email.length > 0"
                >
                  {{ errorsMessages.email[0] ?? "" }}
                </p>
              </div>
              <button
                @click.prevent="sendCodeToEmail()"
                type="submit"
                class="btn btn-primary"
              >
                Submit
              </button>
              <spinner-load :spinnerLoadShow="spinnerLoadShow" />
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
      email: null,
      spinnerLoadShow: false,
      errorsMessages: {
        email: [],
      },
      showGeneralError: false,
      generalError: false,
    };
  },
  props: {
    type:null
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    async sendCodeToEmail() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: `/${this.type}/sendCodeToEmail`,
        dataSend: {
          email: this.email,
        },
      });
      this.spinnerLoadShow = false;
      if (result.data.status) {
        this.showGeneralError = false;
        this.clearErrorsMessages();
        console.log("send email");
        this.$emit('emailValue',this.email);
        this.$emit('showResetPasswordPage',true);
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
    clearErrorsMessages() {
      for (let item in this.errorsMessages) {
        this.errorsMessages[item] = [];
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