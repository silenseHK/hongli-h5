<template>
	<view>
		<!-- 客服中心 --start -->
		<view>
			<view class="app-customer" @click="handelService" :class="isServer?'service-bg1':'service-bg'" v-show="isGroup">
				<view class=" u-flex-col u-row-center u-p-t-20">
					<image src="../../static/service.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<!-- <text class="u-text-center" style="color: white; font-size: 20upx;">Service</text> -->
					<text class="u-text-center" style="color: white; font-size: 20upx;">{{i18.tabbar.service}}</text>
				</view>
			</view>
			<view class="" v-if="isServer">
				<view class="app-grouap  u-flex-col u-row-center u-p-t-10" @tap="handelservices">
					<image src="../../static/phoneicon.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<!-- <text class="u-text-center u-p-b-20" style="color: white; font-size: 20upx;">Group</text> -->
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 20upx;">{{i18.tabbar.group}}</text>
				</view>
				<view class="app-whates  u-flex-col u-row-center u-p-t-10" @tap="handelGrop">
					<image src="../../static/whatsapp.f636c058.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<!-- <text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx;">WhatsApp</text> -->
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx;">{{i18.tabbar.whatsApp}}</text>
				</view>


			</view>
		</view>
		<!-- 客服中心 --end-->
		<!-- 轮播图 --start -->
		<view class="wrap ">
			<u-swiper :list="list" height="400"></u-swiper>
		</view>
		<!-- 轮播图 --end -->
		<!-- 列表 --start -->
		<view class="u-p-l-50 u-p-r-50 active">
			<text class=" u-font-xl active-title">{{i18.active.activeTitle}}</text>

			<view class="active-img" @click="handelActive">
				<image src="../../static/activity/activity_01.png" style="width: 100%; height: 100%;"></image>
			</view>
			<view class="active-img" @click="handelActive2">
				<image src="../../static/activity/activity_02.png" style="width: 100%; height: 100%;"></image>
			</view>
			<view class="active-img u-m-b-100" @click="handelActive3" style="margin-bottom: 150upx;">
				<image src="../../static/activity/activity_03.png" style="width: 100%; height: 100%;"></image>
			</view>
			<!-- <view class="active-img" @click="handelActive4">
				<image src="../../static/activity/activity_04.png" style="width: 100%; height: 100%;"></image>
			</view> -->


		</view>
		<!-- 列表 --end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isGroup: false,
				isServer: false,
				list: [{
						image: '../../static/activity/activity_banner_01.png',
						title: 'banner'
					},
					{
						image: '../../static/activity/activity_banner_02.png',
						title: 'banner'
					},
					{
						image: '../../static/activity/activity_banner_03.png',
						title: 'banner'
					}
				],
				imgList: [{
						images: '../../static/activity/activity_01.png'
					}, {
						images: '../../static/activity/activity_02.png'
					}, {
						images: "../../static/activity/activity_03.png"
					},
					{
						images: "../../static/activity/activity_04.png"
					}
				]
			}
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.active.navbar
			})
		},
		onShow() {
			const token = uni.getStorageSync('token')

			if (token) {
				this.isGroup = true
				return;
			}
			this.isGroup = false
		},
		methods: {
			handelActive() {
				this.$Router.push({
					name: 'promotion'
				})
			},
			handelActive2() {
				this.$Router.push({
					name: 'signIn'
				})
			},
			handelActive3() {
				this.$Router.push({
					name: 'envelope'
				})
			},
			handelActive4() {
				this.$Router.push({
					name: 'redEnv'
				})
			},
			handelService() {
				this.isServer = !this.isServer;
			},
			async handelservices() {
				const data = await this.$api.getGroup()
				if (data.code === 200) {
					// window.open('_blank').location = data.data.whats_group_url
					window.location.href= data.data.whats_group_url
				}
			},
			async handelGrop() {
				const data = await this.$api.getservice()

				if (data.code === 200) {
					// this.$Router.replace({
					// 	name: data.data.whats_service_url
					// })
					// window.open(data.data.whats_service_url)
					window.location.href= data.data.whats_service_url
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		padding-top: 25rpx;


		.active-title {
			color: red;
			font-weight: bold;
		}

		.active-img {
			border-radius: 50rpx;
			height: 300rpx;
			margin: 30rpx 0;
			width: 100%;
		}
	}
</style>
