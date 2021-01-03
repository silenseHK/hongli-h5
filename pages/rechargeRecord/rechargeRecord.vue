<template>
	<view>
		<view class=" u-p-l-30 u-p-r-30">
			<u-subsection mode="subsection" bold class="u-m-t-20 tab-switch" button-color="#cfa65f" @change="submenu" bg-color="white"
			 inactive-color="#cfa65f" :list="lists" :current="0" :animation="true" active-color="#cfa65f"></u-subsection>
		</view>
		<!-- 中间数据 -->
		<!-- @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" 此三个方法必须写 -->
		<!-- <view class="list"  @touchmove="touchmove" @touchend="touchend">
	
			<sib-list ref="sibList"  @scrolltolowerFn="scrolltolowerFn" :isNotMore="isNotMore"
			 :notMoreText="notMoreText">
			
			</sib-list>
		</view> -->
		<view class="">
			<!-- 内部block可自定义 -->
			<block class="">
				<view class="silver-item" v-for="(item, index) in list" :key="index" @click="handleCards(item.native_url)">
					<view class="u-p-30 u-flex u-row-between u-m-t-10" style="height: 100upx; margin-top: 20upx;">
						<view class="">
							<u-icon name="coupon-fill" class="u-font-30"></u-icon>
							<text class=" u-font-28 u-m-l-20">{{i18.records.no}}</text>
						</view>
						<text class="">
							{{item.order_no }}
						</text>
					</view>
					<view class="u-p-20 u-flex u-row-between u-m-t-10" style="height: 20upx;">
						<view class="">
							<u-icon name="clock" class="u-font-30 u-m-l-10"></u-icon>
							<text class=" u-font-28  u-m-l-20">{{i18.records.time}}</text>
						</view>
						<text class="">
							{{item.time*1000|friendDate}}
						</text>
					</view>
					<view class="u-p-20 u-flex u-row-between u-m-t-30" style="height: 20upx;">
						<view class="">
							<u-icon name="coupon-fill" class="u-font-30  u-m-l-10"></u-icon>
							<text class=" u-font-28  u-m-l-20">{{i18.records.amount}}</text>
						</view>
						<text class="">
							{{item.money}}
						</text>
					</view>
				</view>
			</block>
		</view>

		<!-- 底部固定 -->
		<!-- <u-loadmore :status="status" /> -->
		<view v-show="isLoadMore">
			<!-- <uni-load-more :status="loadStatus"></uni-load-more> -->
			<u-loadmore :status="loadStatus" :icon-type="iconType" />
		</view>
	</view>
</template>

<script>
	import SibList from '../../components/SibList.vue'
	export default {
		components: {
			SibList
		},
		data() {
			return {
				lists: [{
						name: '  Pending  '
					},
					{
						name: '  Success  '
					},
					{
						name: '  Fail  '
					}
				],
				list: [],
				isNotMore: false,
				notMoreText: '',
				currentIndex: 1,
				limit: 100,

				status: 'loadmore',
				page: 1,
				pagesize: 10,
				loadStatus: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore: false, //是否加载中
				iconType: 'flower',
				
			}
		},
		onLoad() {
			this.getRecharge()
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.records.recordMavbar
			})
			this.lists[0].name = this.i18.records.pending;
			this.lists[1].name = this.i18.records.success;
			this.lists[2].name = this.i18.records.fail;
		},
		onReachBottom() { //上拉触底函数
			if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
				this.isLoadMore = true
				this.page += 1
				this.getRecharge()
			}
		},

		methods: {
			submenu(index) {
				this.currentIndex = index + 1
				this.list = []
				this.page = 1;
				this.getRecharge()
			},
			// 刷新touch监听


			async getRecharge() {

				const params = {
					status: this.currentIndex,
					limit: this.pagesize,
					page: this.page
				}
				const {
					data,
					code
				} = await this.$api.getRechargeList(params)
				if (code === 200) {
					if (data) {
						this.list = this.list.concat(data)
						if (data.length < this.pagesize) {
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
						title: data.msg,
						icon: 'none'
					})
					this.isLoadMore = false
					if (this.page > 1) {
						this.page -= 1
					}
				}

			},

			handleCards(url) {
				// window.open(url)
				window.location.href = url
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {

		text-align: center;
		line-height: 100px;
	}

	.silver-item {

		border-radius: 15upx;

		margin: 20upx 30upx;
		height: 260upx;
		box-shadow: 0 04rpx 10rpx 0 rgba(0, 0, 0, .2);
	}
</style>
