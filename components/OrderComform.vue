<template>
	<view>
		<view :class="colors1">
			<text>{{title1}}</text>
		</view>
		<view class="contract">
			<view>
				<view>
					<text>{{title2}}</text>
				</view>
				<view class="u-flex">
					<block v-for="(item,index) in orderList">
						<text class="contract-box" :key="index" @click="handelContract(index)" :class="[contractIndex==index?`${colos}`:'']">
							{{item.num}}
						</text>
					</block>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title2: {
				type: String,
				default: "未知"
			},
			title1: {
				type: String,
				default: "未知"
			},
			orderList: {
				type: Array,

			},
			colos: {
				type: String,
			},
			colors1: {
				type: String
			}
		},
		data() {
			return {
				contractIndex: 0,
			};
		},
		methods: {
			// 点击contrct
			handelContract(index) {
				this.contractIndex = index
			}
		}
	}
</script>

<style lang="scss">
	.silver1 {
		background: #2cc747;
		height: 90rpx;
		padding: 0 20rpx;
		line-height: 90rpx;
		color: white;
		font-size: 35rpx;
		font-weight: bold;
	}

	.silver2 {
		background: red;
		height: 90rpx;
		padding: 0 20rpx;
		line-height: 90rpx;
		color: white;
		font-size: 35rpx;
		font-weight: bold;
	}

	.silver3 {
		background: #8b6de9;
		height: 90rpx;
		padding: 0 20rpx;
		line-height: 90rpx;
		color: white;
		font-size: 35rpx;
		font-weight: bold;
	}

	.silver4 {
		background: #a88571;
		height: 90rpx;
		padding: 0 20rpx;
		line-height: 90rpx;
		color: white;
		font-size: 35rpx;
		font-weight: bold;
	}

	.contract {
		padding: 0 20rpx;
		color: black;
		margin-top: 15rpx;

		.contract-box {
			margin-top: 20rpx;
			padding: 15rpx 25rpx;
			width: 130rpx;
			text-align: center;
			background-color: #eee;
			margin-right: 15rpx;
			border-radius: 8rpx;
		}
	}

	.active-bg-1 {
		background: #2cc747 !important;
	}

	.active-bg-2 {
		background: #2cc747 !important;
	}

	.active-bg-3 {
		background: #2cc747 !important;
	}

	.active-bg-4 {
		background: #2cc747 !important;
	}
</style>
