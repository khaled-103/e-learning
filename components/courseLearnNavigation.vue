<template>
  <div class="pt-4 px-4">
    <div class="sections-header">
      <div class="d-flex justify-content-start">
        <h6
          :class="[
            'section-header d-lg-none d-block',
            'pb-2',
            'px-3',
            'pointer',
            { active: hasActiveClass[0] },
          ]"
          @click="changeSectionShow(0)"
        >
          Course Content
        </h6>
        <h6
          :class="[
            'section-header',
            'pb-2',
            'px-3',
            'pointer',
            { active: hasActiveClass[1] },
          ]"
          @click="changeSectionShow(1)"
        >
          Overview
        </h6>
        <h6
          :class="[
            'section-header',
            'pb-2',
            'px-3',
            'pointer',
            { active: hasActiveClass[2] },
          ]"
          @click="changeSectionShow(2)"
        >
          Q/A
        </h6>
        <h6
          :class="[
            'section-header',
            'pb-2',
            'px-3',
            'pointer',
            { active: hasActiveClass[3] },
          ]"
          @click="changeSectionShow(3)"
        >
          Reviews
        </h6>
      </div>
      <hr/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinnerLoadShow: false,
      sectionShowed: 1,
      hasActiveClass: [false, true, false, false],
    };
  },
  props: {
    sections: null,
  },
  methods: {
    changeSectionShow(sectionNumber) {
      this.sectionShowed = sectionNumber;
      this.alertActiveClasse(sectionNumber);
      this.$emit('emitSectionShow',this.sectionShowed);
    },
    alertActiveClasse(sectionNumber) {
      this.hasActiveClass = [false, false, false];
      this.hasActiveClass[sectionNumber] = true;
    },
  },
  mounted(){
    window.addEventListener('resize',()=>{
      if(window.innerWidth > 992){
        if(this.sectionShowed == 0)
          this.changeSectionShow(1);
      }
    });
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.sections-header {
  position: relative;
}

hr {
  position: absolute;
  bottom: -8px;
  color: black;
  width: 100%;
}
.section-header {
  /* color: #687484; */
  color: #555;
  font-size: 14px;
  text-align: center;
  font-weight: 700;
}
.section-header:hover {
  border-bottom: 2px solid black;
  color: black;
}
.active {
  color: black;
  border-bottom: 2px solid black;
}
</style>