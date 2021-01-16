<template>
	<view class="withdrawal">
		<view class="withdrawal-top" @click="handelCard">
			<view class="u-flex u-row-between">
				<view class="u-flex-col">
					<text class="fon-text">{{i18.wallet.card}}</text>
					<text class="fon-text-bod" v-if="isBankCard"> {{i18.wallet.selected}}</text>
				</view>
				<view>
					<u-icon name="arrow-right" class="fon-text"></u-icon>
				</view>
			</view>
			<view class="u-m-t-60">
				<text class="bala-text"> 
					{{i18.wallet.balance}} ₹ 
					<text v-if='moneys'>{{moneys}}</text>  
				</text>
			</view>

		</view>
		<view class="withdrawal-box">
			<view class="withdrawal-box-title">
				<text>{{i18.wallet.please}}</text>
			</view>
			<view class="box-input u-flex">
				<label for="test2" class="u-p-r-20 u-p-l-20">₹</label>
				<u-input v-model="moneyValue" @input='haddleInp' :placeholder="i18.enjoy.titleTop" placeholderStyle="white" type="number" />
			</view>
			<view class="u-flex u-row-between u-flex-wrap u-m-t-30 moneBox" v-if='mone.length !=0'>
				<block v-for="(item,index) in mone">
					<view class="top-box-option" :key="index" :class="[moneyIndex == index ? 'active-option' : '']" @click="hadelMone(item.text,index)">
						<text class="u-p-30 u-black u-font-35">₹{{item.text}}</text>
					</view>

				</block>
			</view>
		</view>
		<!-- 提现方式begin -->
		<view class="u-flex-col u-m-t-50 getMoney-box">
			<view class="">
				<text class="my-title">{{i18.enjoy.getMoneyType}}</text>
			</view>
			<view class="u-flex u-m-t-20 methods-cont">
				<block v-for="(item,index) in getMoneyLists" :key="index">
					<view class="method-box u-m-b-10" :class="[currentSelected==index ? 'active-pick' : '']" @click='clickGetMoney(index)'>
						<text class="method-text">{{item.type}}</text>
					</view>
				</block>
			</view>
		</view>
		<!-- 提现方式end -->
		<view class="withdrawal-body">
			<view>
				<text> {{i18.wallet.fee}} ₹ 45 </text>
			</view>
			<u-line color="#e2bf88"></u-line>
			<block v-if='currentGetMoneyObj.limit'>
				<view class="content-box">
					<u-icon name="info-circle-fill" size="30" color="#e2bf88"></u-icon>
					<!-- <text class="">{{i18.wallet.maxValue}}:₹ {{include_bb188 ? 500000 : 25000}}</text> -->
					<text class="">{{i18.wallet.maxValue}}:₹ {{currentGetMoneyObj.limit.max}}</text>
				</view>
				<view class="content-box">
					<u-icon name="info-circle-fill" size="30" color="#e2bf88"></u-icon>
					 <!-- <text class="">{{i18.wallet.minValue}}:₹ {{include_bb188 ? 200 : 500}}</text> -->
					<text class="">{{i18.wallet.minValue}}:₹ {{currentGetMoneyObj.limit.min}}</text>
				</view>
				<view class="content-box">
					<u-icon name="info-circle-fill" size="30" color="#e2bf88"></u-icon>
					<text class="">{{i18.wallet.withdrawals}}</text>
				</view>
				<view class="content-box">
					<u-icon name="info-circle-fill" size="30" color="#e2bf88"></u-icon>
					<text class="">{{i18.wallet.amount}}</text>
				</view>
				<view class="content-box">
					<u-icon name="info-circle-fill" size="30" color="#e2bf88"></u-icon>
					<!-- <text class="">{{i18.wallet.monday}}</text> -->
					<text>{{showWeekText}}</text>
				</view>
			</block>
		</view>
		<view class="withdrawal-footer">
			<button type="default" style="background: #e2bf88;" @click="handelSubmit">{{i18.wallet.summit}}</button>
		</view>
		<u-popup v-model="isCard" mode="bottom" border-radius="14">
			<view v-for="(item,index) in cardList" :key="index" class="card-list" @click="selectCard(item)">
				<view class=" u-flex u-row-between">
					<text>{{item.account_holder}}</text>
					<text>{{item.bank_num}}</text>
				</view>
			</view>
			<u-button @click="hideCard">Cancel</u-button>
		</u-popup>
		<u-toast ref="uToast" position="top" />
	</view>
</template>

<script>
	import baseUrl from '../../utils/baseUrl.js'
	export default {
		data() {
			return {
				currentSelected: null,
				currentGetMoneyObj: {},
				getMoneyLists: [], //提现数据
				moneyIndex: 0,
				cardList: [],
				isCard: false,
				canClick: true,
				cardData: {
					cardId: '',
					ifsc: '',
					bank_number: '',
					bank_name: '',
					account_holder: ''
				},
				isBankCard: true,
				moneys: 0,
				moneyValue: '',
				mone: [],
				showWeekData: ''
				// mone: [{
				// 	text: baseUrl.phpUrl.includes('bb188') ? '200' : '500',
				// },{
				// 	text: '1500'
				// },{
				// 	text: '3000'
				// },{
				// 	text: '6000'
				// },{
				// 	text: '12000'
				// },{
				// 	text: '15000'
				// },{
				// 	text: '18000'
				// },{
				// 	text: '20000'
				// },{
				// 	text: baseUrl.phpUrl.includes('bb188') ? '500000' : '25000'
				// }]
			};
		},
		onLoad() {
			this.canClick = true
			// this.moneyValue = this.mone[0].text
			this.getUserInfo((resp) =>{
				let res = resp.data
				if(res.code == 200){
					this.moneys = res.data.balance
				}
			})
			this.getCardList();
			this.getMoneyTypeData()
			// this.moneys = uni.getStorageSync('money')
		},
		computed: {
			i18() {
				return this.$t('index')
			},
			// include_bb188() {
			// 	return baseUrl.phpUrl.includes('bb188')
			// }
			showWeekText(){
				let {startWeek,endWeek,time} = this.showWeekData
				let result = ''
				if(startWeek){
					result = this.i18.myDate[startWeek] + ' ' + this.i18.myDate.to + ' ' + this.i18.myDate[endWeek] +' '+ time
				}
				return  result 
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.wallet.Withdrawalnavbar
			})
		},
		methods: {
			haddleInp(){
				this.moneyIndex = null
			},
			//点击切换提现方式
			clickGetMoney(index){
				this.currentSelected = index
				this.mone = this.getMoneyLists[index].btn.reduce((result,item) => {
					result.push({text: item})
					return result
				},[])
				this.moneyIndex = 0
				this.currentGetMoneyObj = this.getMoneyLists[index]
				this.moneyValue = this.currentGetMoneyObj.btn[0]
				let currentGetMoneyObj = this.currentGetMoneyObj
				this.showWeekData = {
					startWeek: currentGetMoneyObj.start_week ? currentGetMoneyObj.start_week : '',
					endWeek: currentGetMoneyObj.end_week ? currentGetMoneyObj.end_week : '',
					time: currentGetMoneyObj.during_time ? currentGetMoneyObj.during_time : ''
				}
			},
			// 得到提现方式
			getMoneyTypeData(){
				this.$ajax('withdrawal/type').then(resp => {
					this.getMoneyLists = resp
					for(let mykey in resp){
						this.currentSelected = mykey
						this.currentGetMoneyObj = resp[mykey]
						break
					}
					this.mone = resp[0].btn.reduce((result,item) => {
						result.push({text: item})
						return result
					},[])
					this.moneyValue = this.mone[0].text
					this.showWeekData = {
						startWeek: resp[0].start_week,
						endWeek: resp[0].end_week,
						time: resp[0].during_time
					}
				})
			},
			hadelMone(item, index) {
				this.moneyValue = item;
				this.moneyIndex = index
			},
			//显示银行卡列表
			handelCard() {
				this.isCard = true
			},
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
			async getCardList() {
				const data = await this.$api.getCards()
				if (data.code === 200) {
					this.cardList = data.data;
				}
			},
			selectCard(item) {
				this.isCard = false
				this.cardData.cardId = item.id
				this.isBankCard = false;
				this.$refs.uToast.show({
					title: `${item.bank_num}`,
					type: 'default',
				})
				// this.$util.msg(`You choose ${item.bank_num}`)
			},
			hideCard() {
				this.isCard = false
			},
			async handelSubmit() {
				if (this.cardData.cardId == '') {
					this.$refs.uToast.show({
						title: 'Choose bank card',
						type: 'warning',
					})
					return false
				}
				let mylimit = this.currentGetMoneyObj.limit
				if (Number(this.moneyValue) < Number(mylimit.min) || Number(this.moneyValue) > Number(mylimit.max)) {
					this.$refs.uToast.show({
						title: `Not less than ${mylimit.min} or more than ${mylimit.max}`,
						type: 'warning',
					})
					return
				}
				if(this.moneyValue.toString().includes('.')){
					this.$refs.uToast.show({
						title: 'Can only be a positive integer',
						type: 'warning'
					})
					return
				}
				const params = {
					bank_id: this.cardData.cardId,
					money: Number(this.moneyValue),
					with_type: this.getMoneyLists[this.currentSelected].type
				}
				// console.log(params)
				if(this.canClick){
					this.canClick = false
					setTimeout(() =>{
						this.canClick = true
					},3000)
					const data = await this.$api.getWithdrawal(params)
					if (data.code === 200) {
						this.$refs.uToast.show({
							title: 'successfully',
							type: 'success',
						})
						// this.$util.msg('Successful withdrawal application')
						this.getCardList()
					} else {
						this.$refs.uToast.show({
							title: 'Withdrawal failed',
							type: 'error',
						})
						// this.$util.msg('Withdrawal failed')
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100% !important;
	}
	.my-content-box{
		min-height: 400rpx;
	}
	.getMoney-box{
		padding-left: 24rpx;
		padding-right: 24rpx;
	}
	.methods-cont {
		flex-wrap: wrap;
	}
	.method-box {
		background-image: linear-gradient(-81deg, #9d9d9d, #3b3b3b);
		// background: black;
		border-radius: 8rpx;
		text-align: center;
		padding: 20prx 30rpx;
		height: 80rpx;
		width: 24%;
		/*min-width: 150upx;*/
		font-weight: bold;
		line-height: 80rpx;
		font-size: 30rpx;
		.method-text {
			color: white;
		}
	}

	.method-box:not(:nth-child(4n)) {
		margin-right: calc(4% / 3);
	}

	.active-pick {
		background: #e2bf88;
		color: black;
	}
	.method-box-row-box {
		height: 80rpx;
		width: 100%;
		border: 1px solid #e2bf88;
		border-radius: 6rpx;
		margin-top: 30rpx;
	}
	.moneBox::after{
		content: "";
		width: 200upx
	}
	.box-input {
		background: linear-gradient(-81deg, #fde5b2, #df974b);
		border: 1px solid black;
		margin-top: 20rpx;
		border-radius: 10rpx;
	}
	.withdrawal {
		background: black;
		height: 100%;
		.fon-text {
			font-size: 40rpx;
		}

		.fon-text-bod {
			font-size: 40rpx;
			font-weight: bold;
		}

		.bala-text {
			font-size: 40rpx;
			font-weight: bold;

			color: black;
		}

		&-top {
			color: white;
			font-size: 30rpx;
			padding: 50rpx;
			width: 100%;
			height: 330rpx;
			background: url(../../static/mine/withdrawal_info_bg.png) no-repeat;
			background-size: 100% 100%;
		}

		&-box {
			padding: 0 30rpx;

			&-title {
				color: white;
				font-size: 20rpx;
			}
		}

		.top-box-option {

			border-radius: 8rpx;
			text-align: center;
			padding: 0rpx 20rpx;
			width: 200rpx;
			margin: 15rpx 0;
			height: 80rpx;
			line-height: 80rpx;
			color: balck;
			background: #eee;
		}

		.active-option {
			background-color: #e2bf88;
			color: black;
		}

		&-body {
			padding: 20px;
			color: #e2bf88;

			.content-box {
				color: white;
				opacity: .6;
				margin: 10rpx 0;
			}
		}

		&-footer {
			padding: 30rpx;
		}
	}

	.card-list {

		background: #f2f5fa;
		opacity: .6;
		padding: 30upx 50upx;
		font-size: 35upx;
		font-weight: bold;
		margin: 40upx 10upx;
		border-radius: 20upx;
	}
	.my-title {
		font-size: 35rpx;
		background: linear-gradient(-81deg, #fde5b2, #df974b);
		-webkit-background-clip: text;
		color: transparent;
	}
</style>
