<template>
  <div class="d-flex">
        <span class="rate-value">{{ rateValue.toFixed(1) }}</span>
        <div class="d-flex mx-1">
          <div :key="item" v-for="item in parseInt(rateValue)">
            <i class="fa fa-star star"></i>
          </div>
          <div v-show="rateValue%1!=0">
            <i class="fa-regular fa-star star" v-show="rateValue % 1 < .25"></i>
            <i class="fa fa-star-half-stroke star" v-show="rateValue % 1 > .25 && rateValue % 1 < .75"></i>
            <i class="fa fa-star star" v-show="rateValue % 1 > .75"></i>
          </div>
          <div :key="i+5" v-for="i in parseInt(5 - rateValue)">
            <i class="fa-regular fa-star star"></i>
          </div>
        </div>
        <span class="num-rate">({{ numberOfRate }})</span>
      </div>
</template>

<script>
export default {
props:{
  rateValue:Number,
  numberOfRate:Number,
}
}
</script>

<style>

.rate-value,
i.star {
  color: #e59819;
}

.rate-value {
  font-weight: 500;
  font-size: 15px;
  margin-top: 2px;
}
.num-rate{
  color: #656565;
  font-size: 12px;
  margin-top: 3px;
}

i.star {
  font-size: 12px;
}
</style>