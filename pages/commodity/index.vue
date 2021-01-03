<template>
	<view>
		<view class="top-bg-img">
			<view class="container-row">
				<u-image :src="commodityList.images" height="600rpx"></u-image>

			</view>

		</view>
		<view class="u-flex-col u-p-l-20">
			<text class="info-name-text"> Armitron Sport Women's 45/7034 Digital Chronograph Resin Strap Watch</text>
			<text class="info-price-text">₹ {{commodityList.money}}</text>
			<text class="info-name-text">Quantity:</text>
			<u-number-box v-model="value"></u-number-box>

		</view>
		<view class="info-desc-box-title">
			<text>Description</text>
		</view>
		<view class=" u-flex-col info-desc-detail-title-text">
			<text class=""> Product specifications </text>
			<text class="u-font-sm u-m-t-20"> Jewellery Information </text>
		</view>
		<!-- 列表区域 --start -->

		<view class="u-p-l-30">
			<u-row gutter="12">
				<u-col span="6" class="info-desc-detail-list">
					<template v-for="(item,index) in listLeft">
						<view :key="index" class="left-text">
							<text class="u-p-l-10">{{item.title}}</text>
							<u-line color="info" />
						</view>
					</template>
				</u-col>
				<u-col span="6" class="info-right">
					<template v-for="(item,index) in listRight">
						<view :key="index" class="left-right">
							<text class="u-p-l-10">{{item.title}}</text>
						</view>
					</template>
				</u-col>
			</u-row>

		</view>
		<!-- 列表区域 --emd -->
		<!-- 底部navbar--start -->
		<view class="bottm-navbar">
			<u-row gutter="12" class="bottom-icon">
				<u-col span="6" class="bottom-icon-navbar" style="justify-content: space-around;">
					<u-image src="../../static/home/Customer.png" shape="circle" width="50rpx" height="50rpx"></u-image>
					<u-image src="../../static/home/shopping.png" shape="circle" width="50rpx" height="50rpx" @click="$Router.push({ name: 'index'})"></u-image>
					<u-image src="../../static/home/Shopwindow.png" shape="circle" width="50rpx" height="50rpx" @click="$Router.push({ name: 'shopping'})" ></u-image>
				</u-col>
				<u-col span="6">
					<u-button size="medium"  shape="square" class="bottom-btn" >Sold Out</u-button>
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
				commodityList: null,
				value: 0,
				listLeft: [{
					title: 'manufacturer',
				}, {
					title: 'Package dimensions',
				}, {
					title: 'model',
				}, {
					title: ' Dial shape',
				}, {
					title: ' Table mirror material',
				}, {
					title: '  Display method',
				}, {
					title: ' Buckle type',
				}, {
					title: '  Dial material',
				}, {
					title: '   Calendar type',
				}, {
					title: '   Power type',
				}],
				listRight: [{
					title: 'Armitron Sport',
				}, {
					title: '4.06 x 3.9 x 2.91 cm',
				}, {
					title: '45/7034GLD',
				}, {
					title: ' Oval',
				}, {
					title: '  Resin',
				}, {
					title: ' Digital',
				}, {
					title: ' Tang Buckle',
				}, {
					title: '  Resin',
				}, {
					title: '  Day-Date-Month',
				}, {
					title: ' Quartz',
				}]
			}
		},
		onLoad: function() {
			this.commodityList = this.$Route.query.commodityList
			// console.log(this.commodityList)

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.top-bg-img {
		background: url(../../static/login_top.203ca855.png) no-repeat;
		height: 600rpx;
		// box-sizing: 100% 100%;

		.container-row {
			margin: -20rpx 15rpx;
			
			height: 400rpx;
			border-radius: 15rpx;
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
		background-color: black;
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
				background: linear-gradient(#9b9b9b,#ccc);
				
			}
		}
	}
</style>
