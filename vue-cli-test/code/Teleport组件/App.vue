<template>
  <h2>App父组件</h2>
  <Child></Child>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Child from "./components/Child.vue";
export default defineComponent({
  components: {
    Child
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
</style>
