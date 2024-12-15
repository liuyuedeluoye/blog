<template>
  <div id="app">
    <header class="app-header">
      <h1>苗苗</h1>
      <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索文章标题..."
          @input="onSearch"
          class="search-input"
      />
    </header>
    <main>
      <router-view :search-query="searchQuery" />
    </main>
    <footer class="app-footer">
      <p>&copy; 2024 苗苗</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

main {
  flex: 1;
  padding: 20px;
}

.app-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
}
</style>