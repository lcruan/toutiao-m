<template>
    <div class="layout-container">
        <!-- 子路由出口 -->
        <router-view/>

        <!-- 标签导航栏 -->
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o">标签</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
export default {
    name: 'LayoutIndex',
    data() {
        return {
            active: 0
        }
    }
}
</script>

<style lang="less" scoped>

</style>