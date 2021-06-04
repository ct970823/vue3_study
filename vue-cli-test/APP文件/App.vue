<template>
<!-- Vue2中的html模板中必须要有根标签，Vue3可以没有 -->
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">// 使用ts代码

import { Options, Vue } from 'vue-class-component';
// import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue';
// 装饰器，声明这是一个vue组件且已启用类型推断，里面可以写vue组件中包含的属性 例如 data 生命周期 methods computed components 等
@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
// 也可以使用defineComponent来申明已启用类型推断
// export default defineComponent ({
//   name:'App'
//   components:{
//     HelloWorld
//   }
// })
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
