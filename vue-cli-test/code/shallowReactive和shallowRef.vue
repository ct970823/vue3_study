<template>
  <div>
    <h3>shallowReactive和shallowRef</h3>
    <h4>{{ m1 }}</h4>
    <h4>{{ m2 }}</h4>
    <h4>{{ m3 }}</h4>
    <h4>{{ m4 }}</h4>
    <hr />
    <button @click="handleClick">更新</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  shallowReactive,
  shallowRef,
} from "vue";
export default defineComponent({
  setup() {
    // 如果是对象使用的是reactive深度劫持====>深度响应式
    const m1 = ref({
      name: "张三",
      age: 20,
      wife: {
        name: "李四",
      },
    });
    // 深度劫持====>深度响应式
    const m2 = reactive({
      name: "张三",
      age: 20,
      wife: {
        name: "李四",
      },
    });
    // 如果是对象使用的是shallowReactive浅劫持====>浅响应式
    const m3 = shallowRef({
      name: "张三",
      age: 20,
      wife: {
        name: "李四",
      },
    });
    // 浅劫持====>浅响应式
    const m4 = shallowReactive({
      name: "张三",
      age: 20,
      wife: {
        name: "李四",
      },
    });
    const handleClick = () => {
      // 更改数据(单独使用时可见，一起使用时会触发其他的深度劫持，导致视图更新，效果就不会显示出来)
      m1.value.wife.name = "王五";
      // m2.wife.name = "王五";
      // m3.value.wife.name = "王五";
      // m4.wife.name = "王五";
    };
    return {
      m1,
      m2,
      m3,
      m4,
      handleClick,
    };
  },
});
</script>

<style scoped>
</style>