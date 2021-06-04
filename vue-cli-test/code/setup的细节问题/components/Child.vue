<template>
  <div>
    {{ msg }}
    <br />
    <!-- {{ count }} -->
    <button @click="handleEmit">分发事件</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["msg"],
  /* 
        setup细节问题
        setup是在beforeCreate生命周期回调之前就执行了，而且只执行一次
        setup执行的时候，当前的组件还没有创建出来，也就意味着，组件实例对象this根本就不能用
        this是undefined，说明不能通过this调用data、computed、methods、props等相关内容
        其实所有的composition API（组合API）相关回调函数中也都不可以了
        返回值是一个对象，内部的属性和方法是给html模板使用的
        setup中的对象的内部属性和data函数中的对象属性都可以在html模板中使用
        setup中的对象的内部属性和data函数中的对象属性会合并为组件对象的属性
        setup中的对象中的方法和methods对象中的方法会合并为组件对象的方法
        在Vue3中尽量不要混合使用data和setup以及methods和setup
    */
  beforeCreate() {
    console.log("beforeCreate执行了");
  },
  /* 
    props参数：是一个对象，里面有父级组件想子组件传递的数据，并且是在子组件中使用props接收到的属性 包含了props配置申明且传入了所有属性的对象
    context参数：是一个对象，里面有attrs对象（获取当前组件标签的所有属性，但是该属性没有在props中申明的），emit方法（分发事件的），slots对象(插槽)
  */
  setup(props,context) {
    console.log("setup执行了");
    console.log(props,context);
    console.log(context.attrs.msg2);
    
    const showMsg1 = () => {
      console.log("setup中的showMsg");
    };
    const handleEmit = () => {
        context.emit('handleEmit2','++')
        
    }
    return {
      showMsg1,
      handleEmit
    };
  },
//   data() {
//     return {
//       count: 111,
//     };
//   },
//   mounted() {
//     console.log(this);
//   },
//   methods: {
//     showMsg2() {
//       console.log("methods中的showMsg");
//     },
//   },
});
</script>

<style scoped>
</style>
