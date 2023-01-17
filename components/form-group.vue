<template>
  <div class="form-group my-4">
    <label for="">{{ label }}:</label>
    <input
      :type="type"
      class="form-control p-2"
      :id="id"
      :placeholder="placeholder"
      :name="name"
      style="
        border: 1px black solid;
        border-radius: 0;
        box-shadow: none !important;
        height: 45px;
      "
      v-model="data1"
      v-on:change="dataChange"
      value="value"
      :disabled="action === 'Show'"
    />
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    id: String,
    label: String,
    placeholder: String,
    type: String,
    value: String,
    action: String,
  },
  data() {
    return {
      data1: this.value,
    };
  },
  methods: {
    dataChange() {
      this.$emit("change_data", this.data1, this.name);
    },
  },
};
</script>

<style>
</style>
