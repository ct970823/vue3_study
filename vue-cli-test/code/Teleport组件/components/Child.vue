<template>
  <h3>子组件</h3>
  <hr />
  <button @click="modalOpen = true">打开对话框</button>
  <!-- Teleport 提供了一种干净的方法, 让组件的html在父组件界面外的特定标签(很可能是body)下插入显示 -->
  <Teleport to="body">
    <!-- 对话框 -->
    <div v-if="modalOpen">
      <div>这是一个对话框</div>
      <button @click="modalOpen = false">关闭对话框</button>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const modalOpen = ref(false);
    return {
      modalOpen
    };
  }
});
</script>

<style scoped>
</style>
