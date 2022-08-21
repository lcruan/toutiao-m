<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <!-- form 目的是 在手机上 弹出的键盘右下角显示搜索的按钮 -->
    <form action="/">
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
    <search-result v-if="isResultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else />
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
  .van-search__action {
    color: #fff;
  }
}
</style>