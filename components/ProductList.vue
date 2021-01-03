<template>
	<view class="product-box">
		<view class="product-box-title">
			<text>{{i18.active.products1}}</text>
			<text class="product-box-title-text" @click="ruleDetails">{{i18.active.rules}} ></text>
		</view>
		<view class="product-box-body">
			<block v-for="(item) in signList">
				<view class="product-box-body-item" :key="item.id">
					<image class="product-box-body-img" src="../static/activity/sign_product_1.40a3bccc.png" mode=""></image>
					<!-- <text>{{item.name}}</text> -->
					<view class="product-box-body-text">
						<view class="product-box-body-text-left">
							<text> {{i18.active.income}}: ₹ {{item.daily_rebate}} </text>
							<text> {{i18.active.price}}: ₹ {{item.amount}} </text>
						</view>
						<view class="product-box-body-text-right1" v-if="item.button_type===1" @click="handelBuy(item.id)">
							<view>
								{{i18.active.buy}}
							</view>
						</view>
						<view class="product-box-body-text-right2" v-else-if="item.button_type===2" @click="handelReceive(item.id)">
							<view>
								R{{i18.active.receive}}
							</view>
						</view>
						<view class="product-box-body-text-right" v-if="item.button_type===3">
							<view>
								{{i18.active.sold}}
							</view>
						</view>
					</view>
				</view>
			</block>


			<!-- <view class="product-box-body-item">
				<image class="product-box-body-img" src="../static/activity/sign_product_2.3f9c9132.png" mode=""></image>
	
				<view class="product-box-body-text">
					<view class="product-box-body-text-left">
						<text> Daily income: ₹ 18 </text>
						<text> Price: ₹ 1000 </text>
					</view>
					<view class="product-box-body-text-right">
						<view>
							Sold out
						</view>
					</view>
				</view>
			</view>
			<view class="product-box-body-item">
				<image class="product-box-body-img" src="../static/activity/sign_product_1.3f9c9132.png" mode=""></image>
	
				<view class="product-box-body-text">
					<view class="product-box-body-text-left">
						<text> Daily income: ₹ 50 </text>
						<text> Price: ₹ 2500 </text>
					</view>
					<view class="product-box-body-text-right">
						<view>
							Sold out
						</view>
					</view>
				</view>
			</view>
			<view class="product-box-body-item">
				<image class="product-box-body-img" src="../static/activity/sign_product_4.3f9c9132.png" mode=""></image>
	
				<view class="product-box-body-text">
					<view class="product-box-body-text-left">
						<text> Daily income: ₹ 132 </text>
						<text> Price: ₹ 6000 </text>
					</view>
					<view class="product-box-body-text-right">
						<view>
							Sold out
						</view>
					</view>
				</view>
			</view>
			<view class="product-box-body-item">
				<image class="product-box-body-img" src="../static/activity/sign_product_5.4e0dcc7d.png" mode=""></image>
	
				<view class="product-box-body-text">
					<view class="product-box-body-text-left">
						<text> Daily income: ₹ 360 </text>
						<text> Price: ₹ 15000 </text>
					</view>
					<view class="product-box-body-text-right">
						<view>
							Sold out
						</view>
					</view>
				</view>
			</view>
			<view class="product-box-body-item">
				<image class="product-box-body-img" src="../static/activity/sign_product_6.99a51e89.png" mode=""></image>
	
				<view class="product-box-body-text">
					<view class="product-box-body-text-left">
						<text> Daily income: ₹ 1170 </text>
						<text> Price: ₹ 45000 </text>
					</view>
					<view class="product-box-body-text-right">
						<view>
							Sold out
						</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			signList: {
				type: Array
			},
			updates:{
				type:Function
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			i18(){
				return this.$t('index')
			}
		},
		methods: {
			ruleDetails() {
				this.$Router.push({
					name: 'signRule'
				})
			},
			async handelBuy(id) {
			
			const params = {
				product_id: id
			}
				const data = await this.$api.buySignIn(params);
				if(data.code===200) {
					this.$util.msg('Successful purchase')
					this.updates()
				} else {
						this.$util.msg('Eror purchase')
				}
				// console.log(data.data)

			},
			async handelReceive(id) {
				// console.log(id)
				const params = {
					product_id: id
				}
				const data = await this.$api.getMoney(params);
				if(data.code===200) {
					this.$util.msg('Successful purchase')
					this.updates()
				} else {
						this.$util.msg('Eror purchase')
				}
				// console.log(data.data)
			}
			
		}

	}
</script>

<style scoped lang="scss">
	.product-box {
		padding: 0 30rpx;

		&-title {
			display: flex;
			justify-content: space-between;
			font-weight: bold;

			&-text {
				color: #9e3200;
			}
		}

		&-body {
			margin-top: 30rpx;

			&-item {
				margin: 30rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			&-img {
				width: 150rpx;
				height: 150rpx;
			}

			&-text {
				background-image: linear-gradient(0deg, #e2bf88, #f7dec3);
				height: 110rpx;
				border-radius: 8rpx;
				margin-left: -50rpx;
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&-left {
					display: flex;
					flex-direction: column;
					padding-left: 60rpx;
					font-weight: bold;
					color: #775e4e;
				}

				&-right {
					margin-right: 50rpx;
					background-color: #999;
					padding: 10rpx 15rpx;
					border-radius: 8rpx;
					color: white;
					opacity: .6;
				}
			}
		}
	}

	.product-box-body-text-right1 {
		background-color: green;
		margin-right: 40rpx;
		padding: 10rpx 20rpx;
		border-radius: 8rpx;
		color: white;
		opacity: .6;
	}

	.product-box-body-text-right2 {
		background-color: green;
		margin-right: 40rpx;
		padding: 10rpx 20rpx;
		border-radius: 8rpx;
		color: white;
		opacity: .6;
	}
</style>
