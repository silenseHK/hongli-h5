<template>
	<view>
		<uni-nav-bar :background-color="background" @clickLeft="handelLeft" @clickRight="handelRight" :color="color" :title="i18.proxy.proxyNavbar">

			<view slot="left">
				<u-icon name="arrow-left" size="40"></u-icon>
			</view>
			<view slot="right">{{i18.proxy.proxyNavbarRight}}</view>
		</uni-nav-bar>
		<!-- 内容区域 --start -->
		<view class="wrap">
			<view class="" v-if="rewardList.length===0">
				<u-empty text="No data" mode="list"></u-empty>
			</view>
			<view v-else>
				<view class="item u-border-bottom" v-for="(item, index) in rewardList" :key="index">
					<view class=" u-flex u-row-between">
						<text>Bank card</text>
						<text>{{item.bank.bank_num}}</text>
					</view>
					<view class=" u-flex u-row-between u-m-t-20 u-m-b-20">
						<text>application time</text>
						<text>{{item.create_time *1000|friendDate}}</text>
					</view>
					<view class=" u-flex u-row-between u-m-t-20 u-m-b-20">
						<text>Amount</text>
						<text>{{item.money}}</text>
					</view>
					<view class=" u-flex u-row-between u-m-t-20 u-m-b-20">
						<text>Status</text>
						<text v-if="item.status===0">Pending</text>
						<text v-if="item.status===1">examination passed</text>
						<text v-if="item.status===2">Audit failed</text>
					</view>

					<view class=" u-flex u-row-between  u-m-t-20 u-m-b-20">
						<text>Loan time</text>
						<text>{{item.loan_time*1000|friendDate}}</text>
					</view>
					<view class=" u-flex u-row-between  u-m-t-20 u-m-b-20" v-if="item.status===0">
						<text>reason</text>
						<text>{{item.message}}</text>
					</view>

				</view>
			</view>

		</view>
	</view>

</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				color: "white",
				background: 'black',
				rewardList: [],

			}
		},
		onLoad() {
			this.getReward()
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},

		methods: {
			handelLeft() {
				this.$router.go(-1)
			},
			handelRight() {
				this.getReward()
			},
			async getReward() {
				const {
					data,
					code
				} = await this.$api.requestReward()
				if (code === 200) {
					this.rewardList = data
					// console.log(data)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		background: #fff;
	}

	.item {

		box-shadow: 0 04rpx 10rpx 0 rgba(0, 0, 0, .2);
		border-radius: 15rpx;
		margin: 30upx;
		padding: 30upx;
	}
</style>
