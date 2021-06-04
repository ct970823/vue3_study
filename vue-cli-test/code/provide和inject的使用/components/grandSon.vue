<template>
  <h3 :style="{ color }">孙子组件</h3>
  <hr />
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const color = inject("color");
    return {
      color
    };
  }
});
</script>

<style scoped>
</style>