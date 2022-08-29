<template>
    <van-button
        :icon=" value ? 'star' : 'star-o'"
        :class="{
            collected: value
        }"
      />
</template>

<script>
    export default {
        name: 'CollectArticle',
        props: {
            value: {
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style lang="less" scoped>
    .van-button--default {
        border-color: #fff;
    }
    .collected {
        .van-icon {
            color: #ffa500;
        }
    }
</style>