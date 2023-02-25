<template>
  <div class="questions mx-3 mt-3 mb-5">
    <div v-show="!addNewQuestionPageVisible">
      <div class="d-flex justify-content-between mb-4">
        <h6 class="intro">
          All questions in this course <span class="textGray">(363)</span>
        </h6>
        <div class="">
          <select
            class=""
            v-model="myQuestionSelect"
            @change="selectMyQuestion()"
          >
            <option selected value="">All Question</option>
            <option class="" value="my">My Questions</option>
          </select>
        </div>
      </div>

      <div v-show="isSelectChanged" class="text-center">
        <h6 class="text-dark">
          Loading... <spinner-load :spinnerLoadShow="isSelectChanged" />
        </h6>
      </div>
      <!-- questions and answers -->
      <div v-show="!isSelectChanged" class="">
        <div class="" style="border:1px solid #aaa;">
          <div
            :key="question.id"
            v-for="question in previewQuestions"
            class="question py-3 mb-1"
          >
            <div>
              <div class="userImage">
                <img
                  class="avatar"
                  :src="`https://ui-avatars.com/api/?background=000&color=fff&name=${question.user.username}`"
                  alt="user"
                />
              </div>
              <div
                class="pointer questionContent"
                @click="toggleAnswers(question.id, question.AnswersCount)"
              >
                <h6 class="title">{{ question.title }}</h6>
                <p
                  :class="[
                    'description',
                    'textGray',
                    { ellipsis: questionAnswerShow != question.id },
                  ]"
                  v-html="question.description"
                ></p>
              </div>
              <div class="responsesIcon">
                <span
                  ><span style="font-size: 15px">{{
                    question.AnswersCount
                  }}</span>
                  <i class="fa-regular fa-message" style="font-size: 17px"></i>
                </span>
                <div class="textGray date mt-1">{{ question.created_at }}</div>
              </div>
              <div
                v-if="question.user.id == getToken().tokenable_id"
                class="editQuestion pointer"
                style="position: absolute; top: 2px; right: 7px"
              >
                <div class="dropdown">
                  <i
                    class="fa-solid fa-ellipsis-vertical"
                    data-bs-toggle="dropdown"
                  ></i>

                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        @click="showEditPage(question.id)"
                        >Edite</a
                      >
                    </li>
                    <li>
                      <a
                        @click="questionIdWantDelete = question.id"
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-show="showLoadingIn == question.id" class="text-center">
              <h6 class="">Loading...</h6>
            </div>
            <!-- answers div -->
            <div class="answers" v-show="questionAnswerShow == question.id">
              <div
                style="position: relative"
                v-show="currentAnswers.length > 0"
              >
                <span
                  class="badge text-dark"
                  style="position: absolute; top: -25px; left: -25px"
                  >Replies</span
                >
                <div :key="answer.id" v-for="answer in currentAnswers">
                  <div style="position: relative" class="answer">
                    <div class="answerUserImage">
                      <img
                        class="avatar"
                        :src="`https://ui-avatars.com/api/?background=2f2f35&color=fff&name=${answer.user.username}`"
                        alt="user"
                      />
                    </div>
                    <div class="answerContent">
                      <h6 class="" style="">{{ answer.user.first_name }}</h6>
                      <div class="textGray mb-3" v-html="answer.body"></div>
                    </div>
                    <div class="answerDate">
                      <div class="textGray date mt-1">
                        {{ answer.created_at }}
                      </div>
                    </div>
                    <div
                      v-if="answer.user.id == getToken().tokenable_id"
                      class="editQuestion pointer"
                      style="position: absolute; top: 2px; right: 7px"
                    >
                      <div class="dropdown">
                        <i
                          class="fa-solid fa-ellipsis-vertical"
                          data-bs-toggle="dropdown"
                        ></i>

                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              @click="showEditReplyBox(answer.id)"
                              >Edite</a
                            >
                          </li>
                          <li>
                            <a
                              @click="replyIdWantDelete = answer.id"
                              class="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal1"
                              >Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="answersBorder"></div>
              </div>
              <div class="add-reply">
                <div class="text-end my-3" v-show="!reply_box_shown">
                  <button
                    @click="reply_box_shown = !reply_box_shown"
                    class="btn btn-dark btn-sm"
                  >
                    Add Reply
                  </button>
                </div>
                <div v-show="reply_box_shown">
                  <text-editor v-model="reply_body" />
                  <div class="text-end my-3">
                    <button
                      @click="
                        reply_box_shown = !reply_box_shown;
                        reply_body = '';
                        editReplyModeOn = false;
                      "
                      class="btn btn-dark btn-sm"
                    >
                      Close
                    </button>
                    <button
                      v-show="editReplyModeOn"
                      @click="editThisReply()"
                      class="btn btn-success btn-sm"
                    >
                      Save changes
                      <spinner-load :spinnerLoadShow="spinnerLoadShow" />
                    </button>
                    <button
                      v-show="!editReplyModeOn"
                      @click="addReply()"
                      class="btn btn-success btn-sm"
                    >
                      Add reply
                      <spinner-load :spinnerLoadShow="spinnerLoadShow" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr
              style="
                position: absolute;
                bottom: -16px;
                left: 0;
                right: 0;
                color: #333;
              "
            />
          </div>
        </div>
        <div class="text-center" v-show="showMoreButtonVisisble">
          <button class="button" @click="pushToShownQuestionArray()">
            See More <spinner-load :spinnerLoadShow="spinnerLoadShow" />
          </button>
        </div>
        <h6
          class="mt-3 pointer"
          style="font-weight: 500"
          @click="addNewQuestionPageVisible = true"
        >
          Ask a new question
        </h6>
      </div>
    </div>

    <div class="sureDelete">
      <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="p-4">
              <h5>Please Confirm</h5>
              <p style="font-size: 15px" class="mt-3">
                Are you sure want to delete this question?
              </p>
              <div class="text-end">
                <button
                  style="font-weight: 600"
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  @click="deleteThisQuestion()"
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-dismiss="modal"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" id="myModal1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="p-4">
              <h5>Please Confirm</h5>
              <p style="font-size: 15px" class="mt-3">
                Are you sure want to delete this reply?
              </p>
              <div class="text-end">
                <button
                  style="font-weight: 600"
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  @click="deleteThisReply()"
                  type="button"
                  class="btn btn-dark btn-sm"
                  data-bs-dismiss="modal"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <!-- add new question page -->
      <div v-show="addNewQuestionPageVisible" class="newQuestionPage">
        <button @click="resetWhenBackToQuestions()" class="questionBackBtn">
          Back To Questions
        </button>
        <div class="my-4">
          <label>Title or summary</label>
          <input
            class="inputQuestionTitle mt-1"
            v-model="newQuestion.questionTitle"
            type="text"
            placeholder="e.g.Why this error shown in this part of code?"
          />
        </div>
        <div class="mb-4">
          <label class="mb-1">Details(optional)</label>
          <text-editor v-model="newQuestion.questionDetails" />
        </div>
        <div v-show="!editeQuestionModeOn">
          <button
            id=""
            class="publishBtn"
            @click="publishNewQuestion()"
            :disabled="newQuestion.questionTitle == ''"
          >
            Publish <spinner-load :spinnerLoadShow="spinnerLoadShow" />
          </button>
        </div>
        <div v-show="editeQuestionModeOn">
          <button
            id=""
            class="publishBtn"
            @click="editQuestion()"
            :disabled="newQuestion.questionTitle == ''"
          >
            Save changes <spinner-load :spinnerLoadShow="spinnerLoadShow" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      myQuestionSelect: "",
      questions: null,
      shownQuestions: [],
      previewQuestions: [],
      currentAnswers: [],
      questionAnswerShow: 0,
      showLoadingIn: null,
      showMoreAmount: 2,
      showMoreButtonVisisble: true,
      addNewQuestionPageVisible: false,
      newQuestion: {
        questionTitle: "",
        questionDetails: "",
      },
      spinnerLoadShow: false,
      currentUserId: null,
      sureBeforeDeleteVisible: false,
      questionIdWantDelete: -1,
      questionIdWantEdit: -1,
      replyIdWantDelete: -1,
      replyIdWantEdit: -1,
      editeQuestionModeOn: false,
      editReplyModeOn: false,
      reply_box_shown: false,
      reply_body: "",
      isSelectChanged: false,
    };
  },
  props:{
    courseId:Number
  },
  methods: {
    ...mapActions({
      sendRequest: "auth/sendRequest",
    }),
    ...mapGetters({
      getToken: "auth/getToken",
    }),
    async getCourseQuestions() {
      let result = await this.sendRequest({
        url: "/course/getQuestions",
        dataSend: {
          course_id: this.courseId,
        },
      });
      if (result.data.status) {
        this.questions = result.data.questions;
        this.pushToShownQuestionArray();
      }
      console.log(result.data);
    },
    async getQuestionAnswers(id) {
      let result = await this.sendRequest({
        url: "/course/getAnswers",
        dataSend: {
          question_id: id,
        },
      });
      if (result.data.status) {
        this.currentAnswers = result.data.answers;
      }
      console.log(result.data);
    },
    async toggleAnswers(id, numAnswers) {
      this.reply_box_shown = false;
      this.reply_body = "";
      if (this.questionAnswerShow != id) {
        if (numAnswers > 0) {
          this.showLoadingIn = id;
          await this.getQuestionAnswers(id);
          this.showLoadingIn = null;
        } else this.currentAnswers = [];
        this.questionAnswerShow = id;
      } else {
        this.questionAnswerShow = -1;
      }

      // let answersDom =
      //   event.target.parentElement.parentElement.parentElement
      //     .nextElementSibling;
      // if(answersDom.style.display == "none"){

      //   answersDom.style.display = "block";
      // }
      // answersDom.style.display =
      //    ? "none" : "block";
    },
    pushToShownQuestionArray() {
      this.spinnerLoadShow = true;
      let startIndex = this.shownQuestions.length;
      for (let i = 0; i < this.showMoreAmount; i++) {
        if (this.shownQuestions.length < this.questions.length) {
          this.shownQuestions.push(this.questions[startIndex + i]);
        } else {
          this.showMoreButtonVisisble = false;
          break;
        }
      }
      if (this.shownQuestions.length == this.questions.length)
        this.showMoreButtonVisisble = false;
      this.spinnerLoadShow = false;
    },
    async publishNewQuestion() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/course/addQuestionCourse",
        dataSend: {
          course_id: this.courseId,
          token: this.getToken(),
          title: this.newQuestion.questionTitle,
          description: this.newQuestion.questionDetails,
        },
      });

      this.spinnerLoadShow = false;

      console.log(result.data);
      if (result.data.status) {
        this.shownQuestions.unshift(result.data.question);
        this.questions.unshift(result.data.question);
        if (this.myQuestionSelect == "my")
          this.previewQuestions.unshift(result.data.question);
        this.$toast.show({
          type: "success",
          title: "success",
          message: "Add new question successfully",
        });
        this.addNewQuestionPageVisible = false;
        this.newQuestion.questionTitle = "";
        this.newQuestion.questionDetails = "";
      }
    },
    async deleteThisQuestion() {
      let result = await this.sendRequest({
        url: "/course/deleteQuestionCourse",
        dataSend: {
          token: this.getToken(),
          question_id: this.questionIdWantDelete,
        },
      });
      if (result.data.status) {
        this.$toast.show({
          type: "success",
          title: "success",
          message: "Delete question successfully",
        });
        this.questions = this.questions.filter((value) => {
          return value.id != this.questionIdWantDelete;
        });
        this.shownQuestions = this.shownQuestions.filter((value) => {
          return value.id != this.questionIdWantDelete;
        });
        if (this.myQuestionSelect == "my")
          this.previewQuestions = this.previewQuestions.filter((value) => {
            return value.id != this.questionIdWantDelete;
          });
        else
          this.previewQuestions = this.shownQuestions;
      } else {
        this.$toast.show({
          type: "danger",
          title: "failed",
          message: "something error happen try again",
        });
      }
    },
    showEditPage(questionId) {
      this.questionIdWantEdit = questionId;
      this.editeQuestionModeOn = true;
      let question = this.shownQuestions.find((value) => {
        return value.id == questionId;
      });
      this.newQuestion.questionTitle = question.title;
      this.newQuestion.questionDetails = question.description ?? "";
      this.addNewQuestionPageVisible = true;
    },
    async editQuestion() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/course/editQuestionCourse",
        dataSend: {
          question_id: this.questionIdWantEdit,
          token: this.getToken(),
          title: this.newQuestion.questionTitle,
          description: this.newQuestion.questionDetails,
        },
      });

      this.spinnerLoadShow = false;

      console.log(result.data);
      if (result.data.status) {
        let q1 = this.questions.find((value) => {
          return value.id == this.questionIdWantEdit;
        });
        q1.title = result.data.question.title;
        q1.description = result.data.question.description;
        console.log(q1 + "q1");
        this.$toast.show({
          type: "success",
          title: "success",
          message: "Edit question successfully",
        });
        this.resetWhenBackToQuestions();
      }
    },
    resetWhenBackToQuestions() {
      this.addNewQuestionPageVisible = false;
      this.editeQuestionModeOn = false;
      this.newQuestion.questionTitle = "";
      this.newQuestion.questionDetails = "";
    },
    async addReply() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/course/addQuestionReply",
        dataSend: {
          question_id: this.questionAnswerShow,
          token: this.getToken(),
          body: this.reply_body,
        },
      });
      this.spinnerLoadShow = false;
      if (result.data.status) {
        this.reply_box_shown = false;
        this.reply_body = "";
        this.currentAnswers.push(result.data.answer);
        this.resetQuestionAnswerCount();
      } else {
        this.$toast.show({
          type: "danger",
          title: "failed",
          message: "something wrong happen",
        });
      }
    },
    async deleteThisReply() {
      let result = await this.sendRequest({
        url: "/course/deleteCourseReply",
        dataSend: {
          token: this.getToken(),
          answer_id: this.replyIdWantDelete,
        },
      });
      if (result.data.status) {
        this.currentAnswers = this.currentAnswers.filter((value) => {
          return value.id != this.replyIdWantDelete;
        });
        this.resetQuestionAnswerCount();
      } else {
        this.$toast.show({
          type: "danger",
          title: "failed",
          message: "something wrong happen",
        });
      }
    },
    async editThisReply() {
      this.spinnerLoadShow = true;
      let result = await this.sendRequest({
        url: "/course/editCourseReply",
        dataSend: {
          token: this.getToken(),
          body: this.reply_body,
          answer_id: this.replyIdWantEdit,
        },
      });
      this.spinnerLoadShow = false;

      if (result.data.status) {
        let reply = this.currentAnswers.find((value) => {
          return value.id == this.replyIdWantEdit;
        });
        reply.body = this.reply_body;
        this.reply_box_shown = false;
        this.editReplyModeOn = false;
        this.replyIdWantEdit = -1;
        this.reply_body = "";
      }
    },
    showEditReplyBox(reply_id) {
      this.reply_box_shown = true;
      this.editReplyModeOn = true;
      this.replyIdWantEdit = reply_id;
      let reply = this.currentAnswers.find((value) => {
        return value.id == reply_id;
      });
      this.reply_body = reply.body;
    },
    resetQuestionAnswerCount() {
      let qu = this.shownQuestions.find((value) => {
        return value.id == this.questionAnswerShow;
      });
      qu.AnswersCount = this.currentAnswers.length;
    },
    selectMyQuestion() {
      this.isSelectChanged = true;
      setTimeout(() => {
        console.log("ggg");
        if (this.myQuestionSelect == "my") {
          this.previewQuestions = this.questions.filter((question) => {
            return question.user_id == this.getToken().tokenable_id;
          });
          this.showMoreButtonVisisble = false;
        } else {
          this.previewQuestions = this.shownQuestions;
          if (this.shownQuestions.length < this.questions.length) {
            this.showMoreButtonVisisble = true;
          }
        }
      }, 100);

      setTimeout(() => {
        this.isSelectChanged = false;
      }, 100);
    },
  },
  async mounted() {
    await this.getCourseQuestions();
    this.previewQuestions = this.shownQuestions;
  },
};
</script>

<style scoped>
.questions {
  min-height: 300px;
}
.pointer {
  cursor: pointer;
}

select {
  border: 1px solid black;
  font-size: 15px;
  padding: 2px;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.ellipsis ::v-deep figure {
  display: none;
}
.description ::v-deep p {
  margin-bottom: 0 !important;
}

.description .image {
  width: 100px !important;
}
.textGray {
  color: #535353;
}
.question {
  position: relative;
  /* border: 1px solid #ccc; */
  background: #fff;
  /* box-shadow: 1px 1px 2px gray; */
  margin-bottom: 0 !important;
  padding: 0 55px;
}

.questionContent h6 {
  /* font-size: 15px; */
  font-weight: 450;
}
.questionContent p {
  width: 90%;
  font-size: 15.5px;
}
.date {
  font-size: 11px;
  font-weight: 600;
}
.userImage {
  position: absolute;
  top: 12px;
  left: 7px;
}
.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
}
.responsesIcon {
  position: absolute;
  top: 20px;
  right: 7px;
}

.answerUserImage {
  position: absolute;
  top: 7px;
  left: 7px;
}
.answerDate {
  position: absolute;
  top: 15px;
  right: 25px;
}
.answerContent {
  padding-left: 50px;
  padding-top: 10px;
  width: 86%;
  /* font-size: 15px; */
}
.answer {
  background: white;
  border: 1px solid #999;
  border-radius: 0 10px 10px 10px;
  padding: 2px;
  margin-bottom: 4px;
}
.answers {
  position: relative;
  margin-top: 40px;
}
.answersBorder {
  background: black;
  position: absolute;
  left: -15px;
  top: 0;
  height: 100%;
  width: 2px;
  border: 1px solid black;
}

.button {
  border: 1px solid #000;
  padding: 4px 10px;
  width: 100%;
  margin-top: 20px;
  transition: all 0.25s;
  font-size: 18px;
  font-weight: 400;
}
.button:hover {
  background: black;
  color: white;
}

.newQuestionPage {
  width: 90%;
  margin: auto;
}
.inputQuestionTitle {
  border: 1px solid black;
  width: 100%;
  padding: 4px 8px;
}
.inputQuestionTitle::placeholder {
  font-size: 14px;
  font-weight: 400;
}
.questionBackBtn {
  border: 1px solid black;
  padding: 6px 10px;
  font-weight: 600;
}
label {
  font-weight: 600;
  font-size: 14.5px;
}
.publishBtn {
  width: 100%;
  background: black;
  color: white;
  font-weight: 600;
  padding: 7px 0;
}
.publishBtn:disabled {
  background: #ddd;
}
.publishBtn:disabled:hover {
  cursor: not-allowed;
}
.dropdown-menu {
  transform: translate(0, 0) !important;
  left: -150px !important;
  top: 19px !important;
}
</style>