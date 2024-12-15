<template>
  <div class="home">
    <h2>最新博文</h2>
    <div class="posts">
      <BlogPost
          v-for="post in filteredPosts"
          :key="post.article_id"
          :post="post"
      />
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="nextPage" :disabled="!hasMore">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BlogPost from '../components/BlogPost.vue';

export default {
  components: {
    BlogPost,
  },
  props: {
    searchQuery: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      posts: [],
      currentPage: 1,
      size: 9,
      hasMore: true,
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      ).slice(0, this.currentPage * this.size); // 修改为只获取当前页的文章
    },
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://127.0.0.1:9090/api/v1/articleListUser', {
          params: {
            page: this.currentPage,
            size: this.size,
          },
        });
        if (response.data.Code === 1000) {
          this.posts = response.data.Msg.map(post => ({
            ...post,
            article_id: post.article_id.toString(),
          }));
          this.hasMore = this.posts.length === this.size; // 检查是否还有更多文章
        }
      } catch (error) {
        console.error('获取文章失败:', error);
      }
    },
    nextPage() {
      this.currentPage++;
      this.fetchPosts();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchPosts();
      }
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>