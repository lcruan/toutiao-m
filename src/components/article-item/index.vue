<template>
    <!-- 
        cell 单元格的 to 属性和 VueRouter 中的 RouterLink 组件的 to 属性用法是一样的
        用法参考链接：https://router.vuejs.org/zh/api/#to
         :to="'/article/' + article.art_id" 
         :to="`/article/${article.art_id}`
    -->
    <van-cell 
        class="article-item" 
            :to="{
                // name根据路由名称跳转
                name: 'article',
                // 传递路由动态参数
                params: {
                    // 属性名：路由路径中设计动态参数名称
                    articleId: article.art_id
                }
            }">
        <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
        <div slot="label">
            <div v-if="article.cover.type === 3" class="cover-wrap">
                <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
                    <van-image
                        class="cover-item-img"
                        :src="img"
                        fit="cover"
                        />
                </div>
            </div>
            <div class="label-info-wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}评论</span>
                <span>{{article.pubdate | relativeTime}}</span>
            </div>
        </div>
        <van-image
            class="right-cover"
            v-if="article.cover.type === 1"
            fit="cover"
            slot="default"
            :src="article.cover.images[0]"
            />
    </van-cell>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    create() {

    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
    .article-item {
        .title {
            font-size: 32px;
            color: #3a3a3a;
        }
        .van-cell__value {
            flex: unset;
            width: 232px;
            height: 146px;
            padding-left: 25px;
        }
        .right-cover {
            width: 232px;
            height: 146px;
        }
        .label-info-wrap span {
            font-size: 22px;
            color: #b4b4b4;
            margin-right: 25px;
        }

        .cover-wrap {
            display: flex;
            padding: 30px 0;
            .cover-item {
                flex: 1;
                height: 146px;
                &:not(:last-child) {
                    padding-right: 4px;
                }
                .cover-item-img {
                    width: 100%;
                    height: 146px;
                }
                
            }
        }
    }
</style>