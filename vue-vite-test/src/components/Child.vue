<template>
  <div>子组件</div>
  <h5>{{msg}}</h5>
  <button @click="msg++">更新数据</button>
</template>

<script lang="ts">
import { defineComponent ,ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted } from "vue";
export default defineComponent({
  /* 
    Vue2中的生命周期
  */
  beforeCreate() {
    console.log("Vue2中的beforeCreate");
  },
  created() {
    console.log("Vue2中的created");
  },
  beforeMount() {
    console.log("Vue2中的beforeMount");
  },
  mounted() {
    console.log("Vue2中的mounted");
  },
  beforeUpdate() {
    console.log("Vue2中的beforeUpdate");
  },
  updated() {
    console.log("Vue2中的updated");
  },
  //  Vue2中的beforeDestroy和destroyed这两个生命周期在Vue3中改名了，所以不能使用了 改成了
  // beforeDestroy() {
  //   console.log("Vue2中的beforeDestroy");
  // },
  // destroyed() {
  //   console.log("Vue2中的destroyed");
  // },
  beforeUnmount() {
    console.log("Vue2中的beforeUnmount");
  },
  unmounted() {
    console.log("Vue2中的unmounted");
  },

  /* 
    Vue3的生命周期都是写在setup中的
    写法：onBeforeMount(()=>{xxx})
  */

  setup() {
    console.log('Vue3中的setup');
    const msg = ref(1)

    onBeforeMount(()=>{
      console.log('Vue3中的onBeforeMount');
    })
    onMounted(()=>{
      console.log('Vue3中的onMounted');
    })
    onBeforeUpdate(()=>{
      console.log('Vue3中的onBeforeUpdate');
    })
    onUpdated(()=>{
      console.log('Vue3中的onUpdated');
    })
    onBeforeUnmount(()=>{
      console.log('Vue3中的onBeforeUnmount');
    })
    onUnmounted(()=>{
      console.log('Vue3中的onUnmounted');
    })

    return {
      msg
    };
  },
});
</script>

<style scoped>
</style>
