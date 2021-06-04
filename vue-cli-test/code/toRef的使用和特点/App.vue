<template>
  <div>
    <h3>toRef的使用及特点</h3>
    <h4>state:{{ state }}</h4>
    <h4>age:{{ age }}</h4>
    <h4>money:{{ money }}</h4>
    <hr />
    <button @click="handleUpdate">更新</button>
    <child :age="age"></child>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef } from "vue";
import Child from "./components/Child.vue";
export default defineComponent({
  components: {
    Child
  },
  setup() {
    /*
      toRef:
        为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
        区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
        应用: 当要将某个 prop 的 ref 传递给复合函数时，toRef 很有用
    */
    const state = reactive({
      age: 10,
      money: 5
    });
    // 把state对象中的age属性创建一个ref对象 （同一数据源，更新时同步）
    const age = toRef(state, "age");
    // 把state对象中的money属性值变成一个ref对象（拷贝出来的新数据，更新时不影响）
    const money = ref(state.money);
    // 点击时属性值增加
    const handleUpdate = () => {
      age.value++;
      money.value++;
      console.log(state);
      console.log(money);

      // state.money++;
    };

    return {
      state,
      age,
      money,
      handleUpdate
    };
  }
});
</script>

<style scoped>
</style>
