<template>
	<view>
		<view class="top-bg-img">
			<view class="reward">
				<view class="u-flex-col reward-left">
					<text>{{i18.active.balance}}</text>
					<text>₹ {{money}}</text>
				</view>
				<view class="reward-right" @click="ruleHandle">
					<u-icon name="info-circle-fill" color="white" size="50" class="u-m-r-10"></u-icon>
					<text>{{i18.active.rulesss}}</text>
				</view>
			</view>
		</view>
		<view class="envelope">
			<view class="envelope-title">
				<text class="envelope-title-text u-font-35">{{i18.active.taskList}}</text>
			</view>
			<view class="envelope-item">
				<block v-for="(item, index) in taskList">
					<view class="envelope-item-list" :key="index">
						<view>
							<image class="envelope-item-list-img" src="../../static/activity/bargaining.png" mode=""></image>
						</view>
						<view>
							<text style="font-weight: bold">{{ item.name }}</text>
							<view class="u-flex u-m-t-10 u-m-b-10">
								<!-- <view class="titlebox-title ">
							</view> -->

								<u-line-progress :percent="item.percent" :show-percent="true" striped-active></u-line-progress>
								<text class="u-p-l-15" style="color: #e2bf88">{{
                  item.doing_num + "/" + item.value
                }}</text>
							</view>
							{{i18.active.time}}<u-count-down :timestamp="item.expire" font-size="25"></u-count-down>
							<!-- <text style="opacity: .6;">{{item.expire}}</text> -->
						</view>
						<view class="u-flex-col task-bottom">
							<text class="task-bottom-title">₹ {{ item.reward + "+" + item.add_reward }}</text>
							<u-button class="task-bottom-body1" :ripple="true" size="mini" v-if="item.is_done == 1" @click="handelWithdraw(item.id)">get</u-button>
							<u-button class="task-bottom-body" :ripple="true" size="mini" disabled v-if="item.is_done == 0">get</u-button>
							<text>{{ item.is_geted === 0 ? "undone" : "Withdrawn" }}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import formDate from "../../utils/getTimes.js";
	import baseUrl from '../../utils/baseUrl.js'
	import {
		getPercent
	} from "../../utils/utils.js";
	export default {
		data() {
			return {
				taskList: [],
				money: '',
			};
		},
		onLoad() {
			this.getUserInfo((resp) =>{
				let res = resp.data
				if(res.code == 200){
					this.money = res.data.balance
				}
			})
			this.getTasks();
		},
		computed:{
			i18(){
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.i18.active.envelopeNavbar
			})
		},
		methods: {
			getUserInfo(cb){
				uni.showLoading()
				uni.request({
					url: baseUrl.phpUrl + 'api/user/info',
					header: {'token': uni.getStorageSync('token')},
					success: (res) =>{
						cb(res)
					},
					fail: () => {
						uni.hideLoading()
					}
				})
			},
			async getTasks() {
				const data = await this.$api.getTasks();

				if (data.code === 200) {
					const enveList = [];
					// const num = data.data.doing_num
					// const total = data.data.value
					// const numbss = getPercent(num, total)
					// this.percent = numbss
					data.data.map((item, index) => {
						enveList.push({
							id: item.id,
							name: item.name,
							value: item.value,
							reward: Math.floor(item.reward),
							add_reward: Math.floor(item.add_reward),
							expire: item.expire / 1000,
							is_done: item.is_done,
							doing_num: item.doing_num,
							is_geted: item.is_geted,
							percent: getPercent(Number(item.doing_num), Number(item.value)),
						});
					});
					this.taskList = enveList;
				}
			},
			/* 
				提取奖励
			 */
			async handelWithdraw(id) {
				// console.log(id)
				const params = {
					task_id:id
				}
				const data = await this.$api.getReward(params)
				if(data.code===200) {
					this.$util.msg('Extracted successfully')
				}
			},
			ruleHandle() {
				this.$router.push('redRule');
			}
		},
	};
</script>

<style lang="scss" scoped>
	.top-bg-img {
		background: url(../../static/activity/apply_to_balance_top_common.png) no-repeat;
		background-size: 100% 100%;
		height: 320upx;

		.reward {
			display: flex;
			justify-content: space-between;

			&-left {
				background: white;
				padding: 20upx;
				opacity: 0.8;
				border-top-right-radius: 10upx;
				border-bottom-right-radius: 10upx;
				color: #e2bf88;
				font-size: 35upx;
				margin-top: 100upx;
				font-weight: bold;
			}

			&-right {
				background: black;
				display: flex;
				align-items: center;
				height: 80upx;
				opacity: 0.5;
				border-top-left-radius: 10upx;
				border-bottom-left-radius: 10upx;
				color: #e2bf88;
				padding-left: 20upx;
				font-size: 35upx;
				margin-top: 60upx;
				font-weight: bold;
			}
		}
	}

	.task-bottom-body {
		background: red !important;
	}

	.task-bottom-body1 {
		background: green !important;
		color: white;
		padding: 20upx 40upx !important;
		border-radius: 40upx;
	}

	.envelope-item-list {
		margin: 30upx 0;
		box-shadow: 0 8upx 16upx 0 rgba(0, 0, 0, 0.2);
		padding: 20upx;
	}

	.envelope {
		padding: 0 30upx;
		margin: 20upx 0;

		&-title {
			margin: 20rpx 0;

			&-text {
				border-bottom: 6upx solid #e2bf88;
			}
		}

		&-item {
			// box-shadow: 0 8upx 16upx 0 rgba(0, 0, 0, .2);
			border-radius: 10upx;
			padding: 20upx;

			&-list {
				display: flex;
				justify-content: space-between;
				align-items: center;

				&-img {
					width: 80upx;
					height: 80upx;
				}
			}

			.titlebox-title {
				background: white;
				width: 120upx;
				height: 20upx;
				border-radius: 20upx;
				border: 2upx solid #e2bf88;
			}

			.task-bottom {
				display: flex;
				flex-direction: column;

				&-title {
					color: #e2bf88;
					font-weight: bold;
					font-size: 25upx;
				}

				&-body {
					padding: 5upx 40upx;
					color: white;
					background: black;
					border-radius: 40upx;
					text-align: center;
					line-height: 50upx;
					opacity: 0.6;
					margin-top: 10upx;
				}
			}
		}
	}
</style>
