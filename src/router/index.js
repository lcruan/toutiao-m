import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { // 登录
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  },
  { // 底部标签栏
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      { // 首页
        name: 'home',
        path: '', // 默认子路由
        component: () => import('@/views/home')
      },
      { // 我的
        name: 'my',
        path: '/my',
        component: () => import('@/views/my')
      },
      { // 问答
        name: 'qa',
        path: '/qa',
        component: () => import('@/views/qa')
      },
      { // 视频
        name: 'video',
        path: '/video',
        component: () => import('@/views/video')
      }
    ]
  },
  // 没有底部导航栏 另起一行
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router