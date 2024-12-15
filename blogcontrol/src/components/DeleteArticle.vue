<template>
  <div class="delete-article">
    <h3>文章列表</h3>
    <ul class="article-list">
      <li v-for="post in posts" :key="post.article_id" class="article-item">
        <h4>{{ post.title }}</h4>
        <div class="button-group">
          <button @click="confirmDelete(post.article_id)" class="delete-button">删除</button>
          <button @click="editPost(post)" class="edit-button">修改</button>
        </div>
      </li>
    </ul>

    <!-- 分页控件 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="nextPage" :disabled="posts.length < pageSize">下一页</button>
    </div>

    <!-- 确认删除弹窗 -->
    <div v-if="showConfirm" class="confirm-dialog">
      <p>确定要删除这篇文章吗？</p>
      <div class="confirm-buttons">
        <button @click="deletePost(selectedPostId)" class="confirm-button">确定</button>
        <button @click="cancelDelete" class="cancel-button">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      currentPage: 1,
      pageSize: 9,
      showConfirm: false,
      selectedPostId: null
    };
  },
  methods: {
    async fetchPosts(page = 1, size = 9) {
      try {
        const response = await axios.get('http://127.0.0.1:9090/api/v1/articleListUser', {
          params: { page, size }
        });
        this.posts = response.data.Msg;
      } catch (error) {
        console.error('获取文章失败:', error);
      }
    },
    confirmDelete(id) {
      this.selectedPostId = id;
      this.showConfirm = true;
    },
    async deletePost(id) {
      try {
        await axios.delete(`http://127.0.0.1:9090/api/v1/Delete/${id}`);
        this.showConfirm = false;
        this.fetchPosts(this.currentPage, this.pageSize);
      } catch (error) {
        console.error('删除文章失败:', error);
      }
    },
    cancelDelete() {
      this.showConfirm = false;
    },
    editPost(post) {
      console.log('编辑文章:', post);
    },
    nextPage() {
      this.currentPage += 1;
      this.fetchPosts(this.currentPage, this.pageSize);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.fetchPosts(this.currentPage, this.pageSize);
      }
    }
  },
  mounted() {
    this.fetchPosts(this.currentPage, this.pageSize);
  }
};
</script>

<style scoped>
.delete-article {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.article-list {
  list-style-type: none;
  padding: 0;
}

.article-item {
  margin: 15px 0;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.delete-button,
.edit-button,
.confirm-button,
.cancel-button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

.delete-button:hover {
  background-color: #c0392b;
}

.edit-button {
  background-color: #3498db;
  color: white;
}

.edit-button:hover {
  background-color: #2980b9;
}

.confirm-dialog {
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #ffffff;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.confirm-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.confirm-button {
  background-color: #2ecc71;
  color: white;
}

.confirm-button:hover {
  background-color: #27ae60;
}

.cancel-button {
  background-color: #e0e0e0;
}

.cancel-button:hover {
  background-color: #bdbdbd;
}
</style>