<template>
  <div class="spinners">
    <span class="loader"></span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "homePageLayout",
  methods: {
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    async confirmPayment() {
      console.log(JSON.parse(decodeURI(this.$route.query.orderInfo)));
      let orderInfo = JSON.parse(decodeURI(this.$route.query.orderInfo));
      let payment_intent = this.$route.query.payment_intent;
      console.log(this.getToken());
      // if (this.$route.redirect_status == "succeeded") {
      let result = await this.sendRequest({
        url: "/checkStripeReturn",
        dataSend: {
          payment_intent: payment_intent,
          user_id: this.getToken().tokenable_id,
          orderItems: orderInfo.orderItems,
          totalPrice: orderInfo.amount,
          basicPrice: orderInfo.basicPrice,
          discount: orderInfo.discount,
        },
      });
      console.log("confirm payment");
      console.log(result.data);
      if (result.data.status) {
        return this.$router.push({
          name: "course-learn-slug",
          params: { slug: this.$route.params.courseId },
        });
      } else {
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
        name: "course-detail_course-slug",
        params: { slug: this.$route.params.courseId },
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
.spinners {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid #1c1d1f;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid;
  border-color: orange transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>