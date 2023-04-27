<template>
  <div style="display: inline-block;position: relative;" class="dropdown">
    <i class="fa-solid fa-cart-shopping pointer p-1 cartIcon dropdown-toggle " id="dropdownCart"
      data-bs-toggle="dropdown">
      <span v-if="items.length > 0">{{ items.length }}</span>
    </i>
    <div class="itemsCart dropdown-menu" aria-labelledby="dropdownCart">
      <div class="items" v-for="item in items" :key="item.id">
        <div class="item d-flex" @click="$router.push({
          name: 'course-detail_course-slug', params: { slug: item.slug },
        })">
          <div class="imageHoder">
            <img :src="'http://127.0.0.1:8000/uploads/images/org/courses/' + item.image" alt="">
          </div>
          <div class="itemInfo ">
            <p class="itemName">{{ item.name }}</p>
            <p class="item-author">by <a href="">{{ item.orgName }}</a> </p>
            <p style="margin-bottom: 2px !important;">${{ item.price }}</p>
          </div>
          <hr>
        </div>
      </div>

      <p v-if="items.length > 0" class="totalPrice">Total : ${{ totalItemPrice }}</p>
      <button v-if="items.length > 0" @click="goToCart()" class="goToCart">go to cart</button>
      <div v-if="items.length == 0" style="text-align: center;">
        <p class="emptyCourse">no course in cart</p>
        <button  class="goToCart" @click="$router.push({ name: 'index' })">Browse Courses Now</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {

  props: {
    items: Array,
    totalItemPrice: Number
  },
  methods: {
    goToCart() {
      this.$router.push({
        name: "user-cart",
      });
    }
  }
}
</script>

<style >
.fa-cart-shopping {
  font-size: 19px;
}

.itemsCart {
  max-width: 280px !important;
  min-width: 280px !important;
  position: absolute !important;
  right: -100px !important;
  top: 12px !important;
  background: white;
  border: 1px solid #777;
  z-index: 2;
  border-radius: 0px;
  overflow: hidden;
}

.dropdown-toggle::after {
  display: none !important;
  margin-left: 0.255em;
  vertical-align: 0.255em;
}

.itemsCart .item {
  margin: 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
}

.cartIcon {
  position: relative;
}

.cartIcon span {
  font-size: 14px;
  font-weight: 400;
  background: #a435f0;
  color: white;
  padding: 5px 7px 2px;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  right: -10px;
}

.imageHoder {
  max-width: 60px;
  max-height: 60px;
  min-width: 60px;
  min-height: 60px;
}

.imageHoder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.itemInfo {
  text-align: left;
  margin: 0 5px;
}

.itemInfo p.itemName {
  color: #1c1d1f;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 3px;
}

.itemInfo .item-author {
  font-weight: 600;
  color: #6a6f73 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
  margin-bottom: 3px;
}

.itemInfo p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-size: 15px;
  font-weight: 700;
}

.item-author a {
  color: #6a6f73;
}

.goToCart {
  width: 92%;
  margin: 10px;
  background: #1c1d1f;
  padding: 10px;
  color: white;
  font-weight: 700;
  font-size: 17px;
}

.totalPrice {
  text-align: left;
  font-weight: 700;
  font-size: 21px;
  margin-left: 15px;
  margin-bottom: 0;
}

.emptyCourse{
  font-size: 18px;
  font-weight: 700;
  margin: auto;
  /* margin-left: 25px; */
}

@media (max-width:992px) {
  .itemsCart {
    right: -17px !important;
  }
}

@media (max-width:576px) {
  .itemsCart {
    right: -10px;
  }
}</style>