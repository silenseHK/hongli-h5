<template>
	<view>
		<view class="info-box-top">
			<view class="info-box-contentbox">
				<view class="info-box-contentbox-top">
					<view class="info-box-contentbox-btn">
						<text class="u-text-right"> </text>
					</view>
					<view class="u-text-center info-box-contentbox-body">
						<text class="info-box-contentbox-text"> ₹ {{money}}</text>
						<view shape="square" class="info-btn"> {{i18.active.btnNO}} </view>
						<!-- <text class="body-text">{{i18.active.balance}} ₹ 1,216 </text> -->
						<text class="body-text"></text>
					</view>
					<view class="info-box-bottom">
						<view class="info-box-bottom-item">
							<text class="u-font-35 info-box-bottom-item-text"> ₹ {{activeData.packageCount}} </text>
							<text class="u-text-center">{{i18.active.products}}</text>
						</view>
						<view class="info-box-bottom-item">
							<text class="u-font-35 info-box-bottom-item-text"> ₹ {{activeData.totalAmount}}</text>
							<text class="u-text-center">{{i18.active.totalValue}}</text>
						</view>
						<view class="info-box-bottom-item">
							<text class="u-font-35 info-box-bottom-item-text"> ₹ {{activeData.rewardAmount}} </text>
							<text class="u-text-center">{{i18.active.totalValue2}}</text>
						</view>
					</view>

				</view>

			</view>

		</view>
		<view class="signin-img">
			<image class="signin-img-item" src="../../static/activity/sign_in_invite_bg.859c1b4c.png" mode="" @click="linkActivity"></image>
		</view>
		<ProductList :signList="singnInList" :updates="handelChild"></ProductList>
		<view class="signin-footer">
			<view class="signin-footer-title">
				{{i18.active.info}}
			</view>
			<TonyScroll :list="paoductList" ref="signref"></TonyScroll>
		</view>
	</view>
</template>

<script>
	import ProductList from '../../components/ProductList.vue'
	import TonyScroll from '../../components/TonyScroll/tony-scroll.vue'
	export default {
		components: {
			ProductList,
			TonyScroll
		},
		data() {
			return {
				singnInList: [],
				paoductList: [
				],
				times:null,
				activeData:{}
			}
		},
		onLoad() {
			this.money = uni.getStorageSync('money')
		},
		onShow() {
			this.getSingnIns()
			this.getInfoLists()
			this.activityList()
		},
		onUnload(){
			if(this.times) {
				clearTimeout(this.times)
				 this.times = null;  
			}
		},
		computed:{
			i18(){
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.i18.active.signNavbar
			})
		},
		methods: {
			/* 
				获取每日签到列表
			 */
			async getSingnIns() {
				const {
					data,
					code
				} = await this.$api.getSignIn()
				if (code === 200) {
					this.singnInList = data
				}

			},
			handelChild() {
				// console.log('执行了')
				this.getSingnIns()
			},
			/*
			 获取回扣记录
			 */
			async getInfoLists() {
				const {code,data} = await this.$api.getInfoList()
				if(code===200){
					this.paoductList= data
					//TODO 定时器
					this.times = setTimeout(()=>{
						try{
							this.$refs.signref.handelClick()
						}catch(e){
							//TODO handle the exception
							// console.log(e)
							
						}
					},1000)
				}
			},
			async activityList(){
				const {data,code} = await this.$api.getactive()
				if(code===200){
					this.activeData = data
					// console.log(this.activeData)
				}
			},
			linkActivity(){
				this.$Router.push({
					name:'promotion'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-box-top {

		background: url(../../static/activity/sing-bg.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		width: 100%;


		.info-box-contentbox {
			margin: 20rpx;
			width: 92%;
			height: 240rpx;
			z-index: 1;

			&-top {
				width: 100%;
				height: 340rpx;
				border-radius: .05rem;
				background: url(../../static/activity/sign_in_info_bg.c397f87d.png) no-repeat;
				background-size: 100% 100%;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
			}

			&-btn {
				display: flex;
				color: #9e3200;
				font-size: 30rpx;
				font-weight: 700;
				justify-content: flex-end;
				width: 100%;
				padding: 20rpx;
			}

			&-text {
				font-size: 50rpx;
				font-weight: 700;
			}

			&-body {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.info-btn {
				padding: 0;
				width: 220rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 25rpx;
				color: #fad295;
				z-index: 1;
				background: black;
				border-radius: 40rpx;
				opacity: .5;
				margin: 15rpx 0;
			}

			.body-text {
				color: #a88571;
				font-weight: bold;
				font-size: 30rpx;

			}

		}

	}

	.info-box-bottom {
		display: flex;
		justify-content: space-between;
		margin-top: 120rpx;

		&-item {
			margin-top: -100rpx;
			width: 32%;
			height: 200rpx;
			box-shadow: 0 5rpx 8rpx 0 rgba(0, 0, 0, .35);
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 20rpx;
			font-size: 30rpx;

			&-text {
				font-weight: bold;
			}
		}
	}

	.signin-img {
		padding-top: 500rpx;

		&-item {
			height: 100rpx;
			width: 100%;
			margin: 40rpx 0;
		}
	}

	.signin-footer {
		background: url(../../static/activity/sign_in_ranking_bg.5e17c341.png) no-repeat;
		background-size: 100% 100%;
		padding: 0 30rpx;
		height: 600rpx;

		&-title {
			font-weight: bold;
			padding-top: 20rpx;
			font-size: 35rpx;
		}
	}
</style>
