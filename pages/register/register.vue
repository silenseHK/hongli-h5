<template>
	<view class="login">
		<!--顶部返回按钮-->
		<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
		<view class="login-top bg-active u-text-right u-p-t-30 u-p-r-30" style="color: #e2bf88;">

			<text @click="handelLanguage">Language</text>
		</view>
		<view class="login-type-content">
			<view class="main">
				<view class="nav-bar">
					<view class="nav-bar-item" v-for="(item, index) in typeList" :key="index" :class="tabCurrentIndex === index ? 'nav-bar-item-active text-active' : ''"
					 @tap="tabClick(index)">
						{{ item.text }}
					</view>
				</view>

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
						<u-input v-model="form.sms" :placeholder="i18.login.vlidata" />

						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" start-text="top" :change-text="`${sendCode}sReacquire`" end-text="Reacquire"
						 @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button @tap="getCode" size="mini">{{tips}}</u-button>

					</view>
					<view class="u-flex login-item u-margin-top-26">
						<u-icon name="info-circle-fill" color="#9E9E9E" size="35" class="u-m-l-25 u-m-r-25"></u-icon>
						<u-input v-model="form.code" :disabled="isDisabed" :placeholder="i18.login.invalidata" />
					</view>
				</view>
				<button class="confirm-btn bg-active" @tap="toRegister">
					{{i18.login.registers}}
				</button>
				<view class="back-home u-flex-col">
					<text class=" u-text-center back-home-text" @click="handelHome"> {{i18.login.backhome}}</text>
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
					sms: '',
					code: '',
				},
				isDisabed: true,
				codeSeconds: 0,
				typeList: [{
						text: 'Sign'
					},
					{
						text: 'Register'
					}
				],
				tabCurrentIndex: 1,
				seconds: 60,
				sendCode: 60,
				tips: '',


			}
		},
		onLoad() {
			

		},
		onShow(options) {
			var url = window.location.search;
			var theRequest = new Object();
			if (url.indexOf("?") != -1) {

				var str = url.substr(1);
				var strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
				}
			}
			this.form.code = theRequest.code
			if(typeof this.form.code == "undefined" || this.form.code == null || this.form.code == ""){
				this.isDisabed = false;
			}

			this.typeList[0].text = this.i18.login.signbar;
			this.typeList[1].text = this.i18.login.registers;

			// this.tabCurrentIndex = parseInt(options.type || 0, 10);
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		methods: {


			/* 跳转到语言切换 */
			handelLanguage() {
				this.$Router.push({
					name: 'language'
				})
			},

			codeChange(text) {

				this.sendCode--;

				this.tips = text;
			},
			async getCode() {
				if (this.$refs.uCode.canGetCode) {
					const params = {
						type: 0,
						phone: Number(this.form.phone)
					}
					const data = await this.$api.phoneCode(params)
					// 模拟向后端请求验证码
					uni.showLoading({
						title: 'Getting verification code'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('Verification code sent');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('Send after the countdown is over');
				}
			},
			end() {
				this.sendCode = 60
				this.$u.toast('End of countdown');
			},
			start() {
				this.$u.toast('Countdown starts');
			},
			tabClick(index) {
				if (index === 0) {
					this.$Router.push({
						name: 'login'
					})
				}
			},
			//跳转home
			handelHome() {
				this.$Router.push({
					name: 'index'
				})
			},
			// 注册账号
			async toRegister() {
				const {
					password,
					password1
				} = this.form
				if (password !== password1) {
					this.$util.msg('The two passwords are inconsistent')
					return false;
				}
				let {
					data,
					code
				} = await this.$api.register({
					phone: this.form.phone,
					password: this.form.password,
					sms_code: this.form.sms,
					code: this.form.code
				})
				if (code === 200) {
					this.$util.msg('registration success')
					this.$Router.push({
						name: 'login'
					})

				} else {
					this.$util.msg('registration error')

				}
			}
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
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
