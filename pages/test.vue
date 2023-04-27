<template>
  <div>
    <pre>
      {{ test }}
    </pre>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data(){
    return{
      test:''
    }
  },
  methods:{
    ...mapActions({
      sendRequest:'auth/sendRequest'
    }),

  },
  async mounted(){
      let result = await this.sendRequest({
        url:'/test',
        dataSend:{}
      })
      this.test = result.data.result;
  }
}
</script>

<style>

</style>