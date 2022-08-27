// 请求模块

import axios from "axios";
import store from '@/store'
import JSONBig from 'json-bigint'

// JSONBig 可以处理数据中超出 JavaScript 安全数据范围的问题
// JSONBig.parse() // 把JSON 格式的字符串转为 JavaScript 对象
// JSONBig.stringify() // 把 JavaScript 对象转为 JSON 格式的字符串
// 举例：
// const jsonStr = '{ "art_id": 1245953273786007552 }'
// console.log(JSON.parse(jsonStr)); // 1245953273786007600
// console.log(JSONBig.parse(jsonStr));
// 使用的时候需要把 BigNumber 类型的数据转为字符串来使用
// console.log(JSONBig.parse(jsonStr).art_id.toString()); // 1245953273786007552



const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/', // 接口的基准路径

    // 自定义后端返回的原始数据
    // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
    transformResponse: [
        function (data) {
            try {
                return JSONBig.parse(data)
            }catch(err) {
                return data;
            }
            // axios 默认会在内部这样处理后端返回的数据
            // return JSON.parse(data)
        }
    ]
    // baseURL: ' http://121.199.14.144:7300/mock/62f3a06205a94a052e732dca/api' // 接口的基准路径

})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // 请求发起会经过这里
    // config 配置对象，本次请求的配置对象
    const { user } = store.state
    if(user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
    return config;
}, function (error) {
    // 如果请求出错了，（请求还没有发出去）会进入这里
    return Promise.reject(error);
});
// 响应拦截器

export default request