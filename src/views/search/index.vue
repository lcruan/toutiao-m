<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <!-- form 目的是 在手机上 弹出的键盘右下角显示搜索的按钮 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /顶部搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText"/>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"/>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else :search-histories="searchHistorys"/>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import searchHistory from "./components/search-history";
import searchSuggestion from "./components/search-suggestion";
import searchResult from "./components/search-result";
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      isResultShow: false, //控制搜索结果的展示
      searchHistorys: [], //搜索的历史记录数据
    };
  },
  components: {
    searchHistory,
    searchSuggestion,
    searchResult,
  },
  created() {},
  methods: {
    onSearch(val) {
      console.log(val);
      // 更新文本框内容
      this.searchText = val;

      // 存储搜索历史记录
      // 要求：不要有重复记录，最新的排在最前面
      const index = this.searchHistorys.indexOf(val)
      if(index !== -1) {
        this.searchHistorys.splice(index, 1)
      }
      this.searchHistorys.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>