<template>
  <div>
    <h3>v-model</h3>

    <button @click="openVisible = true">显示数据</button>
    <Child v-model:show="openVisible"></Child>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Child from "./components/child.vue";
export default defineComponent({
  components: {
    Child
  },
  setup() {
    const openVisible = ref(false);
    return {
      openVisible
    };
  }
});
</script>

<style scoped>
</style>
