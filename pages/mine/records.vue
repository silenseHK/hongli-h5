<template>
	<view>
		<!-- <uni-nav-bar :background-color="background" @clickLeft="handelLeft" @clickRight="handelRight" :color="color" :title="i18.records.recordsNavbar">

			<view slot="left">
				<u-icon name="arrow-left"></u-icon>
			</view>
			<view slot="right">Refresh</view>
		</uni-nav-bar> -->
		
		<view class=" u-p-l-30 u-p-r-30">
			<u-subsection mode="subsection" bold class="u-m-t-20 tab-switch" button-color="#cfa65f" @change="submenu" bg-color="white"
			 inactive-color="#cfa65f" :list="lists" :current="0" :animation="true" active-color="#cfa65f"></u-subsection>
		</view>
		
		<view>
			<view class="u-p-l-20 u-p-r-20 silver-card ">
				<block v-for="(item,index) in withdrawal" :key="index">
					<view class=" u-p-20 u-m-t-20 silver-item" :key="index">
						<!-- 2----------------------- -->

						<!-- 3------------------- -->
						<u-row gutter="12" class="u-m-t-30">
							<u-col span="4">
								<view class="text-color">
									<u-icon name="order" class="u-font-30"></u-icon>
									<text class="u-m-l-15 u-font-28">No</text>
								</view>
							</u-col>
							<u-col span="8"><text class="u-flex-1 u-m-l-60">
									{{item.order_no}}
								</text></u-col>
						</u-row>
						<u-row gutter="12" class="u-m-t-30">
							<u-col span="4">
								<view class="text-color">
									<u-icon name="minus-square-fill" class="u-font-30"></u-icon>
									<text class="u-m-l-15 u-font-28">Bank name</text>
								</view>
							</u-col>
							<u-col span="8"><text class="u-flex-1 u-m-l-60">
									{{item.bank_name}}
								</text></u-col>
						</u-row>
						<u-row gutter="12" class="u-m-t-30">
							<u-col span="4">
								<view class="text-color">
									<u-icon name="minus-square-fill" class="u-font-30"></u-icon>
									<text class="u-m-l-15 u-font-28">Bank card</text>
								</view>
							</u-col>
							<u-col span="8"><text class="u-flex-1 u-m-l-60">
									{{item.bank_number}}
								</text></u-col>
						</u-row>
						
						<!-- 4--------------- -->
						<u-row gutter="12" class="u-m-t-30">
							<u-col span="4">
								<view class="text-color">
									<u-icon name="clock" class="u-font-30"></u-icon>
									<text class="u-m-l-15 u-font-28">{{i18.records.time}}</text>
								</view>
							</u-col>
							<u-col span="8"><text class="u-flex-1 u-m-l-60">
									{{item.create_time*1000|friendDate}}
								</text></u-col>
						</u-row>
						<!-- 5---------------------- -->



						<!-- 7------------ -->
						<u-row gutter="12" class="u-m-t-30">
							<u-col span="4">
								<view class="text-color">
									<u-icon name="coupon-fill" class="u-font-30"></u-icon>
									<text class="u-m-l-15 u-font-28">Fee</text>
								</view>
							</u-col>
							<u-col span="8"><text class="u-flex-1 u-m-l-60">
									{{item.money}}
								</text></u-col>
						</u-row>
						<!-- 8---------------- -->
						<u-row gutter="12" class="u-m-t-30">
							<u-col span="4">
								<view class="text-color">
									<u-icon name="coupon-fill" class="u-font-30"></u-icon>
									<text class="u-m-l-15 u-font-28">State</text>
								</view>
							</u-col>
							<u-col span="8">
								<text class="u-flex-1 u-m-l-60" v-if="item.status===0">Pending</text>
								<text class="u-flex-1 u-m-l-60" v-else-if="item.status===1">examination passed</text>
								<text class="u-flex-1 u-m-l-60" v-else-if="item.status===2">Audit failed</text>
								<!-- <text></text>
								<text class="u-flex-1 u-m-l-60">
									{{item.amount}}
								</text> -->
							</u-col>
						</u-row>
					</view>
				</block>
			</view>
		</view>
	
		<u-loadmore :status="loading" :load-text="loadText" />
	
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'

	import timestampToTime from '../../utils/getTimes.js'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				color: "white",
				background: 'black',
				time: '',
				withdrawal: [],
				
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
				page: 1,
				size: 8,
				status: 0,
				loading: 'nomore',
				loadText: {
					loadmore: 'loadmore',
					loading: 'loading',
					nomore: 'nomore'
				},
				isLoadMore: true
			};
		},
		onLoad() {
			this.getRecords()
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.records.recordsNavbar,
			})
			this.lists[0].name = this.i18.records.pending;
			this.lists[1].name = this.i18.records.success;
			this.lists[2].name = this.i18.records.fail;
		},
		onReachBottom() { //上拉触底函数
			if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
				this.isLoadMore = true
				this.page += 1
				this.getRecords()
			}
		},
		methods: {
			
			submenu(e){
				this.withdrawal = [];
				this.status = e;
				this.page = 1;
				this.getRecords()
			},
			
			handelLeft() {
				this.$router.go(-1)
			},
			handelRight() {
				this.getRecords()
			},
			async getRecords() {
				let {status, page, size} = this
				this.loading = 'loading'
				const data = await this.$api.getwithAll({status, page, size})
				// console.log((data))
				if (data.code === 200) {
					let res = data.data
					
					if (res.data) {
						this.withdrawal = this.withdrawal.concat(res.data)
						if(res.next_page_url){
							this.loading = 'loadmore'
							this.isLoadMore = false;
						}else{
							this.loading = 'nomore'
						}
					} else {
						this.loadStatus = 'nomore'
					}
				}else{
					
				}
			}
		}
	}
</script>

<style lang="scss">
	.silver-card {
		background-color: white;

		font-size: 25rpx;
		border-radius: 12upx;
		}
		.content-text {
			color: #e2bf88;
		}

		.text-color {
			color: #e2bf88;
		}

		.silver-item {
			margin: 20upx 0;
			border-radius: 12upx;
			box-shadow: 0 4rpx 19rpx 0 rgba(0, 0, 0, .2);

		}

		.comp-btn {
			background-color: #a7866e;
			color: white;
		}
	
</style>
