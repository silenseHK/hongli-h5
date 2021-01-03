<template>
	<view>
		<view class="u-p-l-20 u-p-r-20 silver-card u-m-t-20">
			<block v-for="(item,index) in gameList">
				<view class=" u-p-20 u-m-t-20 silver-item" :key="index">
					<!-- 1------------------ -->
					<view class="u-flex u-row-between">
						<view class="content-text">
							<u-icon name="order" size="30" class="u-font-30"></u-icon>
							<text class="u-m-l-15 u-font-30">{{item.betting_num}}</text>
						</view>
						<!-- <text class="u-font-25">₹ {{item.money}}</text> -->
						<text class="u-font-25">₹ {{item.betting_money}}</text>
					</view>
					<!-- 2----------------------- -->
					<view class="u-flex u-row-around u-m-t-30">
						<view class="u-flex-col">
							<text class="u-font-35 text-color">{{i18.enjoy.select}}</text>
							<text class="u-font-30 textc">{{item.game_c_x.name_india}}</text>
						</view>
						<view class="u-flex-col">
							<text class="u-font-35 text-color">{{i18.enjoy.gameType}}</text>
							<text class="u-font-30 textc">{{item.game_name.name}}</text>
						</view>
						<view class="u-flex-col">
							<text class="u-font-35 text-color">{{i18.enjoy.result}}</text>

							<!-- <text class="u-font-30">{{item.status==0?'No draw':''}}</text> -->
							<!-- <text class="u-font-25" v-if="item.status===0">
								Unsettlement
							</text>
							<text class="u-font-25" v-else-if="item.status===1">
								Winning
							</text>
							<text class="u-font-25" v-else-if="item.status===2">
								Not winning
							</text> -->
							<text class="u-font-25 textc">{{item.game_play.prize_number == null ? '?' : item.game_play.prize_number}}</text>
						</view>
					</view>
					<!-- 3------------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="order" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">{{i18.enjoy.period}}</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								<!-- {{item.betting_num}} -->
								{{item.game_play.number}}
							</text></u-col>
					</u-row>
					<!-- 4--------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="clock" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">{{i18.enjoy.time}}</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{item.betting_time*1000|friendDate}}
							</text></u-col>
					</u-row>
					<!-- 5---------------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="grid" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">{{i18.enjoy.status}}</text>
							</view>
						</u-col>
						<u-col span="8">
							<text class="u-flex-1 u-m-l-60" v-if="item.status===0">
								Unsettlement
							</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status===1">
								Winning
							</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status===2">
								Not winning
							</text>

						</u-col>
					</u-row>
					</u-row>
					<!-- 6---------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="coupon-fill" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">{{i18.enjoy.delivery}}</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{item.money}}
							</text></u-col>
					</u-row>
					<!-- 7------------ -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="coupon-fill" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">{{i18.enjoy.fee}}</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{item.service_charge}}
							</text></u-col>
					</u-row>
					<!-- 8---------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="coupon-fill" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">{{i18.enjoy.amount}}</text>
							</view>
						</u-col>
						<u-col span="8">
							<text class="u-flex-1 u-m-l-60" v-if="item.status==0">-</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status==1">{{'+' + item.win_money}}</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status==2">{{'-' + item.money}}</text>
							<!-- <text></text>
 								<text class="u-flex-1 u-m-l-60">
 									{{item.amount}}
 								</text> -->
						</u-col>
					</u-row>

					<!-- 9------------------ -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="grid" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">{{i18.enjoy.option}}</text>
							</view>
						</u-col>
						<u-col span="8">
							<u-button size="mini" class="comp-btn" @click="historDetail(item)">{{i18.enjoy.compbtn}} ></u-button>
						</u-col>
					</u-row>

				</view>
			</block>
			<u-loadmore :status="status" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	import formDate from '../../../utils/getTimes.js'
	export default {
		data() {
			return {
				gameList: [],
				status: 'loading',
				loadText: {
					loadmore: 'nomore',
					loading: 'nomore',
					nomore: 'nomore'
				},
				page: 1,
				pagesize: 20,
				loadStatus: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore: false, //是否加载中
			};
		},
		onLoad() {
			this.requestGames()

		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.enjoy.goldNavbar2
			})
		},
		onReachBottom() { //上拉触底函数
			if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
				this.isLoadMore = true
				this.page += 1
				this.requestGames()
			}
		},
		methods: {
			historDetail(item) {
				this.$Router.push({
					name: 'historiDetail',
					params: {
						historList: item
					}
				})
			},

			async requestGames() {
				const params = {
					limit: this.pagesize,
					page: this.page
				}
				const {
					data,
					code
				} = await this.$api.requestsBetting(params)
				if (code == 200) {
					if (data) {
						this.gameList = this.gameList.concat(data)
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
	.textc{text-align: center;}
	.silver-card {
		background-color: white;
		height: 650rpx;

		font-size: 25rpx;
		padding: 0 30upx;

		.content-text {
			color: #e2bf88;
		}

		.text-color {
			color: #e2bf88;
		}

		.comp-btn {
			background-color: #a7866e;
			color: white;
		}
	}

	.silver-item {
		border-radius: 15upx;
		box-shadow: 0 8rpx 10rpx 0 rgba(0, 0, 0, .2);
	}
</style>
