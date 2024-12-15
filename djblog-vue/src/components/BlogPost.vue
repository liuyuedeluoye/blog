<template>
  <div class="blog-post">
    <h3>
      <router-link :to="'/post/' + post.article_id">{{ post.title }}</router-link>
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
};
</script>

<style scoped>
.blog-post {
  background-color: #ffffff; /* 背景颜色 */
  padding: 15px; /* 内边距 */
  border-radius: 5px; /* 圆角 */
  border: 1px solid #ddd; /* 边框 */
  transition: box-shadow 0.3s; /* 添加过渡效果 */
}

.blog-post:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 悬停效果 */
}
</style>