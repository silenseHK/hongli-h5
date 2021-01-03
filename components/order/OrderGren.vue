<template>
	<view class="">
		<u-popup v-model="openStatus" mode="bottom" height="auto" closeable close-icon-color="white" @close="showOrders">
			<!-- <OrderComfom :title1="title1" :title2="title2" :orderList="contractList" :colos="active" :colors1=" silver1"></OrderComfom> -->
			<view class="silver" :style="{ background: [`${colors}`] }">
				<!-- <text>Silver {{luckdata.title}} Gem</text> -->
				<text>{{i18.myLanguage.silver}} {{luckdata.title}} {{i18.myLanguage.gem}}</text>
				<text>{{shoWorder}}</text>
			</view>
			<view class="contract">
				<view>
					<view>
						<!-- <text>Contract Money</text> -->
						<text>{{i18.myLanguage.myContract}} :</text>
					</view>
					<view class="u-flex">
						<block v-for="(item,index) in contractList">
							<text class="contract-box" :key="index" @click="handelContract(item.num,index)" :class="[contractIndex==index?`${colors1}`:'']">
								{{item.num}}
							</text>
						</block>
					</view>
				</view>
			</view>
			<!-- 222222222 -->
			<view class="contract u-m-t-40">
				<view>
					<view>
						<!-- <text>Number :</text> -->
						<text>{{i18.myLanguage.myNumber}} :</text>
					</view>
					<view class="u-flex">
						<block v-for="(item,index) in numList">
							<text class="contract-box" :key="index" @click="handelnum(item.num,index)" :class="[numIndex==index?`${colors1}`:'']">
								{{item.num}}
							</text>
						</block>
					</view>
				</view>
			</view>
			<!-- 3--------------- -->
			<view class="contract u-m-t-40 ">
				<view>
					<view>
						<!-- <view>Number : -->
						<view>{{i18.myLanguage.myNumber}} :
							<text class="u-font-14">
								<!-- Maxinumlowersingular999 hands -->
								{{i18.myLanguage.myMax}}
							</text>
						</view>
					</view>
					<view class="u-flex u-m-t-30">
						<u-number-box v-model="values" size="30"></u-number-box>
					</view>
				</view>
			</view>
			<!-- 4444 -->
			<view class="contract u-m-t-40 ">
				<view>
					<view>
						<!-- <view>Fee : -->
						<view>{{i18.myLanguage.myFee}} :
							<text class="u-font-14">
								{{reverseNum}}
							</text>
						</view>
					</view>
				</view>

				<view class=" u-m-t-20 u-m-b-20">
					<!-- <u-checkbox v-model="terms" :active-color="colors">I agree thePresale management rule</u-checkbox> -->
					<u-checkbox v-model="terms" :active-color="colors">{{i18.myLanguage.myRule}}</u-checkbox>
				</view>
			</view>

			<view class="u-m-b-0">
				<u-button class="confim" :ripple="true" :style="{ background: [`${colors}`] }" @click="handelSubmit">{{i18.myLanguage.myConfirm}}</u-button>
			</view>
		</u-popup>
		<u-toast ref="uToast" position="top" />
	</view>
</template>

<script>
	export default {
		props: {
			luckdata: {
				type: Object
			},
			title: {
				type: String
			},
			shoWorder: {
				type: Boolean
			},
			colors: {
				type: String
			},
			contractList: {
				type: Array
			},
			numList: {
				type: Array
			},
			colors1: {
				type: String
			},
			id: {
				type: Number
			}

		},
		data() {
			return {
				openStatus: this.shoWorder,
				terms: '',
				showOrder: false,
				moneys: 10,
				numIndex: 0,
				contractIndex: 0,
				values: 3,
				canClick: true
			}
		},
		created() {
			this.canClick = true
		},
		watch: {
			shoWorder(val) {
				this.openStatus = val
			},
			values(val){
				this.$emit('openMusic')
			}

		},
		computed: {
			reverseNum() {
				// return Math.floor(Number(this.moneys * this.values) * 0.03)
				return (Number(this.moneys * this.values) * 0.03).toFixed(1)
			},
			i18() {
				return this.$t('index')
			}
		},
		methods: {
			showOrders() {
				this.$emit('handeloshow', false)
			},
			handelContract(item, index) {
				this.$emit('openMusic')
				this.moneys = item
				this.contractIndex = index;
			},
			handelnum(item, index) {
				this.values = item;
				this.numIndex = index
			},
			//提交按钮
			async handelSubmit() {
				if(this.canClick){
					this.canClick = false
					setTimeout(() =>{
						this.canClick = true
					},3000)
					this.$emit('openMusic')
					const prams = {
						game_id: this.luckdata.gameid,
						game_p_id: this.id,
						game_c_x_id: this.luckdata.id,
						money: Number(this.moneys * this.values)
					};
					const data = await this.$api.getBetting(prams)
					// console.log(data)
					this.openStatus = false;
					if (data.code == 200) {
						this.$emit('handlePlacebet', data.data.balance)
						this.$refs.uToast.show({
							title: 'Successful betting',
							type: 'success',
						})
						// this.$util.msg('Successful betting');
					} else {
						this.$refs.uToast.show({
							title: 'Bet failed',
							type: 'error',
						})
						// this.$util.msg('Bet failed')
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// ----------------
	.silver {
		background: #2cc747;
		height: 90rpx;
		padding: 0 20rpx;
		line-height: 90rpx;
		color: white;
		font-size: 35rpx;
		font-weight: bold;
	}

	.contract {
		padding: 0 20rpx;
		color: black;
		margin-top: 15rpx;

		.contract-box {
			margin-top: 20rpx;
			padding: 15rpx 25rpx;
			width: 130rpx;
			text-align: center;
			background-color: #eee;
			margin-right: 15rpx;
			border-radius: 8rpx;
		}
	}

	.active-bg1 {
		background: #2cc747 !important;
	}

	.active-bg2 {
		background: #ff5153 !important;
	}

	.active-bg3 {
		background: #8b6de9 !important;
	}

	.active-bg4 {
		background: #a88571 !important;
	}

	.confim {
		background: #2cc747;
		color: white;
		padding: 0 20rpx;
		font-size: 30rpx;
	}
</style>
