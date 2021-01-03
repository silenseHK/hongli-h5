import baseUrl from './baseUrl.js'

let $ajax = (url,parms) =>{
	// 防止parms不传，对象解构赋值报错
	let {mybaseUrl,data,method,hideShowLoading,hideShowErr,goHideLoading,noauto} = {...parms}
	// console.log('parms--->',parms)
	return new Promise((resolve,reject) => {
		uni.request({
			url: (mybaseUrl ? mybaseUrl : baseUrl.phpUrl + 'api/') + url,
			header: { 
				token:uni.getStorageSync('token'),
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: method ? method.toUpperCase() : 'GET',
			data,
			success: resp =>{
				if(!hideShowLoading) uni.showLoading()
				let res = resp.data
				if(noauto){
					resolve(res.data)
				}else{
					let code = res.code
					if(code == 200){
						resolve(res.data)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						switch(Number(code)){
							case 401:
								uni.hideLoading()
								setTimeout(() =>{
									uni.navigateTo({
										url: '/pages/login/index'
									})
								},1200)
								break;
						}
					}
				}
			},
			fail: err =>{
				reject(err)
				if(!hideShowErr){
					uni.showToast({
						title: err,
						icon: 'none'
					})
				} 
			},
			complete: () => {
				if(!goHideLoading) uni.hideLoading()
			}
		})
	})
}

export default $ajax