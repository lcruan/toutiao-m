<template>
    <div class="channel-edit">
        <!-- 我的频道 -->
        <!-- :border="false" 去除我的频道列表边线 -->
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button class="edit-btn" type="danger" plain round size="mini" @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
        </van-cell>
        <van-grid class="my-grid" :gutter="10">
            <van-grid-item @click="onMyChannelClick(channel, index)" class="grid-item" v-for="(channel, index) in myChannels" :key="index" >
                <!-- 我的频道 关闭按钮 -->
                <van-icon v-show="isEdit && !fiexChannels.includes(channel.id)" name="clear" slot="icon"></van-icon>
            <!-- v-bind:class 语法
                 一个对象，对象中的 key 表示要作用的 css 类名
                         对象中的 value 要计算出布尔值
                         true，则作用该类名
                         false，不作用类名
             -->
                <span class="text" :class="{ active: index === active}" slot="text">{{channel.name}}</span>
            </van-grid-item>
        </van-grid>
         <!-- 我的频道 -->

        <!-- 频道推荐 -->
        <van-cell :border="false">
            <div slot="title" class="title-text">频道推荐</div>
        </van-cell>
        <van-grid class="recommend-grid" :gutter="10">
            <van-grid-item 
             class="grid-item" 
             v-for="(channel, index) in recommendChannels" 
             :key="index" 
             icon="plus"  
             :text="channel.name"
             @click="onAddChannel(channel)" />
        </van-grid>
        <!-- 频道推荐 -->
    </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
    name: 'ChannelEdit',
    props: {
        myChannels: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            allChannels: [], //所有频道
            isEdit: false, // 控制编辑状态的显示
            fiexChannels: [0], // 固定频道，不允许删除
        }
    },
    created() {
        this.loadAllChannels()
    },
    methods: {
        async loadAllChannels() {
            try {
                const {data} = await getAllChannels();
                this.allChannels = data.data.channels;
            }catch (err) {
                this.$toast('数据获取失败')
            }
        },
        async onAddChannel(channel) {
            console.log(channel);
            this.myChannels.push(channel)

            // 数据持久化处理
            if(this.user) {
                // 已登录：把数据请求接口放到线上
                try {
                    await addUserChannel({
                        id: channel.id, // 频道id
                        seq: this.myChannels.length// 序号
                    })
                }catch(err) {
                    this.$toast('保存失败，请稍后重试')
                }
            }else {
                // 未登录，把数据存储到本地
                setItem('TOUTIAO_CHANNELS', this.myChannels)

            }
            
            
        },
        onMyChannelClick(channel, index) {
            if(this.isEdit) {
                // 1. 如果是固定频道,则不删除
                if(this.fiexChannels.includes(channel.id)) {
                    return 
                }

                // 2. 删除频道项
                this.myChannels.splice(index, 1)

                // 3. 如果删除的激活频道之前的频道，则更新激活频道项
                // 参数1：要删除元素的索引
                // 参数2：删除的个数，如果不指定，则从参数1开始一直删除
                if(index <= this.active) {
                    // 让激活频道的索引 -1
                    this.$emit('update-active', this.active - 1, true)
                }

                // 4. 处理持久化
                this.deleteChannel(channel);
                


            }else {
                // 非编辑状态，则执行切换频道
                this.$emit('update-active', index, false)
            }
            
        },
        async deleteChannel(channel) {
            if(this.user) {
                // 已登录，将数据更新到线上
                try {
                    await deleteUserChannel(channel.id)
                }catch(err) {
                    this.$toast('操作失败，请稍后重试')
                }
            }else {
                // 未登录，将数据更新到本地
                 setItem('TOUTIAO_CHANNELS', this.myChannels)
            }
        }
    },
    // 计算属性会观测内部依赖数据的变化，如果依赖的数据发生变化，则计算属性会重新执行
    computed: {
        ...mapState(['user']),
        // 利用js高阶函数 简便写法
        // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中并返回
        // filter内部相当于定义了一个数组 
        recommendChannels() {
            return this.allChannels.filter(channel => {
                // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回
                return !this.myChannels.find(myChannel => myChannel.id === channel.id)
            })
        }

        // 稍微麻烦写法 相当于两次for循环
        // recommendChannels() {
        //     const channels = []
        //     this.allChannels.forEach(channel => {
        //         // find 遍历数组，找到满足条件的元素项
        //         const ret = this.myChannels.find(myChannel => {
        //             return myChannel.id === channel.id
        //         })
        //         // 如果我的频道中不包括改频道项，则收集到推荐频道中
        //         if(!ret) {
        //             channels.push(channel)
        //         }
        //     })
        //     // 把计算结果返回
        //     return channels
        // }
    }
}
</script>

<style lang="less" scoped>
.channel-edit {
    padding: 85px 0;

    .title-text {
        font-size: 32px;
        color: #333;
    }

    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    
    // 样式没生效 是作用域样式导致的 grid-item是根节点， .van-grid-item_content是非根节点
    /deep/ .grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
            white-space: nowrap;
            background-color: #f4f5f6;
            .van-grid-item__text, .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }
            .active {
                    color: red;
            }
            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }

    /deep/ .my-grid {
        .grid-item {
            .van-icon-clear {
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
        }
    }

    /deep/ .recommend-grid {
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
            }
        }
    }
}

</style>