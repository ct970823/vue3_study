import {  ref } from 'vue'
// 引入axios
import axios from 'axios'
// 发送ajax请求

export default function<T> (url:string) {
    // 加载状态
    const loading = ref(true)
    // 请求成功数据
    const data = ref<T | null>(null) //因为不知道返回的数据是数组还是对象，所以直接使用泛型
    // 错误信息
    const errorMsg = ref('')
    // 发送请求
    setTimeout(()=>{
        axios.get(url).then(res=>{
            data.value = res.data
        }).catch(err=>{
            errorMsg.value = err.message || '未知错误'
        }).finally(()=>{
            // 改变加载状态
            loading.value = false
        })
    },3000)

    return {
        loading,
        data,
        errorMsg
    }
}