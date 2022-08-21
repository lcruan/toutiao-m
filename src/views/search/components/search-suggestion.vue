<template>
    <div class="search-suggestion">
        <van-cell :title="text" icon="search" v-for="(text, index) in suggestions" :key="index"></van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'

// 按需加载有好处：只会把使用到的成员打包到结果中
import { debounce } from 'lodash'

export default {
    name: 'SearchSuggestion',
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            suggestions: [], // 联想建议数据列表
        }
    },
    created() {

    },
    methods: {
       async loadSearchSuggestions(q) {
            try {
                const { data } = await getSearchSuggestions(q)
                console.log(data);
                this.suggestions = data.data.options;
            }catch(err) {
                this.$toast('数据获取失败，请重试')
            }

        }
    },
    watch: {
        searchText: {
            // 当 searchText 发生改变时候就会调用handler函数
            // 注意：handler 函数名称是固定的

            // debounce 函数
            // 参数1： 一个函数
            // 参数2：延迟时间，单位是毫秒
            // 返回值：防抖之后的函数
            handler: debounce(function(value) {
                this.loadSearchSuggestions(value);
            }, 200),

            // handler(value) {
            //     this.loadSearchSuggestions(value);
            // },
            // 该回调将会在侦听开始之后被立即调用
            immediate: true
        }
    }
}
</script>

<style lang="less" scoped>

</style>