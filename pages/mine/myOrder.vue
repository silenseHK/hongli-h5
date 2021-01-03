<template>
	<view>
		<NavTabs :modelData="orderList" :initIndex="currentIndex" @change="handelChange"></NavTabs>
		
		</u-tabs>
		<view class="order">
			<image src="../../static/mine/my_order_empty_icon.61af44f5.png" mode="" class="order-img"></image>
			<text class="u-text-center">{{i18.records.body}}</text>
		</view>
	</view>
</template>

<script>
	import NavTabs from '../../components/NavTabs/NavTabs.vue'
	export default {
		components:{
			NavTabs
		},
		data() {
			return {
				currentIndex: 0,
				orderList: [{
					label: 'Processing '
				}, {
					label: 'Shipped '
				}, {
					label: 'Complete ',

				}, {
					label: 'Return',

				}, {
					label: 'Canceled',

				}],
			};
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onLoad() {
			const {Processing,Shipped,Complete,Return,Canceled} = this.i18.records
			// console.log( this.i18.records)
			this.orderList[0].label=Processing
			this.orderList[1].label=Shipped
			this.orderList[2].label=Complete
			this.orderList[3].label=Return
			this.orderList[4].label=Canceled
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.records.envelopeNavbar
			})
		},
		methods: {
			handelChange(index) {
			
			}
		}
	}
</script>

<style lang="scss">
	.order{
		margin-top: 100upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.order-img{
			width: 300upx;
			height: 300upx;
			margin-bottom: 50upx;
		}
	}
</style>
