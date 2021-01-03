<template>
	<view class="wrap">
		<view class="item u-border-bottom" v-for="(item, index) in recodeList" :key="index">
			<view class=" u-flex u-row-between">
				<text>{{i18.proxy.bankCard}}</text>
				<text>{{item.bank_number}}</text>
			</view>
			<view class=" u-flex u-row-between u-m-t-20 u-m-b-20">
				<text>{{i18.proxy.amout}}</text>
				<text>{{item.money}}</text>
			</view>
			<view class=" u-flex u-row-between u-m-t-20 u-m-b-20">
				<text>{{i18.proxy.status}}</text>
				<text v-if="item.status===0">{{i18.proxy.review}}</text>
				<text  v-else-if="item.status===1">{{i18.proxy.passed}}</text>
				<text v-else>{{i18.proxy.failed}}</text>
			</view>
			
			<view class=" u-flex u-row-between  u-m-t-20 u-m-b-20">
				<text>{{i18.proxy.bankCard}}</text>
				<text>{{item.create_time*1000|friendDate}}</text>
			</view>
			<view class=" u-flex u-row-between u-m-t-20 u-m-b-20">
				<text>{{i18.proxy.loan}}</text>
				<text>{{item.loan_time===null?'':item.loan_time*1000||friendDate}}</text>
			</view>
			<view class=" u-flex u-row-between" v-if="item.status==2">
				<text>{{i18.proxy.failing}}</text>
				<text>{{item.message}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				recodeList: [],

			}
		},
		onLoad() {
			this.getRecord()
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.proxy.applyNavbar
			})
		},
		methods: {
			async getRecord() {
				const {
					data,
					code
				} = await this.$api.requestRecord()
				if (code === 200) {
					this.recodeList = data
				
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
