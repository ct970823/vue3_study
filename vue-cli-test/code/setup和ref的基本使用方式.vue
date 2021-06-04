<template>
  <!-- Vue2中的html模板中必须要有根标签，Vue3可以没有 -->
  <div>setup和ref的基本使用</div>
  <h3>{{ count }}</h3>
  <button @click="addCount">增加数量</button>
  <!-- 也可以直接在模板中修改数据，是不需要使用.value的方式修改 -->
  <!-- <button @click="count++">增加数量</button> -->
</template>

<script lang="ts">
// 使用ts代码

import { defineComponent, ref } from "vue";
// 也可以使用defineComponent来申明已启用类型推断
export default defineComponent({
  name: "App",
  // 需求：点击按钮时，数据发生改变
  // vue2实现
  // data(){
  //   return {
  //     count:0
  //   }
  // },
  // methods:{
  //   addCount(){
  //     this.count++
  //   }
  // }

  // vue3实现
  // setup 组合api入口函数,只在初始化执行一次，比beforeCreate快
  setup() {
    // 变量
    //let count = 0 // 此时的数据并不是响应式的数据
    // ref是一个函数，作用：创建一个响应式的数据，返回一个ref对象，对象中有一个value属性，如果西药定义数据进行操作，需要使用该ref对象调用value属性的方式进行数据的操作
    // html模板中不需要使用.value的写法
    // 一般用来定义一个基本类型的响应式数据
    const count = ref(0);
    console.log(count);
    
    // 方法
    function addCount() {
      count.value++;
    }
    // 将变量和方法返回
    return {
      count,
      addCount
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
