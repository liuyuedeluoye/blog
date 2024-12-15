<template>
  <div>
    <h3>添加文章</h3>
    <form @submit.prevent="submitForm">
      <input v-model="title" placeholder="文章标题" required />
      <textarea v-model="content" placeholder="文章内容" required></textarea>
      <button type="submit">提交</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      content: '',
      message: ''
    };
  },
  methods: {
    async submitForm() {
      const payload = {
        title: this.title,
        content: this.content
      };

      console.log('Sending JSON:', JSON.stringify(payload)); // 打印要发送的 JSON 数据

      try {
        const response = await axios.post('http://127.0.0.1:9090/api/v1/Add', payload, {
          headers: {
            'Content-Type': 'application/json' // 确保设置请求头为 JSON
          }
        });

        if (response.status === 200) {
          this.message = '文章添加成功！';
          this.title = '';
          this.content = '';
        }
      } catch (error) {
        console.error('添加文章失败:', error.response ? error.response.data : error.message);
        this.message = '添加文章失败，请稍后再试。';
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  height: 300px; /* 增加高度，您可以根据需要调整 */
  resize: vertical; /* 允许用户上下调整大小 */
}

.message {
  margin-top: 10px;
  color: green; /* 成功消息颜色 */
}
</style>