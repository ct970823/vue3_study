<template>
  <h2>App父组件：Suspense组件的使用</h2>
  <Suspense>
    <template #default>
      <!-- 异步组件 -->
      <Child></Child>
    </template>
    <template v-slot:fallback>
      <!-- loading内容 -->
      <h3>loading...</h3>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//  引入组件，静态引入和动态引入
// Vue2中动态引入写法(在Vue3中这种写法不行)
// const Child = () => import("./components/Child.vue");
// Vue3中动态引入组件的写法
// const Child = defineAsyncComponent(() => import("./components/Child.vue"));
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
