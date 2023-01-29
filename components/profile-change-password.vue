<template>
  <div>
    <form>
      <div class="mb-3 row">
        <label for="password" class="col-lg-3 col-12">Current Password:</label>
        <div class="col-lg-8 col-12 inputHolder">
          <input
            required
            type="password"
            id="password"
            placeholder="Orgnaization Password"
            name="currentPassword"
            v-model="inputs.password"
          />
          <i class="fa-solid fa-eye" @click="changeInputType($event)"></i>
          <p
            class="text-danger"
            v-show="this.errorsMessages.password.length > 0"
          >
            {{ errorsMessages.password[0] ?? "" }}
          </p>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="newPassword" class="col-lg-3 col-12">New Password:</label>
        <div class="col-lg-8 col-12 inputHolder">
          <input
            required
            type="password"
            id="newPassword"
            placeholder="Orgnaization New Password"
            name="newPassword"
            v-model="inputs.newPassword"
          />
          <i class="fa-solid fa-eye" @click="changeInputType($event)"></i>
          <p
            class="text-danger"
            v-show="this.errorsMessages.newPassword.length > 0"
          >
            {{ errorsMessages.newPassword[0] ?? "" }}
          </p>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="newPassword_confirmation" class="col-lg-3 col-12"
          >Confirm Password:</label
        >
        <div class="col-lg-8 col-12 inputHolder">
          <input
            required
            type="password"
            id="newPassword_confirmation"
            placeholder="Confirm Password"
            name="newPassword_confirmation"
            v-model="inputs.newPassword_confirmation"
          />
          <i class="fa-solid fa-eye" @click="changeInputType($event)"></i>
          <p
            class="text-danger"
            v-show="this.errorsMessages.newPassword_confirmation.length > 0"
          >
            {{ errorsMessages.newPassword_confirmation[0] ?? "" }}
          </p>
        </div>
      </div>

      <div class="text-center mt-5">
        <button
          type="submit"
          class="btn btn-danger"
          @click.prevent="changePassword()"
        >
          Change Password <spinner-load :spinnerLoadShow="spinnerLoadShow" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      spinnerLoadShow: false,
      inputs: {
        password: "",
        newPassword: "",
        newPassword_confirmation: ""
      },
      errorsMessages: {
        password: [],
        newPassword: [],
        newPassword_confirmation: [],
      },
    };
  },
  methods: {
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    clearErrorMessages(){
      this.errorsMessages={
        password: [],
        newPassword: [],
        newPassword_confirmation: [],
      };
      this.inputs = {
        password: "",
        newPassword: "",
        newPassword_confirmation: ""
      };
    },
    changeInputType($event){
      let target = $event.currentTarget;
      let previousInput = target.previousElementSibling;
      target.classList.toggle("fa-eye-slash");
      target.classList.toggle("fa-eye");
      previousInput.type = (previousInput.type == 'text' ? 'password':'text');
    }
    ,
    async changePassword() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/orgnaization/profileChangePassword",
        dataSend: {
          token: this.getToken(),
          password: this.inputs.password,
          newPassword: this.inputs.newPassword,
          newPassword_confirmation: this.inputs.newPassword_confirmation,
        },
      });
      if (result.data.status) {
        this.clearErrorMessages();
        this.$toast.show({
          type: "success",
          title: "success",
          message: "Change your password done",
        });
      }else if (result.data.errors != null) {
        let errors = result.data.errors;
        for (let item in this.errorsMessages) {
          this.errorsMessages[item] = errors[item] ?? [];
        }
      } else {
        this.$toast.show({
          type: "danger",
          title: "Failed",
          message: "Something error !!",
        });
      }
      this.spinnerLoadShow = false;
    },
  },
};
</script>

<style scoped>
label {
  margin-top: 5px;
  padding-left: 0;
  padding-right: 0;
  font-weight: 450;
  color: white;
}
input,
select {
  border: 1px solid #a4a4b2;
  padding: 5px 10px;
  width: 100%;
  border-radius: 20px;
}
p.text-danger{
  font-size: 14px;
  margin-bottom: 0;
}
.inputHolder{
  position: relative;
  padding-left: 0;
}
i.fa-eye,i.fa-eye-slash{
  position: absolute;
  top: 8px;
  right: 20px;
  cursor: pointer;
}
</style>
