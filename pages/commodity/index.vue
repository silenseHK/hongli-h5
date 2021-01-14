<template>
	<view>
		<view class="top-bg-img">
			<view class="container-row">
				<!--<u-image :src="product.cover_img.path" height="600rpx"></u-image>-->
				<u-swiper :list="list"  height="600"></u-swiper>
			</view>

		</view>
		<view class="u-flex-col u-p-l-20">
			<text class="info-name-text u-flex-2"> {{product.name}}</text>
			<text class="info-price-text u-flex-1">₹ {{product.price}}</text>
			<text class="info-name-text">Quantity:</text>
			<u-number-box v-model="value"></u-number-box>

		</view>
		<view class="info-desc-box-title">
			<text>Description</text>
		</view>
		<view class="u-padding-left-10 u-padding-top-10 u-padding-bottom-90">
			<u-parse :html="product.content"></u-parse>
		</view>
		<!-- 列表区域 --emd -->
		<!-- 底部navbar--start -->
		<view class="bottm-navbar">
			<u-row gutter="12" class="bottom-icon">
				<u-col span="6" class="bottom-icon-navbar" style="justify-content: space-around;">
					<!--<u-image src="../../static/home/Customer.png" shape="circle" width="50rpx" height="50rpx"></u-image>-->
					<u-image src="../../static/commodity/shopping.png" width="50rpx" height="50rpx" @click="$Router.push({ name: 'index'})"></u-image>
					<u-image src="../../static/commodity/Shopwindow.png" width="50rpx" height="50rpx" @click="$Router.push({ name: 'shopping'})" ></u-image>
				</u-col>
				<u-col span="6">
					<view class="u-flex u-row-right">
						<u-button size="medium"  shape="square" hover-class="none" :class="product.buy_status == 1 ? 'bottom-btn' : 'bottom-btn-gray' " @click="goodsBuy" > Buy now </u-button>
					</view>
				</u-col>
			</u-row>
		</view>
		<!-- 底部navbar--emd -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				product: null,
				value: 0
			}
		},
		onLoad: function() {
			this.product = this.$Route.query.product
			this.initBanner();
		},
		methods: {
			initBanner() {
				let { banner } = this.product;
				let list = [];
				if (banner.length) {
					banner.map((item) => {
						list.push({
							"id": item.image_id,
							"image": item.path
						});
					});
				} else {
					list.push({
						"id": 1,
						"image": product.cover_img.path
					});
				}
				this.list = list;
			},
			async goodsBuy() {
				if (Number(this.product.buy_status) === 1) {
					if (this.value == 0) {
						this.$util.msg('Please set the purchase quantity')
						return;
					}
					let result = await this.$api.productBuy(this.product.product_id, this.value);
					if (result.code === 200) {
						this.$Router.push({
							name: 'mineOrder'
						})
					} else {
						this.$util.msg(result.msg || "error");
					}
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.top-bg-img {
		background: url(../../static/login_top.203ca855.png) no-repeat;
		height: 600rpx;
		// box-sizing: 100% 100%;

		.container-row {
			
			height: 400rpx;
			-webkit-box-shadow: 0 0.03rem 8rpx 0 rgba(0, 0, 0, .2);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, .5);
			background-color: #fff;
		}


	}

	.info-name-text {
		font-weight: bold;
		margin-top: 10rpx;
	}

	.info-price-text {
		font-size: 40rpx;
		color: #a7866e;
		padding: 10rpx 0;
	}

	.info-desc-box-title {
		border-bottom: 1rpx solid black;
		padding-bottom: 15rpx;
		font-size: 30rpx;
		color: #000;
		text-align: center;
		margin-top: 30rpx;
	}

	.info-desc-detail-title-text {
		font-size: 40rpx;
		color: #000;
		margin-top: 30rpx;
		padding-left: 20rpx;
	}

	.info-desc-detail-list {
		background-color: #E6C593;
		border-radius: 8rpx;
		margin-top: 30rpx;
		margin-bottom: 200rpx;
	}

	.left-text {
		height: 80rpx;
		line-height: 80rpx;
		color: white;

	}

	.left-right {
		height: 80rpx;
		line-height: 80rpx;
		color: black;
		font-size: 15rpx;
		padding-left: 20rpx;
	}

	.info-right {

		border-radius: 8rpx;
		margin-top: 30rpx;
		margin-bottom: 200rpx;
	}
	.bottm-navbar {
		background-color: #000000;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100vw;

		.bottom-icon {
			height: 100%;
			.bottom-icon-navbar{
				display: flex;
				justify-content: space-between;
			}
			.bottom-btn{
				color: #fff;
				background: #f0a74c;
				
			}
			.bottom-btn-gray {
				background: linear-gradient(#9b9b9b,#ccc);
			}
		}
	}
</style>
