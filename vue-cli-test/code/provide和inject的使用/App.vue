<template>
  <div>
    <h3>provide 与 inject</h3>
    <p>当前颜色：{{ color }}</p>
    <button @click="color = 'red'">红色</button>
    <button @click="color = 'yellow'">黄色</button>
    <button @click="color = 'green'">绿色</button>
    <hr />
    <Child></Child>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import Child from "./components/Child.vue";
export default defineComponent({
  components: {
    Child
  },
  setup() {
    const color = ref("red");
    // 提供数据
    provide("color", color);
    return {
      color
    };
  }
});
</script>

<style scoped>
</style>
