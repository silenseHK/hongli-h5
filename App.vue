
<script>
export default {
  onLaunch: function() {
	const tokenStr = uni.getStorageSync('token')
	if ( !tokenStr) {
		// console.log('没有登录')
	}
  },
 
};
</script>

<style lang="scss">
	uni-page{
		height: auto !important;
	}
	.app-customer{
		position: fixed;
		bottom: 180rpx;
		right: 36rpx;
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		background: #e2bf88;
		z-index: 9999;
	}
	.app-grouap{
		position: fixed;
		bottom: 180rpx;
		right: 166rpx;
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		background: #e2bf88;
		z-index: 9999;
	}
	.app-whates{
		position: fixed;
		bottom: 310rpx;
		right: 116rpx;
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		background: #e2bf88;
		z-index: 9999;
	}
	.service-bg{
		background: #e2bf88 !important;
	}
	.service-bg1{
		background: #999 !important;
	}
	page {
		height: 100%;
	}
@import "uview-ui/index.scss";
/*每个页面公共css */
</style>
