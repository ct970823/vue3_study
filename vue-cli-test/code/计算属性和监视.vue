<template>
  <div>
    <h3>计算属性和监视</h3>
    <fieldset>
      <legend>姓名操作</legend>
      姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.firstName"/>
      名字：<input type="text" placeholder="请输入名字" v-model="user.lastName"/>
    </fieldset>
    <fieldset>
      <legend>计算属性和监视的演示</legend>
      姓名：<input type="text" placeholder="显示姓名" v-model="fullName1"/>
      姓名：<input type="text" placeholder="显示姓名" v-model="fullName2"/>
      姓名：<input type="text" placeholder="显示姓名" v-model="fullName3"/>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent ,reactive,ref, watchEffect,watch} from 'vue'
export default defineComponent({
  /* 
    

  */
  setup () {
    // 定义一个响应式对象
    const user = reactive({
      firstName:'诸葛',
      lastName:'青'
    })
    // 通过计算属性的方式，实现第一个输入框的的显示
    // 返回的是一个ref对象
    const fullName1 = computed(()=>{
      return user.firstName + '_' + user.lastName
    })
    // 第二个输入框姓名
    const fullName2 = computed({
      get() {
        return user.firstName + '_' + user.lastName
      },
      set(val:string){
        const names = val.split('_')
        user.firstName = names[0]
        user.lastName = names[1]
      }
      
    })

    // 第三个输入框
    const fullName3 = ref('')
    // 监视 监视指定数据
    watch(user,({firstName,lastName})=>{
      fullName3.value = firstName + '_' + lastName
    },{
      immediate:true,//是否初始化立即执行一次，默认为否
      deep:true // 是否深度监听
    })

    // 监视，不需要配置immediate，本身默认会在初始化执行一次
    // watchEffect(()=>{
    //   fullName3.value = user.firstName + '_' + user.lastName
    // })

    // 监视fullName3的数据，改变firstName和lastName
    watchEffect(()=>{
      const names = fullName3.value.split('_')
      user.firstName = names[0]
      user.lastName = names[1]
    })
    // watch可以监听多个数据的 使用[]
    // 当使用watch监视非响应式数据的时候是，代码需要改一下
    watch([()=>user.firstName,()=>user.lastName],()=>{
      // 这里的代码没有执行，因为user.firstName和user.lastName不是响应式数据
      console.log('=====');
      
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
})
</script>

<style scoped>

</style>