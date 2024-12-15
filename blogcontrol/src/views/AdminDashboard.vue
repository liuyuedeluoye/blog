<template>
  <div class="dashboard">
    <div class="sidebar">
      <h2>功能列表</h2>
      <ul>
        <li @click="selectFunction('add')">添加文章</li>
        <li @click="selectFunction('delete')">删除文章</li>
        <li @click="selectFunction('edit')">修改文章</li>
      </ul>
    </div>
    <div class="content">
      <div v-if="selectedFunction === 'add'">
        <add-article />
      </div>
      <div v-if="selectedFunction === 'delete'">
        <delete-article /> <!-- 引入 DeleteArticle 组件 -->
      </div>
      <div v-if="selectedFunction === 'edit'">
        <h3>修改文章功能</h3>
        <!-- 可以在这里添加修改文章的逻辑 -->
      </div>
    </div>
  </div>
</template>

<script>
import AddArticle from '../components/AddArticle.vue';
import DeleteArticle from '../components/DeleteArticle.vue'; // 引入 DeleteArticle 组件

export default {
  name: 'AdminDashboard',
  components: {
    AddArticle,
    DeleteArticle // 注册组件
  },
  data() {
    return {
      selectedFunction: null
    };
  },
  methods: {
    selectFunction(func) {
      this.selectedFunction = func;
    }
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh; /* 使页面填满整个视口高度 */
}
.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #007bff; /* 设置背景颜色为蓝色 */
  color: white; /* 设置文本颜色为白色 */
  border-right: 1px solid #ddd; /* 添加右边框以分隔内容 */
  box-sizing: border-box; /* 包含内边距和边框在宽度内 */
}
.content {
  padding: 20px;
  flex: 1;
  overflow-y: auto; /* 允许内容滚动 */
}
.sidebar ul {
  list-style-type: none;
  padding: 0;
}
.sidebar li {
  cursor: pointer;
  margin: 10px 0;
}
.sidebar li:hover {
  text-decoration: underline;
  color: #e0e0e0; /* 悬停时文本颜色变化 */
}
</style>