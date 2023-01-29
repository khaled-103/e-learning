<template>
  <div class="px-3 py-3">
    <div v-show="courseStatus != 'publish'" class="p-3 holder">
      <div class="messages"><i class="fa-regular fa-circle-check mx-1"></i> This Course Not Published Yet</div>
      <div class="messages my-2">
        <i class="fa-regular fa-circle-check mx-1"></i> If Your Course Ready to Publish Click Publish Button
      </div>
      <div class="text-end">
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          Publish
        </button>
      </div>

      <!-- The Modal -->
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Publishing Course</h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">Are You Sure need Publish Course?</div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="publish('publish')"
              >
                Publish Now
              </button>
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="courseStatus == 'publish'" class="holder p-3">
      <div class="messages"><i class="fa-regular fa-circle-check mx-1"></i> This course is currently published</div>
      <div class="messages my-2"><i class="fa-regular fa-circle-check mx-1"></i> If You Need To Cancel Click Cancel Button</div>
      <div class="messages"><i class="fa-regular fa-circle-check mx-1"></i> You Can Republish It At Any time you need</div>
      <div class="text-end">
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#myModal1"
        >
          Cancel Publish
        </button>
      </div>
      <div class="modal" id="myModal1">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Cancel Publishing Course</h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              Are You Sure need to Cancel Publishing Course?
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="publish('not publish')"
              >
                Cancel Now
              </button>
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    courseStatus: null,
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    async publish(status) {
      let result = await this.sendRequest({
        url: "/orgnaization/changeCourseStatus",
        dataSend: {
          token: this.getToken(),
          course_id: this.$route.params.id,
          courseStatus: status,
        },
      });
      if (result.data.status) {
        this.$emit("changeStatus", status);
        this.$toast.show({
          type: "success",
          title: "success",
          message:
            status == "publish"
              ? "You Course currently published"
              : "Cancel publishing successfully",
        });
      } else {
        this.$toast.show({
          type: "danger",
          title: "failed",
          message: "Something wrong try again !",
        });
      }
    },
  },
};
</script>

<style scoped>
.holder{
  border-radius: 20px;
  /* background: #30305f; */
  /* box-shadow: 1px 1px 3px #30305f; */
}
.messages{
  color: #fff;
}
</style>