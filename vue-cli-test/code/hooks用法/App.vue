<template>
  <div>
    <h3>自定义hook函数操作</h3>
    <h4>x:{{ x }},y:{{ y }}</h4>
    <h5 v-if="loading">加载中...</h5>
    <h5 v-else-if="errorMsg">错误信息：{{ errorMsg }}</h5>
    <ul v-else v-for="item in data" :key="item.id">
      <li>id：{{ item.id }}</li>
      <li>名称：{{ item.title }}</li>
      <li>价格：{{ item.price }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useRequest from "./hooks/useRequest";

// 定义接口函数类型
interface IProduct {
  id: string;
  title: string;
  price: string;
}

export default defineComponent({
  setup() {
    // 需求1：用户点击页面，把点击位置的横纵坐标显示出来
    const { x, y } = useMousePosition();
    // 发送请求
    const { loading, data, errorMsg } = useRequest<IProduct[]>(
      "/data/product.json"
    );

    watch(data, () => {
      if (data.value) {
        console.log(data.value.length);
      }
    });

    return {
      x,
      y,
      loading,
      data,
      errorMsg,
    };
  },
});
</script>

<style scoped>
</style>