<template>
  <div>
    <h3>readonly和shallowReadonly</h3>
    <h4>state:{{ state }}</h4>
    <hr />
    <button @click="handleClick">更新</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, readonly, shallowReadonly } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      name: "张三",
      age: 20,
      car: {
        name: "奔驰",
      },
    });
    // 只读的数据 readonly 深度的只读
    const state2 = readonly(state);
    // 只读的数据 shallowReadonly 浅只读
    const state3 = shallowReadonly(state);

    const handleClick = () => {
      // state2.name += "==";
      // state3.car.name += "===";
    };

    return {
      state,
      handleClick,
    };
  },
});
</script>

<style scoped>
</style>
