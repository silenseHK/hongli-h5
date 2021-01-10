<template>
	<view class="recharge">
		<view class="u-p-l-60 u-p-r-60 u-p-t-60">
			<!-- 头部区域 -->
			<view class=" u-flex-col">
				<view class="">
					<text class="my-title">{{i18.enjoy.balances}}</text>
					<text class="my-title u-m-l-30">₹ {{moneys}}</text>
				</view>
				<view class="box-input u-flex">
					<label for="test2" class="u-p-r-20 u-p-l-20">₹</label>
					<u-input v-model="moneyValue" @input='haddleInp' :placeholder="i18.enjoy.titleTop" placeholderStyle="white" type="number" />
				</view>
				<view class=" money-title u-m-t-30">
					<!-- <block v-for="(item,index) in mone" :key="index"> -->
					<block v-for="(item,index) in canPayMoney" :key="index">
						<view class="top-box-option" style="width: 200upx;" :class="[moneyIndex == index ? 'active-option' : '']" @click="hadelMone(item,index)">
							<text class="u-black money-text" style="padding: 0 40upx; margin: 20upx 10upx;">₹{{item}}</text>
						</view>
					</block>
				</view>
			</view>
			<!-- 表单区域 -->
			<!-- <view class="u-m-t-40">
				<u-form :model="rechaForm">
					<u-form-item :label="i18.enjoy.name" :label-style="lablestyle">
						<input v-model="rechaForm.username" style="color: #b5b1ab;" :placeholder="i18.enjoy.namepl" class="u-p-l-30" />
					</u-form-item>
					<u-form-item :label="i18.enjoy.mobile" :label-style="lablestyle">
						<input v-model="rechaForm.mobile" style="color: #b5b1ab;" :placeholder="i18.enjoy.mobilepl" class="u-p-l-30" />
					</u-form-item>
					<u-form-item :label="i18.enjoy.email" :label-style="lablestyle">
						<input v-model="rechaForm.email" style="color: #b5b1ab;" :placeholder="i18.enjoy.emailpl" class="u-p-l-30" />
					</u-form-item>

				</u-form>
			</view> -->
			<!-- 底部区域 -->
			<view class="u-flex-col u-m-t-50">
				<view class="">
					<text class="my-title">{{i18.enjoy.methods}}</text>
				</view>
				<view class="u-flex u-m-t-20 u-row-between">
					<block v-for="(item,index) in rechargLists" :key="index">
						<view class="method-box" :class="[quickIndex==index?'active-pick':'']" @click="handelPick(item.company,index)">
							<text class="method-text">{{item.company}}</text>
						</view>
					</block>
				</view>
				<!-- <view class="method-box-row-box u-flex u-row-between u-p-r-40 u-p-l-40">
					<view class="">
						<text style="color: white;" class=" u-font-35">{{quickvalue}}</text>
					</view>
					<view>
						<u-icon name="checkmark" color="#df974b"></u-icon>
					</view>
				</view> -->
			</view>

			<!-- --------------- -->
			<u-button type="primary" @click="handleRecharge" class="u-m-t-80 rech-btn" :ripple="true">{{i18.enjoy.recharges}}</u-button>
			<!-- <view class=" u-flex u-row-between u-m-t-30">
				<u-button size="medium" type="success" class="u-m-r-80" @click="handleInof">successful</u-button>
				<u-button size="medium" type="error" @click="handleInof">failure</u-button>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneyValue: '',
				moneyIndex: 0,
				moneys: 0,
				quickIndex: 0,
				rechargLists: [],
				quickvalue: '',
				placeholder: 'ENTER OR SELECT RECHARGE AMOUNT',
				rechaForm: {
					username: '',
					mobile: '',
					email: ''
				},
				lablestyle: {
					color: '#e2bf88',

				},
				mone: [{
					text: '500',
				}, {
					text: '1000',

				}, {
					text: '2000',

				}, {
					text: '3000',

				}, {
					text: '4000',

				}, {
					text: '4500',

				}],
				quickData: [{
					text: 'QUICK PAYMENT',
					value: 'QUICK_PAY'
				}, {
					text: 'MANUAL PAYMENT',
					value: 'UPI'
				}, ]
			}
		},
		computed: {
			i18() {
				return this.$t('index')
			},
			// 用户可以购买的金额范围
			canPayMoney(){
				if(this.rechargLists.length !=0){
					return this.rechargLists[this.quickIndex].money
				}
			}
		},
		onLoad() {
			// this.moneys = uni.getStorageSync('money')
			this.quickData[0].text = this.i18.enjoy.paymentLeft
			this.quickData[1].text = this.i18.enjoy.paymentRight
			this._getrechargemethods()
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.enjoy.rechargeNavbar
			})
		},
		methods: {
			haddleInp(){
				this.moneyIndex = null
			},
			hadelMone(item, index) {
				this.moneyValue = item;
				this.moneyIndex = index
			},
			handelPick(item, index) {
				this.quickIndex = index;
				this.quickvalue = item
				this.moneyIndex = 0
				this.moneyValue = this.rechargLists[this.quickIndex].money[0]
			},
			//点击充值
			async handleRecharge() {
				if(Number(this.moneyValue) >= Number(this.rechargLists[this.quickIndex].min_money) && Number(this.moneyValue) <= Number(this.rechargLists[this.quickIndex].max_money) ){
					const params = {
						money: this.moneyValue,
						pay_type: this.quickvalue
					}
					const {
						code,
						data
					} = await this.$api.getRecharge(params)
					if (code === 200) {
						let native_url = data.native_url
						if(data.is_post == 0){
							// window.open(native_url)
							window.location.href = native_url
						}else if(data.is_post == 1){
							let orderNo = native_url.split("=")[1];
							const div = document.createElement('div');
							let myHtml = `<form action='${native_url}'>
									<input name="orderNo" value="${orderNo}" type="hidden" />
							</form>`
							div.innerHTML = myHtml;
							document.body.appendChild(div);
							document.forms[0].submit();
						}else if (data.is_post == 2) {
							const div = document.createElement('div');
							let inputHtml = "";
							let params = data.params;
							for ( let key in data.params) {
								inputHtml += `<input name="${key}" value="${params[key]}" type="hidden" />`;
							}
							let myHtml = `<form method="post" action='${native_url}'>
								${inputHtml}
							</form>`;
							div.innerHTML = myHtml;
							document.body.appendChild(div);
							document.forms[0].submit();
						}
						
					} else {
						this.$util.msg('Recharge failed')
					}
				}else{
					this.$util.msg(`The amount cannot be less than ${this.rechargLists[this.quickIndex].min_money} or greater than ${this.rechargLists[this.quickIndex].max_money}`)
					return false;
				}
			},
			async handleInof() {
				uni.reLaunch({
					url: '/pages/mine/index'
				})

			},
			//获取支付方式
			async _getrechargemethods() {
				const {
					data,
					code
				} = await this.$api.getrechargemethods()
				if (code === 200) {
					this.rechargLists = data.recharge_method;
					this.moneys = data.balance
					this.moneyValue = this.rechargLists[this.quickIndex].money[0]
					this.quickvalue = data.recharge_method[0].company
				} else {
					this.$util.msg(res.msg)
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.recharge {
		background: url('https://go8shop.in/static/img/recharge_bg.9e089c75.png') no-repeat;
		box-sizing: 100% 100%;
		height: 100vh;
		background-color: black;

		.my-title {
			font-size: 35rpx;
			background: linear-gradient(-81deg, #fde5b2, #df974b);
			-webkit-background-clip: text;
			color: transparent;
		}

		.box-input {
			background: linear-gradient(-81deg, #fde5b2, #df974b);
			border: 1px solid black;
		}

		.top-box-option {
			border: 1px solid #e2bf88;
			border-radius: 8rpx;
			text-align: center;
			// padding: 20prx 40rpx;
			// height: 80rpx;
			margin: 20upx 0;
			line-height: 80rpx;
			color: white;
		}

		.active-option {
			background-color: #e2bf88;
			color: black;
		}
	}
	.method-box {
		background-image: linear-gradient(-81deg, #9d9d9d, #3b3b3b);
		// background: black;
		border-radius: 8rpx;
		text-align: center;
		padding: 20prx 30rpx;
		height: 80rpx;
		width: 150upx;
		font-weight: bold;
		line-height: 80rpx;
		font-size: 30rpx;

		.method-text {
			padding: 0 22rpx;
			color: white;
		}
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

	.rech-btn {
		background-color: #e2bf88;
		font-size: 30rpx;
	}
	.money-title {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.money-text{
			font-size: 30upx;
		}
		// margin: 0 20upx;
	}
	.money-title::after{
		content: "";
		width: 200upx
	}
	
</style>
