<!--
 * @Author: your name
 * @Date: 2021-06-01 16:13:30
 * @LastEditTime: 2021-06-01 16:53:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3_study\vue-cli-test\组合api\reactive的基本使用方式.vue
-->
<template>
  <!-- Vue2中的html模板中必须要有根标签，Vue3可以没有 -->
  <h2>reactive的基本使用</h2>
  <h3>书名：{{user.title}}</h3>
  <h3>作者：{{user.author}}</h3>
  <h3>内容：{{user.content}}</h3>
  <br>
  <button @click="updateUser">更新数据</button>
</template>

<script lang="ts">
// 使用ts代码

import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "App",
  // 需求：显示用户的相关信息，点击按钮，可以更新用户的相关信息数据
  setup(){
    /**
     *  作用: 定义多个数据的响应式
        const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
        响应式转换是“深层的”：会影响对象内部所有嵌套的属性
        内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
        操作代理对象 目标对象数据随之变化（增删改）
     * 
     */

    // 返回的是一个Proxy的代理对象，被代理的对象就是obj对象
    const user = reactive({
      title:'小红书',
      author:'mememe'
    })
    console.log(user);

    const updateUser = () => {
      user.title = '小蓝书'
      user.author = 'you'
      user.content[0] = '444'
    }

    return{
      user,
      updateUser
    }
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
