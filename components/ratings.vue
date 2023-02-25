<template>
  <div class="comments mt-4">

    <div v-show="numberRating > 0" class=" users-comments ">
      <!-- <div v-show="numberRating==0">
        <p>The course has not been evaluated yet</p>
      </div> -->
      <div class="px-3 pt-3" style="font-size: 23px;font-weight: 700;">
        <i style="color: #f98f05;" class=" fa-solid fa-star"></i>
        <span>{{ ' '+avargRating + ' ' }}course rating ,{{ ' '+ numberRating }} ratings</span>
      </div>
      <div class="mt-3 row">
        <div v-show="Ratings.indexOf(rating) < 4" v-for="rating in Ratings" :key="rating.id" class="col-lg-6 col-12 "
          style="padding-left: 30px;padding-right: 15px;">
          <div class="d-flex">
            <div class="col-2 ">
              <img width="45px" height="45px" class="avatar " style="margin-top: 10px;"
                :src="'https://ui-avatars.com/api/?background=2f2f35&color=fff&name=' + rating.first_name" alt="user" />
            </div>
            <div class="col-10">
              <h5>{{ rating.first_name + ' ' + rating.last_name }} </h5>
              <div class="user-rate" style="color: #f98f05;">
                <i :class="['fa fa-star', { 'fa-solid': rating.rate >= 1 }, { 'fa-regular': rating.rate < 1 }]"></i>
                <i :class="['fa fa-star', { 'fa-solid': rating.rate >= 2 }, { 'fa-regular': rating.rate < 2 }]"></i>
                <i :class="['fa fa-star', { 'fa-solid': rating.rate >= 3 }, { 'fa-regular': rating.rate < 3 }]"></i>
                <i :class="['fa fa-star', { 'fa-solid': rating.rate >= 4 }, { 'fa-regular': rating.rate < 4 }]"></i>
                <i :class="['fa fa-star', { 'fa-solid': rating.rate >= 5 }, { 'fa-regular': rating.rate < 5 }]"></i>

                <span class="comment-time">a month ago</span>
              </div>
            </div>
          </div>
          <div class="comment-body">
            <p>{{ rating.comment }}</p>
          </div>
        </div>
      </div>
      <div v-show="numberRating > 5" class="py-4 mx-3">
        <button @click="getRatings()" data-bs-toggle="modal" data-bs-target="#showRatings" class="reviews">Show
          all reviews</button>
      </div>
      <!-- The Modal Show Ratings -->
      <div class="modal fade" id="showRatings">
        <div class="modal-dialog modal-lg mt-0">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="px-3 pt-3" style="font-size: 23px;font-weight: 700;">
                <i style="color: #f98f05;" class=" fa-solid fa-star"></i>
                <span>{{ ' '+avargRating + ' ' }}course rating ,{{ ' '+ numberRating }} ratings</span>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body" style="">
              <div v-for="rating in Ratings" :key="rating.id" class="col-lg-6 col-12 "
                style="width: 100% !important;padding-left: 30px;padding-right: 15px;">
                <div class="d-flex">
                  <div class="col-lg-1 col-2">
                    <img width="45px" height="45px" class="avatar " style="margin-top: 10px;"
                      :src="'https://ui-avatars.com/api/?background=2f2f35&color=fff&name=' + rating.first_name"
                      alt="user" />
                  </div>
                  <div class="col-lg-11 col-10">
                    <h5>{{
                      rating.first_name + ' ' + rating.last_name + ' id: ' + rating.id + ' ratr: ' +
                        rating.rate
                    }}
                    </h5>
                    <div class="user-rate" style="color : #f98f05">
                      <i
                        :class="['fa fa-star', { 'fa-solid': rating.rate >= 1 }, { 'fa-regular': rating.rate < 1 }]"></i>
                      <i
                        :class="['fa fa-star', { 'fa-solid': rating.rate >= 2 }, { 'fa-regular': rating.rate < 2 }]"></i>
                      <i
                        :class="['fa fa-star', { 'fa-solid': rating.rate >= 3 }, { 'fa-regular': rating.rate < 3 }]"></i>
                      <i
                        :class="['fa fa-star', { 'fa-solid': rating.rate >= 4 }, { 'fa-regular': rating.rate < 4 }]"></i>
                      <i
                        :class="['fa fa-star', { 'fa-solid': rating.rate >= 5 }, { 'fa-regular': rating.rate < 5 }]"></i>
                      <span class="comment-time">a month ago</span>
                    </div>
                  </div>

                </div>
                <div class="comment-body">
                  <!-- <p>{{ rating.comment }}</p> -->
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt reiciendis dolores quas
                    rerum corporis accusamus illum tenetur eius dignissimos maxime nam molestiae officia,
                    temporibus repudiandae voluptates molestias a laudantium doloribus.</p>
                </div>
                <hr>
              </div>
              <div v-show="numberRating > Ratings.length" class="py-4" style="text-align: center;">
                <button @click="getRatings()" class="reviews">Show all reviews</button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- ********************* -->
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props:{
    avargRating:Number,
    numberRating:Number
  },
  data() {
    return {
      Ratings: [],
    }
  },
  methods: {
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    async getRatings() {
      let result = await this.sendRequest({
        url: '/getRatesCourse',
        dataSend: {
          course_slug: this.$route.params.slug,
          offset: this.Ratings.length
        }
      });

      if (result.data.status) {
        result.data.ratings.forEach(rating => {
          console.log(rating);
          this.Ratings.push(rating)
        })
      }
    }
  },
  async mounted() {
    await this.getRatings();
  },
}
</script>

<style>
.rating-star-rating {
  position: absolute;
  top: 0;
  left: 1px;
  /* width: 80%; */
  overflow: hidden;
  white-space: nowrap;
  unicode-bidi: bidi-override;
}

.rate span,
.rate i {
  font-size: 24px;
  margin-left: 5px;
  color: #2f2f35;
}

.avatar {
  border-radius: 50%;
}

h5 {
  margin-top: 10px;
  font-weight: bold;
  color: #2f2f35;
}

.user-rate {
  margin-bottom: 10px;
  margin-top: 10px;
}

.user-rate i {
  font-size: 14px;
  width: 12px;
  height: 12px;
}

.comment-time {
  margin: 15px;
  color: #6a6f73;
}

.users-comments {
  border: 1px solid #e0e4e6;
  /* padding: 25px 15px; */
}

.reviews {
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #212a39;
}

.reviews:hover {
  background: #eff5f7;
}

i{

}

</style>