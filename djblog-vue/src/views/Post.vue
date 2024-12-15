<template>
  <div className="post">
    <h2>{{ post.title }}</h2>
    <div v-html="parsedContent"></div> <!-- 使用 v-html 显示解析后的内容 -->
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import {marked} from 'marked'; // 导入 marked

export default {
  name: 'Post',
  data() {
    return {
      post: {
        title: '加载中...',
        content: '加载中...',
      },
    };
  },
  computed: {
    parsedContent() {
      return marked(this.post.content); // 将 Markdown 转换为 HTML
    },
  },
  mounted() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      const postId = this.$route.params.id; // 获取文章 ID
      console.log('Post ID:', postId); // 打印 postId
      try {
        const response = await axios.get(`http://127.0.0.1:9090/api/v1/articleContent/${postId}`);

        if (response.data.Code === 1000) {
          this.post = response.data.Msg; // 更新为获取 Msg 中的文章对象
        } else {
          console.error('获取文章失败:', response.data.Msg);
        }
      } catch (error) {
        console.error('获取文章请求失败:', error);
        this.post.content = '加载失败，请稍后重试。'; // 提示用户加载失败
      }
    },
  },
};
</script>

<style>
.post {
  padding: 20px;
}
</style>