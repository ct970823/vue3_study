<template>
  <h3>子组件</h3>
  <hr />
  <GrandSon></GrandSon>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GrandSon from "./grandSon.vue";

export default defineComponent({
  components: {
    GrandSon
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
</style>
