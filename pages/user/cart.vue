<template>
  <div class="cart">
    <page-loading-spinner v-if="!resultReady" />

    <div v-else class="d-flex mb-5">

      <div class="cart-items" style="flex-grow: 2;">
        <div v-if="items.length > 0" class="cart-paymant-responsve my-4 d-lg-none d-block">
          <p class="total-lable">Total:</p>
          <h3 class="totla-price">${{ total }}</h3>
          <p v-if="discounts > 0" style="text-decoration: line-through;color:#6a6f73">
            ${{ discounts }}</p>
          <p v-if="discounts > 0">{{ (discounts / originalPrice * 100).toFixed(0) }}% off</p>
          <button @click="checkOut()">checkout</button>
        </div>
        <h2 class="d-lg-block d-none">Shopping Cart</h2>
        <p v-if="items.length == 0" style="font-size: 22px;font-weight: 700;margin-top: 30px;">
          There are no courses inside the card</p>
        <div v-if="items.length == 0" style="text-align: center;">
          <button class="browse-courses" @click="$router.push({ name: 'index' })">Browse Courses Now</button>
          <div class="imageEmpty">
            <img src="@/assets/home/empty.png" alt="">
          </div>
        </div>
        <div v-if="items.length > 0">
          <div class="d-flex justify-content-between">
            <span>{{ items.length }} Courses in Cart</span>
            <span class="removeAll" @click="removeAll()">remove all</span>
          </div>
          <div v-for="item in items" :key="item.id" class="cart-item ">
            <hr>
            <div class="course d-flex">
              <div class="d-flex ponter" style="width: 80%;" @click="goToCourseDetails(item.slug)">
                <div class="imageHolder">
                  <img :src="'http://127.0.0.1:8000/uploads/images/org/courses/' + item.image" alt />
                </div>
                <div class="course-info mx-1 mx-md-3">
                  <h5 class="course-name"> {{ item.name }} </h5>
                  <p class="course-author text-dark">by <a href="">{{ item.orgName }}</a> </p>
                  <stars :numberOfRate="item.numOfRate" :rateValue="item.range_rate" />
                  <p class="course-content">
                    1hore , 23 lectures , {{ item.level }}
                  </p>
                </div>
              </div>
              <p class="removeItem p-1 ponter" @click="removeItem(item.id)">remove</p>
              <div class="price p-1">
                <p class="course-price">
                  ${{ item.price }}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div v-if="items.length > 0" class="cart-paymant col-lg-4 d-lg-block d-none ">
        <div class="summary">
          <h6>Summary</h6>
          <div class="d-flex justify-content-between mb-1">
            <span>Original Price:</span>
            <span>${{ originalPrice }}</span>
          </div>
          <div v-if="discounts > 0" class="d-flex justify-content-between">
            <span>Discounts:</span>
            <span>${{ discounts }}</span>
          </div>
          <hr class="my-2">
          <div class="d-flex justify-content-between total">
            <span>Total:</span>
            <span>${{ total }}</span>
          </div>
          <button @click="checkOut()">checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import stars from "@/components/homePage/stars.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: 'homePageLayout',

  data() {
    return {
      originalPrice: 0,
      discounts: 0,
      total: 0,
      items: [],
      resultReady:false
    }
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
      removeItemCart: 'cart/removeItemCart',
      calculatePriceCart:'cart/calculatePriceCart',
      removeAllItemCart:'cart/removeAllItemCart'
    }),
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    goToCourseDetails(slug) {
      this.$router.push({
        name: "course-detail_course-slug",
        params: { slug: slug },
      });
    },
    async getItemsCart() {
      let items = await this.sendRequest({
        url: '/getItemsCart',
        dataSend: {
          user_id: this.getToken().tokenable_id,
        }
      });

      if (items.data.status) {
        this.items = items.data.itemsCart
        this.calculatePrice();
      }
      this.resultReady = true;

    },
    async removeItem(CourseId) {
      let result = await this.sendRequest({
        url: '/removeCourseFromCart',
        dataSend: {
          user_id: this.getToken().tokenable_id,
          course_id: CourseId
        }
      });
      if (result.data.status) {
        this.removeItemCart(CourseId);
        this.items.forEach(item => {
          if (item.id == CourseId) {
            this.items.splice(this.items.indexOf(item), 1);
            this.calculatePriceCart();

          }
        });
        this.calculatePrice()
      }
    },
    async removeAll() {
      let result = await this.sendRequest({
        url: '/removeAllItemsFromCart',
        dataSend: {
          user_id: this.getToken().tokenable_id,
        }
      });
      if (result.data.status) {
        this.items=[];
        this.removeAllItemCart();
        this.total=0;

      }
    },
    calculatePrice() {
      this.originalPrice = 0;
      this.discounts = 0;
      this.total = 0;
      this.items.forEach(item => {
        this.originalPrice += item.price;
        this.total += item.price - item.price * item.discount
      });
      this.discounts = this.originalPrice - this.total;
    },
    async checkOut(){
      let result = await this.sendRequest({
        url: "/cartCheckOut",
        dataSend: {
          user_id: this.getToken().tokenable_id,
          orderItems: this.items,
          totalPrice: this.total,
          basicPrice: this.originalPrice,
          discount: this.discounts,
        },
      });
      if (result.data.status) {
        return this.$router.push({
          name: "payments-course-orderId",
          params:{
            orderId:result.data.orderId
          }
        });
      }
    }
  },
  mounted() {
    let interval = setInterval(() => {
      if (this.getToken()) {
        this.getItemsCart();
        clearInterval(interval);
      }
    }, 100);
  }
}
</script>

<style scoped>
body {
  margin: 0 !important;
  padding: 0 !important;
}

.ponter {
  cursor: pointer;
}

.cart-paymant-responsve p {
  margin: 0;
}

.cart-paymant-responsve .total-lable {
  color: #6a6f73;
  font-size: 17px;
  font-weight: 700;

}

.imageEmpty {
  width: 50%;
  height: 280px;
  margin-left: 20%
}

.imageEmpty img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

button.browse-courses {
  min-width: 200px;
  width: 25%;
  margin-bottom: 20px;
  /* margin: auto; */
}

.cart-paymant-responsve .totla-price {
  font-weight: 700;
  font-size: 32px;
}

.cart {
  padding: 0 0 0 50px;
  /* z-index: -100; */
  /* position: relative; */
}

.cart-items {
  padding-right: 15px;
}

h2 {
  font-size: 36px;
  font-weight: bolder;
  margin: 35px 0;
}

.imageHolder {
  max-width: 122px;
  min-width: 122px;
  max-height: 70px;
  min-height: 70px;

}

.imageHolder img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.course-info {
  flex-grow: 2;
}

.course-info .course-name {
  font-size: 16px;
  margin-top: 0;
}

.removeItem {
  margin-right: 6%;
  z-index: 5;
  color: #a435f0;
  height: 25px;
  /* padding-bottom: 8px !important; */
}
.removeAll{
  color: #a435f0;
  cursor: pointer;
  margin: 0 20px;
}

.course-info .course-subTitle {
  font-size: 13.5px;
  color: #1c1d1f;
  width: 95%;
  margin-bottom: 5px !important;
}

.course-info .course-author,
.course-info .course-content {
  font-size: 12.5px;
  color: #6a6f73;
  margin-bottom: 0;
}

.price p.course-price {
  color: #1c1d1f;
  font-size: 17px;
  font-weight: 600;
}

.price p.course-price {
  color: #1c1d1f;
  font-size: 17px;
  font-weight: 600;
  margin-right: 20px;
}

.cart-paymant {
  background: #f7f9fa;
  /* z-index: 0; */
  padding: 0;
  height: 90.5vh;
}

.summary {
  max-width: 300px;
  padding: 0 0 25px 25px;
  margin-top: 90px;
}

.summary span {
  font-size: 14px;
  color: rgb(0, 0, 0);
}

.summary h6 {
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 20px;
}

button {
  width: 100%;
  height: 50px;
  color: white;
  background: #a435f0;
  margin-top: 20px;
}

.total {
  font-weight: 600;
}

.total span {
  font-size: 16px;
}

@media (max-width : 992px) {
  .cart {
    padding: 0 0 0 15px;
  }
}

@media (max-width : 576px) {
  .removeItem {
    margin-right: 2%;
  }
}</style>