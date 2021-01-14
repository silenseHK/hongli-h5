<template>
	<view>
		<view v-if="list.length">
			<view v-for="(order, index) in list" :key="index" >
				<mineOrder :order="order"></mineOrder>
			</view>
			<view style="padding: 30upx 0upx">
				<u-loadmore color="#6e7074"  margin-top="10" icon-type="flower" :load-text="productSearch.loadText" :status="productSearch.status" />
			</view>
		</view>
		<view v-else class="order">
			<image src="../../static/mine/my_order_empty_icon.61af44f5.png" mode="" class="order-img"></image>
			<text class="u-text-center">{{i18.records.body}}</text>
		</view>
	</view>
</template>

<script>
	import mineOrder from '../../components/mine-order/mine-order'

	export default {
		components:{
			mineOrder
		},
		data() {
			return {
				list:[],
				productSearch: {
					page: 1,
					size: 10,
					hasMore: true,
					status: 'loadmore',
					loadText: {}
				},
			};
		},
		computed: {
			i18() {
				const t = this.$t('index')
				//提示语
				this.productSearch.loadText = {
					loadmore: t.home.loadMore,
					loading: t.home.loading,
					nomore: t.home.noMore
				};
				return t
			}
		},
		watch: {
			"productSearch.page": function (){
				this.orders();
			}
		},
		onLoad() {
			this.orders();
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.mine.mineOrder
			})
		},
		onReachBottom() {
			if (!this.productSearch.hasMore) {
				return;
			}
			//加载更多数据
			this.productSearch.page ++;
		},
		methods: {
			async orders() {
				this.productSearch.status = 'loading';
				let options = {
					params: {
						page: this.productSearch.page,
						size: this.productSearch.size,
					}
				};
				const res = await this.$api.productOrders(options);
				let {data, code} = res;
				if (code === 200) {
					if (data.data && data.data.length) {
						this.list = this.list.concat(data.data)
						this.productSearch.status = 'loadmore';
					} else {
						this.productSearch.hasMore = false;
						this.productSearch.status = "nomore";
					}
					if (!data.next_page_url) {
						this.productSearch.hasMore = false;
						this.productSearch.status = "nomore";

					}

				} else {
						this.productSearch.hasMore = false;
						this.productSearch.status = "nomore";

				}
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
