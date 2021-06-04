<template>
  <div>
    <h3>生命周期</h3>

    <h4>父组件</h4>
    <button @click="isShow = !isShow">切换</button>
    <child v-if="isShow"></child>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref}  from 'vue'
import Child from './components/Child.vue'
export default defineComponent({
  components:{
    Child
  },
  setup () {
    const isShow = ref(true)

    return {
      isShow
    }
  }
})
</script>

<style scoped>

</style>