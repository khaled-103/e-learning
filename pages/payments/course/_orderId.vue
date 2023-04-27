<template>
  <div>
    <page-loading-spinner v-if="!resultReady" />
    <div v-show="resultReady" style="width: 100%" class="holder">
      <div class="container">
        <div class="row py-5">
          <div class="col-md-7 col-12">
            <div
              id="payment-message"
              style="display: none"
              class="alert alert-danger"
            ></div>
            <div class="">
              <form
                action=""
                class="bg-white"
                style="width: 100%"
                method="post"
                id="payment-form"
              >
                <div id="payment-element"></div>
              </form>
              <div class="order_details">
                <h5 class="mb-3">Order details</h5>
                <div class="mb-3" :key="item.id" v-for="item in orderItems">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex col-10">
                      <img
                        :src="item.image"
                        alt=""
                        width="30px"
                        height="30px"
                      />
                      <h6 class="mx-2">{{ item.name }}</h6>
                    </div>
                    <span>${{ item.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="summary col-md-5 col-12 bg-white">
            <div class="p-5">
              <h5 class="mb-3">Summary</h5>
              <div class="d-flex justify-content-between">
                <span>Basic Price:</span>
                <span>${{ basicPrice }}</span>
              </div>
              <hr />
              <div class="d-flex justify-content-between">
                <span>Discount:</span>
                <span>${{ discount }}</span>
              </div>
              <hr />
              <div class="d-flex justify-content-between">
                <span>Total:</span>
                <span>${{ orderTotalPrice }}</span>
              </div>
              <button
                type="submit"
                class="mt-5"
                id="submit"
                form="payment-form"
              >
                <span id="button-text">Complete Payment</span>
                <span id="spinner" style="display: none">Proccessing...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
let elements, stripe;
export default {
  layout: "homePageLayout",
  middleware: ["AuthUser"],
  head: {
    script: [
      {
        src: "https://js.stripe.com/v3/",
      },
    ],
  },
  data() {
    return {
      stripeResponse: null,
      orderId: null,
      basicPrice: null,
      discount: null,
      orderItems: [],
      orderTotalPrice: null,
      resultReady: false,
    };
  },

  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    ...mapMutations({
      setOrderItems: "payment/setOrderItems",
    }),
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    async initialize() {
      this.resultReady = false;
      await this.initOrderInfo();
      const response = await fetch(
        "http://127.0.0.1:8000/api/payment/createPaymentIntent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: this.orderTotalPrice,
            orderId: this.$route.params.orderId,
            userId: this.getToken().tokenable_id,
          }),
        }
      );
      const res = await response.json();
      const { clientSecret } = await res;
      const appearance = {
        theme: "stripe",
      };
      elements = stripe.elements({ appearance, clientSecret });

      const paymentElementOptions = {
        layout: "tabs",
      };
      const paymentElement = elements.create("payment", paymentElementOptions);
      paymentElement.mount("#payment-element");
      this.resultReady = true;
    },
    async initOrderInfo() {
      let result = await this.sendRequest({
        url: "/getInitOrderInfo",
        dataSend: {
          orderId: this.$route.params.orderId,
          userId: this.getToken().tokenable_id,
        },
      });
      if (result.data.status) {
        const order = result.data.order;
        this.basicPrice = order.basicPrice;
        this.orderTotalPrice = order.totalPrice;
        this.orderItems = JSON.parse(order.summary);
        this.discount = order.discount;
      } else {
        this.$toast.show({
          type: "danger",
          title: "failed",
          message: "Warning!! can't access to this order",
        });
        this.$router.push({
          name: "index",
        });
      }
    },

    async handleSubmit(e) {
      e.preventDefault();
      this.setLoading(true);
      this.stripeResponse = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url:
            "http://localhost:3000/payments/confirm/" +
            this.$route.params.orderId,
        },
      });

      if (
        this.stripeResponse.error.type === "card_error" ||
        this.stripeResponse.error.type === "validation_error"
      ) {
        this.showMessage(this.stripeResponse.error.message);
      } else {
        this.showMessage("An unexpected error occurred.");
      }
      console.log("success");

      this.setLoading(false);
    },

    async checkStatus() {
      console.log("enter check");
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) {
        return;
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      switch (paymentIntent.status) {
        case "succeeded":
          this.showMessage("Payment succeeded!");
          break;
        case "processing":
          this.showMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          this.showMessage(
            "Your payment was not successful, please try again."
          );
          break;
        default:
          this.showMessage("Something went wrong.");
          break;
      }
    },
    showMessage(messageText) {
      const messageContainer = document.querySelector("#payment-message");

      messageContainer.style.display = "block";
      messageContainer.textContent = messageText;

      setTimeout(function () {
        messageContainer.style.display = "none";
        messageText.textContent = "";
      }, 4000);
    },

    // Show a spinner on payment submission
    setLoading(isLoading) {
      if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").style.display = "inline";
        document.querySelector("#button-text").style.display = "none";
      } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").style.display = "none";
        document.querySelector("#button-text").style.display = "inline";
      }
    },
  },
  mounted() {
    let interval = setInterval(() => {
      if (this.getToken()) {
        stripe = new Stripe(
          "pk_test_51Meg81Loe7VzYnJpefrOlBo3mSkbspAoN4A1dyaMbUJi102yGKjRiDoTQTeBD2FxJDMtAdMPbAc9q3IpjoD0X8RO00jcUe8XOp"
        );
        document
          .querySelector("#payment-form")
          .addEventListener("submit", this.handleSubmit);
        this.initialize();
        clearInterval(interval);
      }
    }, 500);
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != "payments-confirm-orderId") {
      this.sendRequest({
        url: "/cancleOrder",
        dataSend: {
          orderId: this.$route.params.orderId,
        },
      });
    }
    next();
  },
};
</script>
<style scoped>
/* Variables */
* {
  box-sizing: border-box;
}
img {
  max-width: 40px;
  max-height: 40px;
  object-fit: cover;
}
.row {
  overflow-x: hidden;
}
.holder {
  background: #f1edf3;
  width: 100vw;
  min-height: 100vh;
}
.summary {
  border-radius: 10px;
  border: 1px solid #ddd;
}
@media (max-width: 800px) {
  .summary {
    width: 95%;
    margin: 20px auto;
  }
}

form {
  /* width: 30vw; */
  /* min-width: 500px; */
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
}

.hidden {
  display: none;
}

#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

/* Buttons and links */
button {
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}

button:hover {
  filter: contrast(115%);
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}

.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.spinner:before,
.spinner:after {
  position: absolute;
  content: "";
}

.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}

.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}
.order_details {
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  margin: 20px 0;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}
</style>