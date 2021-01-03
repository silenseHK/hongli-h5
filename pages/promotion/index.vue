<template>
	<view class="">
		<!-- 顶部区域--start -->
		<view class="promotion">
			<view class="u-p-l-40 u-p-r-40 u-p-t-20">
				<view class="header-box-info u-p-l-50 u-p-r-50 u-flex-col u-row-center ">
					<view class="u-font-xl info-text">
						<text v-if='money'>₹{{money}}</text>
					</view>
					<view class="header-menu-item u-flex u-row-between">
						<view>
							<text>{{i18.active.mabus}}</text>
						</view>
						<view @click="handelApply">{{i18.active.apply}}</view>
					</view>
				</view>
				<view class="u-flex u-row-between header-box-record-item">
					<view class="ecord-text" @click="handelDetail">
						{{i18.active.bonus}}
					</view>
					<view class="ecord-text" @click="handleReacrds">
						{{i18.active.record}}
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部区域--end -->
		<!-- 文字区域--start -->
		<view class=" u-p-l-40 u-p-r-40">
			<view class="header-promotion-box  u-flex u-row-between">
				<text class="u-font-35">{{i18.active.promotion}}</text>
				<text @click="handlePromo">{{i18.active.promotions}}</text>
			</view>
		</view>
		<!-- 文字区域--end -->
		<!-- tab区域--start -->
		<view class=" u-p-l-40 u-p-r-40">
			<view class="level-box">

				<u-tabs name="cate_name" bg-color="#e2bf88" bar-width="80" count="cate_count" :list="lists" :is-scroll="false"
				 :current="current" @change="change"></u-tabs>
				<view class="u-flex u-row-around u-m-t-50">
					<view class="u-flex-col u-col-center">
						<text>{{i18.active.total}}</text>
						<text class="level-text">{{promoter.number}}</text>
					</view>
					<view class="u-flex-col u-col-center">
						<text>{{i18.active.rupees}}</text>
						<text class="level-text">₹{{promoter.commission}}</text>
					</view>

				</view>
				<view class="level-bottom u-flex-col u-col-center" @click="handelnow">
					<text>{{i18.active.btnInvite}}</text>
					<text>{{i18.active.btnNow}}</text>
				</view>
			</view>
		</view>
		<!-- tab区域-- end -->
	</view>
</template>

<script>
	export default {


		data() {
			return {
				lists: [{
					cate_name: ' Level1 '
				}, {
					cate_name: ' Level2'
				}],
				current: 0,
				money: null,
				promoter: {
					commission: '',
					number: 0,
				},

			}
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onLoad() {
			this.status = 1
			this.getrecommend(1)
			// this.money = uni.getStorageSync('commission')
			this.lists[0].cate_name = this.i18.active.level1
			this.lists[1].cate_name = this.i18.active.level2
		},
		activated() {
			this.money = null
			this.getrecommend(1)
			// this.money = uni.getStorageSync('commission')
		},

		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.active.promotionNavbar
			})

		},
		methods: {
			change(index) {
				this.money = null
				this.getrecommend(index + 1)
				this.status = index + 1;
				this.current = index;
			},

			handelDetail() {
				this.$Router.push({
					name: 'detailSub'
				})

			},

			handelnow() {
				this.$Router.push({
					name: 'friends'
				})
			},
			handelApply() {
				// this.$Router.push({
				// 	name: 'applyBalance',
				// 	query: { status: this.status}
				// })
				uni.navigateTo({
					url: './applyBalance?status=' + this.status
				})
			},
			//获取一级二级分佣
			async getrecommend(status) {
				const params = {
					status: status
				}
				const data = await this.$api.requestRecommend(params)
				if (data.code === 200) {
					let res = data.data
					this.promoter.commission = res.commission
					this.promoter.number = res.number
					this.money = res.total_commission
				}

			},
			handleReacrds() {
				this.$Router.push({
					name: 'application'
				})
			},
			handlePromo() {
				this.$Router.push({
					name: 'promotionList'
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.promotion {
		background: url(../../common/promotion/my_promotion_top.jpg) no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 450rpx;

		.header-box-info {

			padding: 0 50rpx;
			border-radius: 10rpx;
			background-color: #5d5d5d;
			height: 200rpx;

			padding: 30rpx;
			margin: auto;
			color: white;


			.info-text {
				font-size: 40rpx;
				margin-bottom: 10rpx;
				min-height: 50rpx;
			}


		}

		.header-box-record-item {
			padding: 0 50rpx;
			color: white;
			margin-top: 80rpx;
			font-size: 34rpx;

			.ecord-text {
				border-bottom: 1px solid #eee;
			}
		}
	}

	.header-promotion-box {

		height: 100rpx;

		border-radius: 8rpx;
		margin-top: -40rpx;


		background-color: white;
		box-shadow: 0 0.10rpx 10rpx 0 rgba(0, 0, 0, .2);
		padding: 0 20rpx;
		font-size: 30rpx;
	}

	.level-box {
		box-shadow: 0 0.10rpx 10rpx 0 rgba(0, 0, 0, .2);
		height: 380rpx;

		border-radius: 8rpx;
		margin-top: 60rpx;


		background-color: white;

		.level-text {
			font-weight: bold;
			font-size: 30rpx;
			margin-top: 10rpx;
		}
	}

	.level-bottom {
		background-color: #a7866e;
		color: white;
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 90rpx;
		padding: 15rpx 0;
		border-bottom-left-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
		cursor: pointer;
	}
</style>
