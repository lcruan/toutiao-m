// 请求模块

import axios from "axios";

const request = axios.create({
    // baseURL: 'http://toutiao.itheima.net/' // 接口的基准路径
    baseURL: ' http://121.199.14.144:7300/mock/62f3a06205a94a052e732dca/api' // 接口的基准路径

})

// 请求拦截器

// 响应拦截器

export default request