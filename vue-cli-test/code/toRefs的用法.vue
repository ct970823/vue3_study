<template>
  <div>
    <h3>toRefs的使用</h3>
    <!-- <h4>name:{{state.name}}</h4>
    <h4>age:{{state.age}}</h4> -->
    <h4>name:{{name}}</h4>
    <h4>age:{{age}}</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      name:'张三',
      age:50
    })
    // toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个property都是一个ref ，简单来说，使用toRefs后，可以用结构
    const {name,age} = toRefs(state)
    setInterval(()=>{
      name.value += '=='
      age.value ++
    },1000)
    return {
      //...state  // 不是响应式数据了
      name,age
    };
  },
});
</script>

<style scoped>
</style>