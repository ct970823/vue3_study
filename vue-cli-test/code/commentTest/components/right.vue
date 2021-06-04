<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-if="commentList.length == 0">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group" v-else>
      <li
        class="list-group-item"
        v-for="(item, index) in commentList"
        :key="index"
      >
        <div class="handle">
          <a href="javascript:;" @click="deleteComment(index)">删除</a>
        </div>
        <p class="user">
          <span>{{ item.user }}</span
          ><span>说:</span>
        </p>
        <p class="centence">{{ item.commentInfo }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const deleteComment = (index: number) => {
      context.emit("deleteComment", index);
    };
    return {
      deleteComment
    };
  }
});
</script>

<style scoped>
.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 1px;
  text-align: center;
}

.handle a {
  display: block;
  text-decoration: none;
}
</style>
