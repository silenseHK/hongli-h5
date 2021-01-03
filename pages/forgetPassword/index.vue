<template>
	<view class="forget-box">
		<fieldset>
			<legend class='title'>{{this.i18.login.forget}}</legend>
			<div class="inp-item">
				<h3 class='item-title'>{{i18.login.mobile}}</h3>
				<div style='display: flex;align-items: center;'>
					<span style='padding-right:20rpx;color: #909399;'>+91</span>
					<u-input :placeholder="i18.enjoy.mobilepl" v-model="formData.tel" type="number" border clearable maxlength='15'/>
				</div>
			</div>
			<div class="inp-item">
				<h3 class='item-title'>{{i18.login.pwd}}</h3>
				<u-input :placeholder="i18.setting.pleaselogin2" type="password" maxlength='15' v-model="formData.password" border clearable/>
			</div>
			<div class="inp-item">
				<h3 class='item-title'>{{i18.login.confimpwd}}</h3>
				<u-input :placeholder="i18.setting.pleaselogin3" type="password" maxlength='15' v-model="formData.confirm_password" border clearable/>
			</div>
			<div class="inp-item">
				<h3 class='item-title'>{{i18.login.vlidata}}</h3>
				<div class='verificationCode-box'>
					<u-input  :placeholder="i18.active.inputHodel" maxlength='6' v-model="formData.verificationCode" border clearable/>
					<u-button v-if='isGoTime'>{{time}}</u-button>
					<u-button ripple v-else @click="goTime">{{i18.login.vlidata}}</u-button>
				</div>
			</div>
			<div class='submit-box'>
				<u-button ripple  @click="submit" type="primary">{{i18.wallet.summit}}</u-button>
			</div>
		</fieldset>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				formData:{
					tel: '',
					password: '',
					confirm_password: '',
					verificationCode: ''
				},
				time: 60,
				timer: null,
				isGoTime: false,
				canClick: true
			};
		},
		created() {
			uni.setNavigationBarTitle({
				　　title: this.i18.login.forget
			})
		},
		onShow() {

		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		methods: {
			canClickFn(cb){
				if(this.canClick){
					this.canClick = false
					setTimeout(() => {
						this.canClick = true
					},2500)
					cb()
				}
			},
			// 点击提交
			submit(){
				this.canClickFn(() => {
					let {tel,password,confirm_password,verificationCode} = this.formData
					if(tel.toString().trim().length == 0){
						uni.showToast({
							title: this.i18.enjoy.mobilepl,
							icon: 'none'
						})
						return
					}
					if(password.trim().length == 0){
						uni.showToast({
							title: this.i18.setting.pleaselogin2,
							icon: 'none'
						})
						return
					}
					if(confirm_password.trim().length == 0){
						uni.showToast({
							title: this.i18.setting.pleaselogin3,
							icon: 'none'
						})
						return
					}
					if(verificationCode.trim().length == 0){
						uni.showToast({
							title: this.i18.active.inputHodel,
							icon: 'none'
						})
						return
					}
					if(password !=confirm_password){
						uni.showToast({
							title: this.i18.login.hintPassword,
							icon: 'none'
						})
						return
					}
					this.$api.resetPassword({
						phone: tel,
						code: verificationCode,
						password,
						re_password: confirm_password
					}).then(res => {
						if(res.code == 200){
							uni.showToast({
								title: this.i18.active.modifySuccess,
								icon: 'none'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							},1500)
						}
					})
				})
			},
			// 点击验证码
			goTime(){
				let tel = this.formData.tel.toString()
				if(tel.trim().length == 0){
					uni.showToast({
						title: this.i18.enjoy.mobilepl,
						icon: 'none'
					})
					return
				}
				this.canClickFn(() => {
					this.$api.sendVerificationCode({
						phone: tel,
						type: 2
					}).then(res => {
						if(res.code == 200){
							this.isGoTime = true
							this.timer = setInterval(() => {
								if(this.time == 0){
									clearInterval(this.timer)
									this.isGoTime = false
								} else{
									this.time--
								}
							},1000)
						}
					})
				})
			}
		
		}
	};
</script>
<style lang="scss" scoped>
	page{
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	.title{
		font-size: 30rpx;
		color: #000000;
		font-weight: bold;
	}
	.inp-item{
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		.item-title{
			height: 70rpx;
			line-height: 70rpx;
		}
	}
	.verificationCode-box{
		display: flex;
		align-items: center;
	}
	fieldset{
		padding-top: 50rpx;
		height: 80vh;
		border-color: #EBEEF5;
	}
	.submit-box{
		padding-top: 100rpx;
	}
	.w250{
		width: 25rpx;
	}
</style>
