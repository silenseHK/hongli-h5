<template>
	<view>
		<view class="bank-card">
			<view class="bank-card-top" @click="handelCard">
				<u-icon name="plus"></u-icon>
				<text>{{i18.wallet.newCard}}</text>
			</view>
			<view class="">
				<block v-for="(item,index) in cardList">
					<u-card :key="index" style="margin:20rpx 0; background: #56b56c;" class="bank-card-img">
						<view class=" u-flex u-row-between" slot="head">
							<view class="">
								<view class=" ">
									<text class="u-font-35"> {{item.account_holder}}</text>
								</view>

							</view>
							<view>
								<u-icon name="close" class="u-font-35" color="red" @click="handelColse(item.id)"></u-icon>
							</view>
						</view>
						<view slot="body">

							<view class=" u-flex u-row-between">
								<text class="card-item-text">{{item.bank_num}}</text>
								<u-icon name="edit-pen-fill" @click="handelCardEdit(item)"></u-icon>
							</view>

						</view>
						<!-- <view class="" slot="foot">
							<view class="u-flex u-row-between">
								<text>{{item.add_time}}</text>
								<text>{{item.status==0?'正常':'已删除'}}</text>
							</view>
						</view> -->
					</u-card>
				</block>
			</view>
			<view class="bank-card-body">
				<u-popup v-model="show" mode="bottom" length="100%" safe-area-inset-bottomcloseable closeable @close="close">
					<view class="bank-card-addcard">
						<u-form :model="form" ref="uForm" border>
							<u-form-item :label="i18.wallet.bankName" label-position="top">
								<u-input v-model="form.bank_type_id" border :placeholder="i18.wallet.bankNamepl" @click="handleCardName" />

							</u-form-item>
							<!-- 开户人 -->
							<u-form-item :label="i18.wallet.actualName" label-position="top">
								<u-input v-model="form.account_holder" border :placeholder="i18.wallet.actualNamepl" />
							</u-form-item>
							<!-- ifsc码 -->
							<u-form-item :label="i18.wallet.ifsc" label-position="top">
								<u-input v-model="form.ifsc_code" border :placeholder="i18.wallet.ifscpl" />
							</u-form-item>
							<u-form-item :label="i18.wallet.accnum" label-position="top">
								<u-input v-model="form.bank_num" border :placeholder="i18.wallet.accnumPl" />
							</u-form-item>
							<u-form-item :label="i18.wallet.confim" label-position="top">
								<u-input v-model="form.bank_num1" border :placeholder="i18.wallet.confimPl" />
							</u-form-item>
							<u-form-item :label="i18.wallet.mobil" label-position="top">
								<u-input v-model="form.phone" border :placeholder="i18.wallet.mobilPl" />
							</u-form-item>
							<u-form-item :label="i18.wallet.emil" label-position="top">
								<u-input v-model="form.email" border :placeholder="i18.wallet.emilPl" />
							</u-form-item>
							<!-- 	<u-form-item :label="i18.wallet.code"  label-position="top">
								<u-input v-model="form.sex" border :placeholder="i18.wallet.codePl" />
								<u-button size="medium " :ripple="true">{{i18.wallet.top}}</u-button>
							</u-form-item> -->



						</u-form>
						<u-select v-model="showselect" :list="list" @confirm="confirm"></u-select>
						<u-button class="submibtn" :ripple="true" type="primary" @click="handelSubmit">{{i18.wallet.add}}</u-button>
					</view>

				</u-popup>
			</view>


			<u-select v-model="isBankCardname" :list="cardListss" confirm-text="confirm" cancel-text="cancel" @confirm="handleConfirm"></u-select>
		</view>
	</view>
</template>

<script>
	import {
		cardLists
	} from '../../utils/utils.js'
	export default {
		data() {
			return {
				isBankCardname: false,
				show: false,
				showselect: false,
				status: 0,
				cardList: [],
				form: {
					bank_num: '',
					bank_opening: '',
					phone: '',
					account_holder: '',
					bank_type_id: '',
					mtb_bank_code: '',
					ifsc_code: '',
					email: '',
					bank_num1: ''
				},
				rules: {
					ifsc_code: [{
						required: true,
						message: 'Please Enter your name',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					bank_num: [{
						min: 5,
						message: 'The introduction cannot be less than 5 words',
						trigger: 'change'
					}]
				},

				list: [{
						value: '1',
						label: 'jiang'
					},
					{
						value: '2',
						label: 'hu'
					}
				],
				cardListss: [{
						value: '',
						label: 'A P Mahesh Bank'
					},
					{
						value: '',
						label: 'Aditya Birla'
					}, {
						value: '',
						label: 'Airtel Payments Bank'
					}, {
						value: '',
						label: 'Allahabad Bank '
					}, {
						value: '',
						label: 'Allahabad UP Gramin Bank'
					}, {
						value: 'IDPT0013',
						label: 'Andhra Bank'
					}, {
						value: '',
						label: 'Andhra Pradesh Grameen Vikas Bank'
					}, {
						value: '',
						label: 'Andhra Pragathi'
					}, {
						value: '',
						label: 'Allahabad UP Gramin Bank'
					}, {
						value: '',
						label: 'Apna Sahakari Bank'
					}, {
						value: '',
						label: 'Assam Grameen Bank'
					}, {
						value: 'IDPT0016',
						label: 'Axis bank'
					}, {
						value: 'IDPT0023',
						label: 'Bandhan Bank'
					}, {
						value: '',
						label: 'Bank of Baroda'
					}, {
						value: '',
						label: 'Bank of Maharashtra'
					}, {
						value: '',
						label: 'Baroda Gujarat Gramin Bank'
					}, {
						value: '',
						label: 'Baroda Uttar Pradesh Gramin Bank'
					}, {
						value: '',
						label: 'Bassein'
					}, {
						value: '',
						label: 'Bihar Gramin Bank'
					}, {
						value: '',
						label: 'BOI '
					}, {
						value: 'IDPT0001',
						label: 'Canara Bank'
					}, {
						value: '',
						label: 'Catholic Syrian Bank '
					}, {
						value: 'IDPT0024',
						label: 'Central Bank of India'
					}, {
						value: '',
						label: 'Chaitanya Godavari Gramin Bank'
					}, {
						value: '',
						label: 'Chhattisgarh Rajya Gramin Bank'
					}, {
						value: '',
						label: 'Citibank'
					}, {
						value: '',
						label: 'Corporation Bank'
					}, {
						value: '',
						label: 'Cosmos'
					}, {
						value: '',
						label: 'City Union Bank'
					}, {
						value: '',
						label: 'DBS Bank'
					}, {
						value: 'IDPT0002',
						label: 'DCB BANK'
					}, {
						value: '',
						label: 'Dena BanK '
					}, {
						value: '',
						label: 'Deutsche Bank AG'
					}, {
						value: '',
						label: 'Dhanlaxmi Bank'
					}, {
						value: '',
						label: 'Dombivli Nagri Sahakari Bank'
					}, {
						value: '',
						label: 'Central Bank of India'
					}, {
						value: '',
						label: 'Equitas Small Finance Bank Payments Bank '
					}, {
						value: '',
						label: 'Fino'
					}, {
						value: 'IDPT0003',
						label: 'Federal bank'
					}, {
						value: '',
						label: 'G P Parsik Bank'
					}, {
						value: '',
						label: 'Gujarat State Bank'
					}, {
						value: '',
						label: 'Hasti'
					}, {
						value: 'IDPT0004',
						label: 'HDFC Bank'
					}, {
						value: '',
						label: 'HSBC Bank'
					}, {
						value: 'IDPT0006',
						label: 'Indian Bank'
					}, {
						value: 'IDPT0007',
						label: 'ICICI Bank'
					}, {
						value: '',
						label: 'IDBI '
					}, {
						value: '',
						label: 'IDFC '
					}, {
						value: '',
						label: 'Indiusind Bank'
					}, {
						value: '',
						label: 'IndusInd Bank'
					}, {
						value: '',
						label: 'IndusInd Bank'
					}, {
						value: '',
						label: 'IOB' 
					}, {
						value: '',
						label: 'Janta Sahakari Bank'
					}, {
						value: '',
						label: 'Kallapanna'
					}, {
						value: 'IDPT0014',
						label: 'Karnataka Bank'
					}, {
						value: '',
						label: 'Karnataka Vikas'
					}, {
						value: 'IDPT0009',
						label: 'Karur Vysya Bank'
					}, {
						value: '',
						label: 'Kaveri'
					}, {
						value: '',
						label: 'Kerala Grameen Bank'
					}, {
						value: '',
						label: 'Kotak bank'
					}, {
						value: '',
						label: 'LVB'
					}, {
						value: '',
						label: 'Langpi Dehangi'
					}, {
						value: '',
						label: 'Mahanagar Bank'
					}, {
						value: '',
						label: 'Maharashtra Grameen Bank'
					}, {
						value: '',
						label: 'Malwa Gramin Bank'
					}, {
						value: '',
						label: 'Meghalaya Rural Bank'
					}, {
						value: '',
						label: 'Mehasana Urban  co-operative Bank'
					}, {
						value: '',
						label: 'Mizoram'
					}, {
						value: '',
						label: 'NKGSB Co-Op Bank Ltd '
					}, {
						value: '',
						label: 'OBC'
					}, {
						value: '',
						label: 'PNB'
					}, {
						value: '',
						label: 'Punjab and Maharashtra Co- Op Bank Ltd'
					}, {
						value: '',
						label: 'Paytm Payments Bank'
					}, {
						value: '',
						label: 'Pragathi Krishna Grameen Bank'
					}, {
						value: '',
						label: 'Prathma Bank'
					}, {
						value: '',
						label: 'Pragathi Krishna Grameen Bank'
					}, {
						value: '',
						label: 'Prathma Bank'
					}, {
						value: '',
						label: 'PSB'
					}, {
						value: '',
						label: 'Purvanchal Bank'
					}, {
						value: '',
						label: 'Rajasthan Marudhar'
					}, {
						value: '',
						label: 'Rajkot nagrik Bank'
					}, {
						value: '',
						label: 'RBL'
					}, {
						value: '',
						label: 'Samruddhi Co Op Bank'
					}, {
						value: '',
						label: 'Saraswat Co-op Bank  '
					}, {
						value: '',
						label: 'Saurashtra Gramin Bank'
					}, {
						value: '',
						label: 'SBI'
					}, {
						value: 'IDPT0018',
						label: 'South Indian Bank'
					}, {
						value: '',
						label: 'Standard Charter Bank'
					}, {
						value: 'IDPT0020',
						label: 'Standard Chartered Bank'
					}, {
						value: '',
						label: 'SUCO SOUHARDA SAHAKARI BANK'
					}, {
						value: '',
						label: 'Surat People Cooperative Bank'
					}, {
						value: '',
						label: 'SVC Bank'
					}, {
						value: 'IDPT0008',
						label: 'Syndicate bank'
					}, {
						value: '',
						label: 'TELANGANA GRAMEENA BANK'
					}, {
						value: '',
						label: 'Thane Bharat Sahakari Bank'
					}, {
						value: '',
						label: 'Thane Janta sahakari Bank'
					}, {
						value: '',
						label: 'The Jammu and Kashmir Bank Ltd'
					}, {
						value: '',
						label: 'The Kalyan janta sahakari Bank'
					}, {
						value: '',
						label: 'The Sutex Co – Op Bank'
					}, {
						value: '',
						label: 'TMBL'
					}, {
						value: '',
						label: 'UCO'
					}, {
						value: '',
						label: 'Ujjivan Small Finance Bank'
					}, {
						value: 'IDPT0010',
						label: 'Union Bank of India'
					}, {
						value: '',
						label: 'United Bank of India '
					}, {
						value: '',
						label: 'uttarakhand Gramin Bank'
					}, {
						value: '',
						label: 'Vananchal'
					}, {
						value: '',
						label: 'Varanchha Bank'
					}, {
						value: '',
						label: 'Vijaya bank'
					}, {
						value: '',
						label: 'Vishveshwar Co opp Bank'
					}, {
						value: 'IDPT0019',
						label: 'Yes bank'
					}
				]
			}
		},
		onShow() {
			this.getCards();
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.wallet.mybankNavbar
			})
			// console.log(this.$refs.uForm)
		},


		methods: {
			async getCards() {
				const data = await this.$api.getCards()
				if (data.code === 200) {
					this.cardList = data.data
				}
			},
			// 弹框关闭
			close() {
				this.form.bank_num = ""
				this.form.phone = ""
				this.form.account_holder = ""
				this.form.bank_type_id = ""
				this.form.ifsc_code = ""
				this.form.email = ""
				this.form.bank_num1 = ""
			},
			//弹出添加银行卡
			async handelCard() {
				this.show = true
				this.status = 0

			},
			//提交按钮
			async handelSubmit() {
				if (this.form.ifsc_code < 6) {
					this.$util.msg('ifsc cannot be less than 6 bits')
					return false;
				}
				if (this.form.bank_num < 6) {
					this.$util.msg('Bank card cannot be less than 6 or greater than 26')
					return false;
				}

				if (this.form.bank_num !== this.form.bank_num1) {
					this.$util.msg('Two inputs are inconsistent')
					return false;
				}
				if (this.status === 0) {
					const params = {
						bank_num: this.form.bank_num,
						phone: this.form.phone,
						account_holder: this.form.account_holder,
						bank_type_id: this.form.bank_type_id,
						mtbpy_code: this.form.mtb_bank_code,
						ifsc_code: this.form.ifsc_code,
						mail: this.form.email
					}
					// console.log('params--->',params)
					const data = await this.$api.addCards(params);
					if (data.code === 200) {
						this.$util.msg('Added successfully')
						this.getCards();
						this.show = false
					} else {
						this.$util.msg('add failed')
					}
				} else if (this.status === 1) {
					const params = {
						bank_num: this.form.bank_num,
						phone: this.form.phone,
						account_holder: this.form.account_holder,
						bank_type_id: this.form.bank_type_id,
						mtbpy_code: this.form.mtb_bank_code,
						ifsc_code: this.form.ifsc_code,
						mail: this.form.email,
						id: this.form.id
					}
					// console.log('这params--->',params)
					const data = await this.$api.editCards(params)

					if (data.code === 200) {
						this.$util.msg('Successfully modified')
						this.getCards();
						this.show = false
					} else {
						this.$util.msg('fail to edit')
					}
				}

			},
			// handelselect() {
			// 	this.showselect = true
			// },
			confirm(e) {

			},
			// 删除银行卡
			async handelColse(index) {
				const params = {
					id: index
				}
				const data = await this.$api.deleteCards(params)
				if (data.code === 200) {

					this.$util.msg('delete success')
					this.getCards();
				} else {
					this.$util.msg('delete error')
				}
			},
			//修改银行卡
			handelCardEdit(item) {
				this.show = true
				this.status = 1;
				this.form.bank_num = item.bank_num;
				this.form.bank_num1 = this.form.bank_num;
				this.form.bank_opening = item.bank_opening;
				this.form.phone = item.phone;
				this.form.account_holder = item.account_holder;
				this.form.bank_type_id = item.bank_type_id;
				this.form.id = item.id;
				this.form.email = item.mail;
				this.form.ifsc_code = item.ifsc_code;
			},
			/* 
				选择银行卡 
			 */
			handleCardName() {
				// console.log('123')
				this.isBankCardname = !this.isBankCardname
			},
			handleConfirm(item) {
				// console.log(item)
				this.form.bank_type_id = item[0].label
				this.form.mtb_bank_code = item[0].value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bank-card {
		padding: 0;

		&-top {
			background-color: white;
			height: 100rpx;
			width: 100%;
			line-height: 65rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			padding: 20rpx;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
			box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, .2);
		}

		&-body {
			// padding: 40rpx;
		}

		,
		&-addcard {
			// background-color: green;
			// background-color: #eee;
			// height: 100vh;
			padding: 40rpx;
		}

		.card-item-text {
			font-size: 45upx;
			color: white;
		}

		&-img {
			// background: url(https://skymm.in/static/img/my_wallet_info_bg.534cde7d.png) no-repeat ;
			// box-sizing: 100% 100%;
			background-size: cover;
		}

		.submibtn {
			margin-top: 50rpx;
			margin-bottom: 50rpx;
		}
	}
</style>
