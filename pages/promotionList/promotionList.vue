<template>
	<view>
		<view class="wrap">
			<view class="item u-border-bottom u-flex-col" v-for="(item, index) in videoList" :key="index">
				<view class="u-flex u-row-between ">
					<text>{{i18.proxy.name}}:</text>
					<text style="overflow: hidden;white-space: nowrap; text-overflow:ellipsis; width: 400upx;">{{item.nickname}}</text>
				</view>

				<view class="u-flex u-row-between  ">
					<text class="u-m-t-20">{{i18.proxy.phone}}:</text>
					<text>{{item.phone}}</text>
				</view>
			</view>
			<view v-show="isLoadMore">
				<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: 'loadmore',
					loading: 'loading',
					nomore: 'nomore'
				},
				videoList: [],

				page: 1,
				pagesize: 10,
				loadStatus: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore: false, //是否加载中
			}
		},
		onLoad() {
			this.getReach()
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.proxy.recharge
			})
		},
		onReachBottom() { //上拉触底函数
			if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
				this.isLoadMore = true
				this.page += 1
				this.getReach()
			}
		},
		methods: {
			

			//获取数据
			async getReach() {
				const params = {
					limit: this.pagesize,
					page: this.page
				}
				const {
					data,
					code
				} = await this.$api.requestExtension(params)
				if (code == 200) {
					if (data.list) {
						this.videoList = this.videoList.concat(data.list)
						if (data.length < this.pagesize) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
							this.isLoadMore = true
							this.loadStatus = 'nomore'
						} else {
							this.isLoadMore = false
						}
					} else {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					}
				} else { //接口请求失败的处理
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					this.isLoadMore = false
					if (this.page > 1) {
						this.page -= 1
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
		background: white;
	}

	.item {
		padding: 24rpx 20rpx;
		color: $u-content-color;
		font-size: 28rpx;

		box-shadow: 0 4upx 8upx 0 rgba(0, 0, 0, .2);
		border-radius: 10upx;
		margin: 20upx 0;
	}
</style>
