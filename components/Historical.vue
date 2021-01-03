<template>
	<view>
		<view class="u-p-l-20 u-p-r-20 silver-card u-m-t-20">
			<block v-for="(item,index) in silverData">
				<view class=" u-p-20 u-m-t-20" :key="index">
					<!-- 1------------------ -->
					<view class="u-flex u-row-between">
						<view class="content-text">
							<u-icon name="order" class="u-font-30"></u-icon>
							<text class="u-m-l-15">{{item.title}}</text>
						</view>
						<text>{{item.money}}</text>
					</view>
					<!-- 2----------------------- -->
					<view class="u-flex u-row-around u-m-t-30">
						<view class="u-flex-col">
							<text class="u-font-35 text-color">Select</text>
							<text class="u-font-30">{{item.select}}</text>
						</view>
						<view class="u-flex-col">
							<text class="u-font-35 text-color">Result</text>
							<text class="u-font-30">{{item.result}}</text>
						</view>
					</view>
					<!-- 3------------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="order" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">Period</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{item.period}}
							</text></u-col>
					</u-row>
					<!-- 4--------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="clock" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">Time</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{item.time}}
							</text></u-col>
					</u-row>
					<!-- 5---------------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="grid" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">Status</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{item.status}}
							</text></u-col>
					</u-row>
					</u-row>
					<!-- 6---------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="coupon-fill" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">Delivery</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{item.delivery}}
							</text></u-col>
					</u-row>
					<!-- 7------------ -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="coupon-fill" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">Fee</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{item.fee}}
							</text></u-col>
					</u-row>
					<!-- 8---------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="coupon-fill" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">Amount</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{item.amount}}
							</text></u-col>
					</u-row>
					</u-row>
					<!-- 9------------------ -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="grid" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">Option</text>
							</view>
						</u-col>
						<u-col span="8">	<u-button size="mini" class="comp-btn" @click="historDetail(item)">Complaint ></u-button>
						</u-col>
					</u-row>

				</view>
			</block>
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gameList: [],
				status: 'loadmore',
				list: 35,
				page: 0,
				silverData: [{
					title: 'H251BWSS0T9ZBH57EB95VKM1',
					money: '₹ 30',
					select: "Odd",
					result: '0Lucky',
					period: '20201110392',
					time: '2020年11月11日09:57:16',
					status: "Fail",
					delivery: 27,
					fee: 3,
					amount: -27,

				}, {
					title: 'H251BWSS0T9ZBH57EB95VKM1',
					money: '₹ 30',
					select: "Odd",
					result: '0Lucky',
					period: '20201110392',
					time: '2020年11月11日09:57:16',
					status: "Fail",
					delivery: 27,
					fee: 3,
					amount: -27,

				}]
			};
		},
		onLoad() {
			this.requestGame()
			// console.log(123)
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
			onReachBottom() {
				if (this.page >= 3) return;
				this.status = 'loading';
				this.page = ++this.page;
				setTimeout(() => {
					this.list += 10;
					if (this.page >= 3) this.status = 'nomore';
					else this.status = 'loading';
				}, 2000)
			},
			async requestGame() {
				const params = {
					limit:this.list,
					page:this.page
				}
				const data = await this.$api.requestsBetting(params)
				if (data.code === 200) {
					this.gameList = data.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.silver-card {
		background-color: white;
		height: 650rpx;
		box-shadow: 0 8rpx 10rpx 0 rgba(0, 0, 0, .2);
		font-size: 25rpx;

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
</style>
