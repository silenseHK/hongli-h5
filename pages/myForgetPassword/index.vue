<template>
	<view class="login">
		<!--顶部返回按钮-->
		<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
		<view class="login-top bg-active u-text-right u-p-t-30 u-p-r-30" style="color: #e2bf88;"></view>
		<view class="login-type-content">
			<view class="main">
				<view class="login-type-form">
					<view class="u-flex login-item">
						<u-icon name="phone" color="#9E9E9E" size="35" class="u-m-l-25 u-m-r-25"></u-icon><text class="login-text">+91 |</text>
						<u-input v-model="form.phone" :placeholder="i18.login.mobile" />
					</view>
					<view class="u-flex login-item u-margin-top-26">
						<u-icon name="lock" color="#9E9E9E" size="35" class="u-m-l-25 u-m-r-25"></u-icon>
						<u-input v-model="form.password" :placeholder="i18.login.createpwd" />
					</view>
					<view class="u-flex login-item u-margin-top-26">
						<u-icon name="lock" color="#9E9E9E" size="35" class="u-m-l-25 u-m-r-25"></u-icon>
						<u-input v-model="form.password1" :placeholder="i18.login.confimpwd" />
					</view>

					<view class="u-flex login-item u-margin-top-26">
						<u-icon name="email" color="#9E9E9E" size="35" class="u-m-l-25 u-m-r-25"></u-icon>
						<u-input v-model="form.code" :placeholder="i18.login.vlidata" />

						<u-toast ref="uToast"></u-toast>
						<u-button size="mini" v-if='isGoTime'>{{time}}</u-button>
						<u-button @tap="getCode" size="mini" v-else>{{i18.login.click}}</u-button>
					</view>
				</view>
				<button class="confirm-btn bg-active" @tap="summit">
					{{i18.wallet.summit}}
				</button>
				<view class="back-home u-flex-col">
					<text class=" u-text-center back-home-text" @click="backLogin"> {{i18.login.backLogin}}</text>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					phone: '',
					password: '',
					password1: '',
					code: '',
				},
				time: 60,
				timer: null,
				isGoTime: false,
				canClick: true
			}
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
			backLogin(){
				uni.navigateBack({
					delta: 1
				})
			},
			getCode(){
				let phone = this.form.phone.toString()
				if(phone.trim().length == 0){
					uni.showToast({
						title: this.i18.enjoy.mobilepl,
						icon: 'none'
					})
					return
				}
				this.canClickFn(() => {
					this.$api.sendVerificationCode({
						phone,
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
			},
			summit(){
				this.canClickFn(() => {
					let {phone,password,password1,code} = this.form
					if(phone.toString().trim().length == 0){
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
					if(password1.trim().length == 0){
						uni.showToast({
							title: this.i18.setting.pleaselogin3,
							icon: 'none'
						})
						return
					}
					if(code.trim().length == 0){
						uni.showToast({
							title: this.i18.active.inputHodel,
							icon: 'none'
						})
						return
					}
					if(password !=password1){
						uni.showToast({
							title: this.i18.login.hintPassword,
							icon: 'none'
						})
						return
					}
					this.$api.resetPassword({
						phone,
						code,
						password,
						re_password: password1
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
			}
		}
	}
</script>
<style lang="scss" scoped>
	.login {
		width: 100%;
		position: relative;

		.bg-active {
			background-color: #a7866e;
			color: #fff;
		}

		.text-active,
		.iconfont {
			color: #e2bf88;
		}

		.back-btn {
			position: absolute;
			left: 40rpx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40rpx;
			font-size: 48rpx;
			color: #fff;
		}

		.login-top {
			height: 300rpx;
			position: relative;
			background: url(../../static/login_top.203ca855.png);

			.desc {
				color: #e2bf88;
				position: absolute;
				top: 200rpx;
				left: 40rpx;
				font-size: 48rpx;

				.title {
					font-size: 48rpx;
				}
			}

			.login-pic {
				position: absolute;
				width: 220rpx;
				height: 170rpx;
				right: 30rpx;
				top: 100rpx;
			}
		}

		.login-type-content {
			position: relative;
			top: -72rpx;


			.login-bg {
				width: 94vw;
				height: 94vw;
				margin: 0 3vw;
			}

			.main {
				background: white;
				border-radius: 12rpx;
				padding-bottom: 30rpx;
				width: 94vw;
				position: absolute;
				box-shadow: 0 2upx 10upx 0 #a5a5a5;
				top: 0;
				left: 3vw;

				.nav-bar {
					display: flex;
					height: 100rpx;
					justify-content: center;
					align-items: center;
					position: relative;
					z-index: 10;

					.nav-bar-item {
						flex: 1;
						display: flex;
						height: 100%;
						line-height: 96rpx;
						font-size: 32rpx;

						display: flex;
						margin: 0 120rpx;
						justify-content: center;
					}

					.nav-bar-item-active {
						border-bottom: 6rpx solid #e2bf88;
					}
				}

				.login-type-form {
					width: 80%;
					margin: 50rpx auto;

					.input-item {
						position: relative;
						height: 90rpx;
						line-height: 90rpx;
						margin-bottom: 30rpx;

						.iconfont {
							font-size: 50rpx;
							position: absolute;
							left: 0;
						}

						.login-type-input {
							height: 90rpx;
							padding-left: 80rpx;
							border-bottom: 1rpx solid rgba(0, 0, 0, .1);
						}

						.sms-code-btn,
						sms-code-resend {
							width: 240rpx;
							font-size: 26rpx;
						}
					}
				}

				.login-type-tips {
					padding: 0 50rpx;
					display: flex;
					justify-content: space-between;
					font-size: 28upx;
					color: #666;
				}

				.confirm-btn {
					margin-top: 60upx;
					width: 80%;
					height: 80rpx;
					line-height: 80rpx;
				}
			}
		}


		.login-item {
			// border: 2rpx solid #EEEEEE;
			box-shadow: 0 3rpx 15rpx 0 rgba(0, 0, 0, .2);
			padding: 10rpx 10rpx;
			border-radius: 12upx;

			.login-text {
				margin-right: 20rpx;
				color: #909399;
			}
		}
	}

	.back-home {
		margin: 60upx 0;
		font-size: 35upx;

		&-text {
			color: #a7866e;
			margin: 30upx 0;
		}

	}
</style>
