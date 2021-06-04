<template>
  <div>
    <h3>CustomRef的使用</h3>
    <input type="text" v-model="keyword" />
    <h4>{{ keyword }}</h4>
  </div>
</template>

<script lang="ts">
import { customRef, defineComponent } from "vue";
// 自定义hook防抖函数
function useDebounceRef<T>(value: T, delay: number = 200) {
  // 准备存储定时器id的变量
  let timer: number;
  return customRef((track, tigger) => {
    return {
      // 返回数据
      get() {
        // 告诉Vue追踪数据
        track();
        return value;
      },
      set(newVal: T) {
        // 清除定时器
        clearTimeout(timer);
        // 开启定时器
        timer = setTimeout(() => {
          value = newVal;
          // 告诉Vue更新界面
          tigger();
        }, delay);
      }
    };
  });
}

export default defineComponent({
  setup() {
    const keyword = useDebounceRef("111", 500);
    return {
      keyword
    };
  }
});
</script>

<style scoped>
</style>
