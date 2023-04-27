<template>
  <page-loading-spinner />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  middleware: ["AuthUser"],
  methods: {
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    async confirmPayment() {
      // console.log(JSON.parse(decodeURI(this.$route.query.orderInfo)));
      // let orderInfo = JSON.parse(decodeURI(this.$route.query.orderInfo));
      let payment_intent = this.$route.query.payment_intent;
      console.log(this.getToken());
      // if (this.$route.redirect_status == "succeeded") {
      try {
        let result = await this.sendRequest({
          url: "/checkStripeReturn",
          dataSend: {
            payment_intent: payment_intent,
            orderId: this.$route.params.orderId,
          },
        });
        console.log("confirm payment");
        console.log(result.data);
        if (result.data.status) {
          return this.$router.push({
            name: "user-mylearning",
          });
        } else {
          this.failPayment();
        }
      } catch (error) {
        this.failPayment();
      }
    },
    failPayment() {
      this.$toast.show({
        type: "danger",
        title: "failed",
        message: "paying failed. try again!",
      });
      return this.$router.push({
        name: "user-mylearning",
      });
    },
  },
  mounted() {
    let interval = setInterval(() => {
      if (this.getToken()) {
        this.confirmPayment();
        clearInterval(interval);
      }
    }, 100);
  },
};
</script>

<style scoped>

</style>