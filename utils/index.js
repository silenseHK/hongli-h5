import Request from 'luch-request'
import baseUrl from './baseUrl.js'

const http = new Request()

/**
 * 可配置项
 * {
    baseURL: '',
    header: {},
    method: 'GET',
    dataType: 'json',
    // #ifndef MP-ALIPAY || APP-PLUS
    responseType: 'text',
    // #endif
    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: {}, // 全局自定义参数默认值
    // #ifdef MP-ALIPAY || MP-WEIXIN
    timeout: 30000,
    // #endif
    // #ifdef APP-PLUS
    sslVerify: true,
    // #endif
    // #ifdef H5
    // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
    withCredentials: false,
    // #endif
    // 局部优先级高于全局，返回当前请求的task,options。请勿在此处修改options。非必填
    // getTask: (task, options) => {
    // 相当于设置了请求超时时间500ms
    //   setTimeout(() => {
    //     task.abort()
    //   }, 500)
    // },
    // 全局自定义验证器。参数为statusCode 且必存在，不用判断空情况。
    validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
        return statusCode >= 200 && statusCode < 300
    }
  }
 */

/**
 * @description 修改全局默认配置
 * @param {Function}   
 */
http.setConfig((config) => { /* config 为默认全局配置*/
	// config.baseURL = 'https://api.999666.in/api/'; 
	// config.baseURL = 'https://api.bb188.in/api/'; 
	// config.baseURL = 'https://api.unicasino.in/api/'; 
	config.baseURL = baseUrl.phpUrl + 'api/'
	const token = uni.getStorageSync('token');

	config.header = {
		token,
		"Content-Type": "application/x-www-form-urlencoded"
	}
	return config
})

// 请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	uni.showLoading({
		mask: true
	})
	const token = uni.getStorageSync('token');
	
	config.header = {
		token: token

	}
	// 演示custom 用处
	// if (config.custom.auth) {
	// 	config.header.token = token
	// }
	// if (config.custom.loading) {
	// 	uni.showLoading()
	// }


	return config
}, config => {
	return Promise.reject(config)
})

// 响应拦截器
http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
	uni.hideLoading()
	if(response.data.code !== 200){
		uni.showToast({
			title: response.data.msg,
			icon: 'none'
		});
		switch(Number(response.data.code)){
			case 401:
				uni.removeStorageSync('token')
				uni.removeStorageSync('nikename')
				uni.removeStorageSync('money')
				uni.removeStorageSync('code')
				uni.removeStorageSync('commission')
				uni.removeStorageSync('id')
				uni.removeStorageSync('phone')
				uni.hideLoading()
				setTimeout(() =>{
					uni.navigateTo({
						url: '/pages/login/index'
					})
				},1200)
				break;
			default:
				uni.hideLoading()
				return response.data
		}
		return Promise.reject(response)
	}
	// return Promise.reject 可使promise状态进入catch
	// if (response.config.custom.verification) { // 演示自定义参数的作用
	//   return response.data
	// }

	return response.data
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
	uni.hideLoading()
	return Promise.reject(response)
})

export {
	http
}
