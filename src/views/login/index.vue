<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录"/>

        <!-- 登录的表单 -->
        <van-form @submit="onSubmit">
            <van-field
                name="手机号"
                placeholder="请输入手机号"
                v-model="user.mobile"
            >
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
                name="验证码"
                placeholder="请输入验证码"
                v-model="user.code"
                >
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
export default {
        name: 'LoginIndex',
        data() {
            return {
                user: {
                    mobile: '', // 手机号
                    code: '' // 验证码
                }
            }
        },
        created() {

        },
        methods: {
            onSubmit() {
                // 1. 获取表单数据
                const user = this.user
                // 2. 表单验证
                // 3. 提交表单请求登录
                // 4. 根据请求响应结果处理后续操作
            }
        }

}
</script>
<style lang="less" scoped>
    .login-container {
        .toutiao {
            font-size: 37px;
        }

        .send-sms-btn {
            width: 156px;
            height: 46px;
            line-height: 46px;
            background-color: #ededed;
            font-size: 22px;
            color: #666;
        }

        .login-btn-wrap {
            padding: 53px 33px;
            .login-btn {
                background-color: #6db4fb;
                border: none;
            }
        }
        
    }
</style>