<template>
  <div>
    <h3>父级组件</h3>
    <h4>{{msg}}</h4>
    <button @click="handleChange">更新</button>
    <Child :msg="msg" msg2="attrs参数" @handleEmit2="handleEmit2"/>
  </div>
</template>

<script lang="ts">
import { defineComponent ,ref} from 'vue'
import Child from './components/Child.vue'
export default defineComponent({
  components:{
    Child,
  },
  setup () {
    const msg = ref('测试一下父子组件')
    const handleChange = () => {
      msg.value += '=='
    }
    const handleEmit2 = (value:string) => {
      msg.value += value
    }
    return {
      msg,
      handleChange,
      handleEmit2
    }
  }
})
</script>

<style scoped>

</style>