<template>
	<view class="shopping">
			<view class="shopping-conteiner">
				<image src="../../static/shoping_car_empty_icon.7f75bee0.png" mode=""></image>
				<text class="shopping-text">{{i18.shop.content}}</text>
				<u-button type="primary" @click="handelShopping">{{i18.shop.gobuy}}</u-button>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.shop.shopNavbar
			})
		},
		methods: {
				
			handelShopping(){
				  this.$Router.pushTab({ name: "index" });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopping{
		display: flex;
		justify-content: center;
		align-items: center;
		
		.shopping-conteiner{
			margin-top: 150rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			.shopping-text{
				display: inline-block;
				width: 600rpx;
				margin-top: 50rpx;
				margin-bottom: 50rpx;
				text-align: center;
			}
		}
	}
</style>
