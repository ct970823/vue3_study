<template>
  <div>
    <h3>reactive和ref的细节问题</h3>
    <h4>{{m1}}</h4>
    <h4>{{m2}}</h4>
    <h4>{{m3}}</h4>
    <button @click="handleUpdate">更新数据</button>
  </div>
</template>

<script lang="ts">
import { defineComponent ,reactive,ref} from 'vue'
export default defineComponent({
  /* 
    reactive和ref是compositionAPI中2个重要的响应式API
    ref用来处理基本数据类型，reactive用来处理对象（递归深度响应式）
    如果用ref对象/数组，内部会自动将对象/数组转换为reactive的代理对象
    ref内部：通过给value属性添加getter/setter属性来实现对数据的劫持
    reactive内部：通过使用Proxy来实现对对象内部所有数据的劫持，并通过Reflect操作对象内部数据
    ref的数据操作：在js中要.value，在模板中不需要（内部解析模板时会自动添加.value）

  */
  setup () {
    const m1 = ref('11')
    const m2 = reactive({
      name:'小明',
      age:20,
      wife:{
        name:'小红'
      }
    })
    const m3 = ref({
      name:'小李',
      age:20,
      wife:{
        name:'小绿'
      }
    })
    const handleUpdate = () => {
      m1.value += '=='
      m2.wife.name += '=='
      m3.value.wife.name += '=='
    }
    return {
      m1,
      m2,
      m3,
      handleUpdate
    }
  }
})
</script>

<style scoped>

</style>