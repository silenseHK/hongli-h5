import baseUrl from './baseUrl'
export let getBalanceMoney = function(){
	uni.request({
		url: baseUrl.phpUrl + 'api/user/info',
		header: {'token': uni.getStorageSync('token')},
		success: (resp) =>{
			let res = resp.data
			if(res.code == 200){
				return res.data.balance
			}
		},
		fail: (error) => {
			uni.showToast({
				title: error,
				icon: 'none'
			})
		},
		complete: () =>{
			uni.hideLoading()
		}
	})
} 