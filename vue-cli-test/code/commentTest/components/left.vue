<template>
  <div class="col-md-4">
    <form class="form-horizontal">
      <div class="form-group">
        <label>用户名</label>
        <input
          type="text"
          class="form-control"
          placeholder="用户名"
          v-model="user"
        />
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea
          class="form-control"
          rows="6"
          placeholder="评论内容"
          v-model="commentInfo"
        ></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button
            type="button"
            class="btn btn-default pull-right"
            @click="submitComment"
          >
            提交
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup(props, context) {
    // 定义用户名
    const user = ref("");
    // 定义评论内容
    const commentInfo = ref("");
    // 提交评论
    const submitComment = () => {
      // 将用户名和内容整合成对象
      const commentObj = {
        user: user.value,
        commentInfo: commentInfo.value
      };
      // 将提交信息传递到父组件中
      context.emit("submitComment", commentObj);
    };

    return {
      user,
      commentInfo,
      submitComment
    };
  }
});
</script>

<style scoped>
</style>
