<template>
    <div class="home-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" fixed>
            <van-button class="search-btn" slot="title" type="info" size="small" round icon="search" to="/search">搜索</van-button>
        </van-nav-bar>

        <!-- 频道列表 -->
        <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。
             通过 animated 属性可以开启切换标签内容时的转场动画
             通过 swipeable 属性可以开启滑动切换标签页。 -->
        <van-tabs class="channel-tabs" v-model="active" animated swipeable>
            <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
                <!-- 文章列表 -->
                <article-list :channel="channel"/>
            </van-tab>
            <div slot="nav-right" class="placeholder"></div>
            <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
                <i class="toutiao toutiao-gengduo"></i>
            </div>
        </van-tabs>

        <!-- 频道编辑弹出层 -->
        <van-popup
            v-model="isChannelEditShow"
            close-icon-position="top-left"
            closeable
            position="bottom"
            :style="{ height: '100%' }"
        >
        <channel-edit :my-channels="channels" @update-active="onUpdateActive" :active="active"></channel-edit>
        </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
    name: 'HomeIndex',
    components: {
        ArticleList,
        ChannelEdit
    },
    data() {
        return {
             active: 0,
             channels: [], // 频道列表
             isChannelEditShow: false, // 控制编辑频道弹出层的显示状态
        }
    },
    created() {
        this.loadChannels()
    },  
    methods: {
        async loadChannels() {
            try {
                // const { data } = await getUserChannels();
                // this.channels = data.data.channels;

                let channels = []
                if(this.user) {
                    // 已登录：请求获取用户频道列表
                    const { data } = await getUserChannels();
                    channels = data.data.channels
                }else {
                    // 未登录：判断是否有本地的频道列表数据
                    const localChannles = getItem('TOUTIAO_CHANNELS')
                     //   有， 拿来使用
                    if(localChannles) {
                        channels = localChannles
                    }else {
                      //  没有，请求获取默认频道列表
                      const { data } = await getUserChannels();
                      channels = data.data.channels
                    }
                }
                this.channels = channels
            }catch (err) {
                this.$toast('获取频道数据失败')
            }
        },
        onUpdateActive(index, isChannelEditShow = true) {
            // 更新激活的频道项
            this.active = index;
            // 关闭编辑频道弹层
            this.isChannelEditShow = isChannelEditShow


        }
    },
    computed: {
        ...mapState(['user'])
    }
}
</script>

<style lang="less" scoped>
    .home-container {
        padding-top: 174px;
        // 下拉加载被遮挡了
        padding-bottom: 100px;
        // 加深度
        ::v-deep .van-nav-bar__title {
            max-width: unset;
        }
        .search-btn {
            width: 555px;;
            height: 64px;
            background-color: #5babfb;
            border: none;
            font-size: 28px;
            .van-icon {
                font-size: 32px;
            }
        }

        /deep/ .channel-tabs {
            .van-tabs__wrap {
                position: fixed;
                top: 92px;
                z-index: 1;
                left: 0;
                right: 0;
                height: 82px;
            }
            // 作用子组件样式 如果在一个作用域组件当中，默认只能作用到这个组件的根节点，如果想让样式作用更深，影响后代元素 加/deep/
            .van-tab {
                border-right: 1px solid #edeff3;
                min-width: 200px;
                font-size: 30px;
                color: #777777;
            }

            .van-tab--active {
                color: #333333;
            }

            .van-tabs__nav {
                padding-bottom: 0;
            }

            .van-tabs__line {
                bottom: 8px;
                width: 31px !important;
                height: 6px;
                background-color: #3296fa;

            }

            .placeholder {
                flex-shrink: 0;
                width: 66px;
                height: 82px;
            }

            .hamburger-btn {
                position: fixed;
                display: flex;
                justify-content: center;
                align-items: center;
                right: 0;
                width: 66px;
                height: 82px;
                background-color: #fff;
                opacity: 0.902;
                i.toutiao {
                    font-size: 33px;
                }
                &:before {
                    position: absolute;
                    left: 0;
                    content: '';
                    width: 1px;
                    height: 100%;
                    background-image: url(~@/assets/gradient-gray-line.png);
                    background-size: contain;

                }
            }

        }
    }
</style>