<template>
    <div class="my-container">
        <div class="header not-login">
            <div class="login-btn" @click="$router.push('/login')">
                <img class="mobile-img" src="~@/assets/mobile.png" alt="">
                <span class="text">登录 / 注册</span>
            </div>
        </div>

        <div class="header user-info">
            <div class="base-info">

            </div>
            <div class="data-stats"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyIndex'
}
</script>

<style lang="less" scoped>
    .my-container {
        .header {
            height: 361px;
            background: url("~@/assets/banner.png");
            background-size: cover;
        }

        .not-login {
            display: flex;
            justify-content: center;
            align-items: center;
            .login-btn {
                flex-direction: column;
                display: flex;
                justify-content: center;
                align-items: center;
                .mobile-img {
                    width: 132px;
                    height: 132px;
                    margin-bottom: 15px;
                }
                .text {
                    font-size: 28px;
                    color: #fff;
                }
            }
        }

        .user-info {
            .base-info {
                height: 231px;
                background-color: pink;
                padding: 76px 32px 23px;
                box-sizing: border-box;
            }
            .data-stats {
                height: 130px;
                background-color: #ccc;
            }
        }
    }
</style>
