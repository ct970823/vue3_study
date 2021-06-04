<template>
  <div>
    <h3>ref获取页面中的元素</h3>
    <input type="text" ref="inputRef">
    
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted ,ref } from "vue";
export default defineComponent({
  setup() {
    
    const inputRef = ref<HTMLElement | null>(null)

    onMounted(()=>{
      inputRef.value && inputRef.value.focus()
    })

    return {
     inputRef
    };
  },
});
</script>

<style scoped>
</style>