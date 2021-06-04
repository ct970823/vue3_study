<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue3的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <left @submitComment="submitComment"></left>
      <right :commentList="commentList" @deleteComment="deleteComment"></right>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Left from "./components/left.vue";
import Right from "./components/right.vue";

interface CommentType {
  user: string;
  commentInfo: string;
}

export default defineComponent({
  components: {
    Left,
    Right
  },
  setup() {
    // 定义评论列表
    const commentList = reactive<CommentType[]>([]);

    // 提交的信息方法
    const submitComment = (comment: CommentType) => {
      commentList.push({ ...comment });
    };
    const deleteComment = (index: number) => {
      commentList.splice(index, 1);
    };
    return {
      commentList,
      submitComment,
      deleteComment
    };
  }
});
</script>

<style scoped>
.reply {
  margin-top: 0px;
}

li {
  transition: 0.5s;
  overflow: hidden;
}

.list-group-item .centence {
  padding: 0px 50px;
}

.user {
  font-size: 22px;
}
</style>
