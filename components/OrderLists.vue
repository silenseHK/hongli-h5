<template>
	<view>
		<view class=" silver-card ">
			<block v-for="(item,index) in orderList" :key="index">
				<view class=" u-p-20 u-m-t-20 silver-item" :key="index">
					<!-- 1------------------ -->
					<view class="u-flex u-row-between">
						<view class="content-text">
							<u-icon name="order" size="30" class="u-font-30"></u-icon>
							<text class="u-m-l-15 u-font-30">{{item.betting_num}}</text>
						</view>
						<text class="u-font-25">₹ {{item.betting_money}}</text>
					</view>
					<!-- 2----------------------- -->
					<view class="u-flex u-row-around u-m-t-30" style="text-align: center">
						<view class="u-flex-col">
							<text class="u-font-35 text-color">{{i18.enjoy.select}}</text>
							<!-- <text class="u-font-30 ">{{item.game_c_x_id}}</text> -->
							<text class="u-font-30 ">{{item.game_c_x.name_india}}</text>
						</view>
						<view class="u-flex-col">
							<text class="u-font-35 text-color">{{i18.enjoy.gameType}}</text>
							<!-- <text class="u-font-30 ">{{item.game_c_x_id}}</text> -->
							<text class="u-font-30 ">{{item.game_play.game_name_p.name}}</text>
						</view>
						<view class="u-flex-col">
							<text class="u-font-35 text-color">{{i18.enjoy.result}}</text>
							<text class="u-font-25">{{item.game_play.prize_number == null ? '?' : item.game_play.prize_number}}</text>
							<!-- <text class="u-font-30">{{item.status==0?'No draw':''}}</text> -->
							<!-- <text class="u-font-25" v-if="item.status===0">
								{{i18.enjoy.unset}}
							</text>
							<text class="u-font-25" v-else-if="item.status===1">
								{{i18.enjoy.winnings}}
							</text>
							<text class="u-font-25" v-else-if="item.status===2">
								{{i18.enjoy.winning}}
							</text> -->

						</view>
					</view>
					<!-- 3------------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="order" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28"> {{i18.enjoy.period}}</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								<!-- {{item.betting_num}} -->
								{{item.game_play.number}}
							</text></u-col>
					</u-row>
					<!-- <u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="clock" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">{{i18.enjoy.issue}}</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{ item.game_play.number}}
							</text></u-col>
					</u-row> -->
					<!-- 4--------------- -->
					<u-row gutter="12" class="u-m-t-30">
						<u-col span="4">
							<view class="text-color">
								<u-icon name="clock" class="u-font-30"></u-icon>
								<text class="u-m-l-15 u-font-28">{{i18.enjoy.time}}</text>
							</view>
						</u-col>
						<u-col span="8"><text class="u-flex-1 u-m-l-60">
								{{ item.betting_time*1000|friendDate}}
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
								{{i18.enjoy.unset}}
							</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status===1">
								{{i18.enjoy.winnings}}
							</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status===2">
								{{i18.enjoy.winning}}
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
							<!-- <text class="u-flex-1 u-m-l-60" v-if="item.status===0">unknown</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status===1">{{item.win_money}}</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status===2">-{{item.moneyNumbers}}</text> -->
							<text class="u-flex-1 u-m-l-60" v-if="item.status===0">-</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status===1">{{'+' + item.win_money}}</text>
							<text class="u-flex-1 u-m-l-60" v-else-if="item.status===2">{{'-' + item.money}}</text>
							<!-- <text></text>
							<text class="u-flex-1 u-m-l-60">
								{{item.amount}}
							</text> -->
						</u-col>
					</u-row>

					<!-- 9------------------ -->
					<!-- <u-row gutter="12" class="u-m-t-30">
					<u-col span="4">
						<view class="text-color">
							<u-icon name="grid" class="u-font-30"></u-icon>
							<text class="u-m-l-15 u-font-28">Option</text>
						</view>
					</u-col>
					<u-col span="8"><text class="u-flex-1 u-m-l-60">
							<u-button size="mini" class="comp-btn" @click="historDetail(item)">Complaint ></u-button>
						</text>
					</u-col>
				</u-row> -->

				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import formDate from '../utils/getTimes.js'
	export default {
		props: {
			orderList: {
				type: Array
			}
		},
		data() {
			return {

			};
		},
		computed: {
			i18() {
				return this.$t('index')
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.silver-card {
		background-color: white;
		// height: 650rpx;
		// box-shadow: 0 8rpx 10rpx 0 rgba(0, 0, 0, .2);
		font-size: 25rpx;
		border-radius: 12upx;


		.content-text {
			color: #e2bf88;
		}

		.text-color {
			color: #e2bf88;
		}

		.silver-item {
			margin: 90upx 0;
			border-radius: 12upx;
			box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, .2);
		}

		.comp-btn {
			background-color: #a7866e;
			color: white;
		}
	}
</style>
