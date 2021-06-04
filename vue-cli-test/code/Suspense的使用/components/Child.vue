<template>
  <h3>子组件</h3>
  <!-- <h4>{{ msg }}</h4> -->
  <ul v-for="item in data" :key="item.id">
    <li>{{ item.id }}</li>
    <li>{{ item.title }}</li>
    <li>{{ item.price }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  // setup() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve({
  //         msg: "测试组件显示~~~~~~"
  //       });
  //     }, 2000);
  //   });
  // }
  // setup() {
  //   return axios.get("/data/product.json").then(res => {
  //     return {
  //       data: res.data
  //     };
  //   });
  // }
  async setup() {
    const res = await axios.get("/data/product.json");
    return {
      data: res.data
    };
  }
});
</script>

<style scoped>
</style>
