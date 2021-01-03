<template>
	<view>
		<view class="top-bg-img">
			<view class="reward">
				<view class="u-flex-col reward-left">
					<text>{{i18.active.applyNavbar}}</text>
					<text v-if='proxyMone'>₹ {{proxyMone}}</text>
				</view>

			</view>
		</view>

		<view class=" u-p-l-30 u-p-r-30 u-m-t-30">
			<view class="apply-card">
				<view class="apply-card-title u-flex u-row-between u-m-b-20">

					<text>{{i18.active.applyText}}</text>
					<!-- <text @click="handleCards">{{i18.active.card}}</text> -->
				</view>
				<view class="u-flex">
					<text class="apply-item-text">₹</text>
					<u-input :placeholder="i18.active.inputApply" v-model="money"></u-input>
					<!-- <text style="color: #e2bf88;">{{i18.active.all}}</text> -->
				</view>
				<u-line color="#a1a1a1" />
				<view class="u-flex-col">

					<!-- 	<view class="u-flex u-row-between u-m-t-30">
						<text class="u-flex-1 apply-header"> {{i18.active.bonus}} ₹ 0 </text>
						<u-button size="mini" :ripple="true" class="apply-item-btn">{{i18.active.btnBonus}}</u-button>
					</view> -->
					<view class=" u-flex-col u-m-t-40 ">
						<text class="text-options">{{i18.active.max}}₹ {{range.max}}</text>
						<text class="text-options">{{i18.active.min}}₹ {{range.min}}</text>
					</view>
				</view>

			</view>

			<u-button class="submit-btn" :ripple="true" @click="submitPxoy">{{i18.active.bottomBtn}}</u-button>

		</view>
		<!-- <u-popup v-model="isCard" mode="bottom" border-radius="14" closeable>
			<view v-for="(item,index) in cardList" :key="index" class="card-list" @click="selectCard(item)">
				<view class=" u-flex u-row-between">
					<text>{{item.account_holder}}</text>
					<text>{{item.bank_num}}</text>
				</view>
			</view>
			<u-button @click="hideCard">Cancel</u-button>
		</u-popup> -->
		<u-toast ref="uToast" position="top" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// isCard: false,
				cardId: '',
				// cardList: [],
				money: '',
				proxyMone: null,
				canClick: true,
				range: {
					min: null,
					max: null
				}
			}
		},
		onLoad(options) {
			
			this.$api.requestRecommend({status: options.status}).then(resp => {
				if(resp.code == 200){
					let res = resp.data
					this.proxyMone = res.total_commission
					this.range = {
						min: res.min,
						max: res.max
					}
				}
			}) 
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.active.applyNavbar
			})
		},
		methods: {

			// //显示银行卡列表
			// handleCards() {
			// 	this.isCard = true

			// },
			// async getCardList() {
			// 	const data = await this.$api.getCards()
			// 	if (data.code === 200) {
			// 		this.cardList = data.data;
			// 	}
			// },

			// selectCard(item) {
			// 	this.cardId = item.id
			// 	this.$refs.uToast.show({
			// 		title: item.bank_num,
			// 		type: 'success',
			// 	})
			// 	this.isCard = false
			// },
			// hideCard() {
			// 	this.isCard = false
			// },
			async submitPxoy(){
				const params = {
					money: this.money
				}
				if ( Number(this.money) > Number(this.proxyMone)) {
					this.$util.msg('Insufficient commission')
					return
				}
				if (Number(this.money) < Number(this.range.min) || Number(this.money) > Number(this.range.max)) {
					this.$util.msg('Not less than 500 or greater than 25000')
					return 
				}
				if(this.canClick){
					this.canClick = false
					setTimeout(() => {
						this.canClick = true
					},3000)
					const data = await this.$api.newPxoryGeyMoney(params)
					if (data.code === 200) {
						this.$refs.uToast.show({
							title: 'success',
							type: 'success',
						})
						this.proxyMone = data.data.total_commission
						uni.setStorageSync('commission', data.data.total_commission)
						// uni.setStorageSync('money', data.data.balance)
					} else {
						this.$refs.uToast.show({
							title: 'error',
							type: 'error',
						})
					}
				}
			}
		}
	}
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
				background: #474747;
				padding: 20upx;
				opacity: .8;
				border-top-right-radius: 10upx;
				border-bottom-right-radius: 10upx;
				color: white;
				font-size: 35upx;
				margin-top: 100upx;
				font-weight: bold;
				min-height: 130upx;
			}


		}
	}

	.apply-card {
		box-shadow: 0 5upx 12upx 0 rgba(0, 0, 0, .2);
		border-radius: 15upx;
		height: 450upx;
		padding: 30upx;

		&-title {
			font-weight: bold;

		}

		.apply-item-text {
			font-weight: bold;
			margin-right: 12upx;
		}

		.apply-header {
			color: #e2bf88;
			font-weight: bold;
			font-size: 40upx;
		}

		.apply-item-btn {
			color: white;
			background-color: #e2bf88;
		}

		.text-options {
			opacity: .6;
			margin: 10upx 0;
		}

	}

	.submit-btn {
		background: #a7866e;
		margin-top: 40upx;
		color: white;
		font-size: 30upx;
	}

	.card-list {
		background: #E4E7ED;
		opacity: .6;
		padding: 30upx 50upx;
		font-size: 35upx;
		font-weight: bold;
		margin-top: 60upx;
	}
</style>
