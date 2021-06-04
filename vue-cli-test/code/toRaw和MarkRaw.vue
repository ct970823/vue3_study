<template>
  <div>
    <h3>toRaw和MarkRaw</h3>
    <h4>state:{{ state }}</h4>
    <hr />
    <button @click="testToRaw">测试toRaw</button>
    <button @click="testMarkRaw">测试markRaw</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw, reactive, toRaw } from "vue";

interface UserInfo {
  name: string;
  age: number;
  likes?: string[];
}
export default defineComponent({
  setup() {
    const state = reactive<UserInfo>({
      name: "小明",
      age: 20
    });
    const testToRaw = () => {
      // 把代理对象变成普通对象，数据变化，界面不变化
      const user = toRaw(state);
      user.name += "===";
      console.log(111, user);
    };
    // markRaw标记的对象数据，从此易购都不能再成为代理对象了
    const testMarkRaw = () => {
      const likes = ["吃", "喝"];
      // state.likes = likes;
      state.likes = markRaw(likes);
      setInterval(() => {
        if (state.likes) state.likes[0] += "";
      }, 1000);
      console.log(222, state);
    };
    return {
      state,
      testToRaw,
      testMarkRaw
    };
  }
});
</script>

<style scoped>
</style>
