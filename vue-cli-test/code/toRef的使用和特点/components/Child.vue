<template>
  <div>子组件</div>
  <h5>age:{{ age }}</h5>
  <h5>length:{{ length }}</h5>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from "vue";

function useGetLength(age: Ref) {
  return computed(() => {
    return age.value.toString().length;
  });
}

export default defineComponent({
  props: {
    age: {
      type: Number,
      require: true
    }
  },
  setup(props) {
    const length = useGetLength(toRef(props, "age"));
    return {
      length
    };
  }
});
</script>

<style scoped>
</style>
