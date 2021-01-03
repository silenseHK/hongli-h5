<template>
	<view>
		<view class="container">
			<view class="container-title">
				<view class="redEnv-top">
					<view>
						<text class="u-font-35">{{i18.active.fixed}}</text>
					</view>
					<view class="redEnv-top-box">{{i18.active.fixedBtn}}</view>
				</view>
			</view>
			<view class="container-main">
				<view class="envelope-bonus">
					<view class="">
						<view class="u-flex u-row-between u-p-20">
							<view class="u-flex envelope-item">
								<image class="envelope-img" src="../../static/activity/red_env_value.843df097.png" mode=""></image>
								<text>{{i18.active.cardLeft}}</text>
							</view>
							<view class="u-flex envelope-item">
								<text>{{i18.active.cardRight}}</text>
								<image class="envelope-img" src="../../static/activity/red_env_number.c5514eca.png" mode=""></image>
							</view>
						</view>
						<view class="u-flex u-row-between">
							<u-button :ripple="true" class="envelope-btn">
								<input type="text" value="123" />
							</u-button>
							<u-button :ripple="true" class="envelope-btn">
								<input type="text" value="123" />
							</u-button>
						</view>
					</view>
					<view class="envelope-footer u-flex">
						<input type="text" value="" :placeholder="i18.active.inputHodel" class="verification" />
						<u-button :ripple="true" size="mini" class="verification-btn">Top</u-button>
					</view>
				</view>
			</view>
			<view class="container-footer u-flex u-row-between">
				<u-button :ripple="true" class="present">{{i18.active.putin}}</u-button>
				<u-button :ripple="true" class="present">{{i18.active.recoderight}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.active.redNavbar
			})
		},

		methods: {

		},
	}
</script>

<style lang="scss">
	.container {
		&-title {
			background: black;
			height: 150upx;
			width: 100%;
			padding: 0 30rpx;
			padding-top: 30upx;

			.redEnv-top {
				background: linear-gradient(-10deg, #f7dec3, #e2bf88);
				height: 120upx;
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
				display: flex;
				justify-content: space-between;
				padding: 20upx;
				align-items: center;

				&-box {
					background: black;
					height: 50upx;
					border-radius: 40upx;
					padding: 8upx 15upx;
					opacity: .6;
					color: white;
				}
			}
		}

		&-main {
			padding: 30upx 30upx;

			.envelope-bonus {
				box-shadow: 0 8upx 16upx 0 rgba(0, 0, 0, .4);
				border-radius: 15upx;

				.envelope-img {
					width: 200upx;
					height: 160upx;
				}

				.envelope-item {}

				.envelope-btn {
					width: 50%;
					background-color: #e2bf88;
					margin: 0 20upx;
					font-size: 30upx;
					color: white;
				}

			}

			.envelope-footer {
				margin: 40upx 0;
				padding: 30upx;

				.verification {
					width: 80%;

				}

				.verification-btn {
					padding: 0 30upx;
					background: #e2bf88;
					color: white;

				}
			}
		}

		&-footer {
			padding: 0 30upx;
			margin-top: 50upx;

			.present {
				background: #a7866e;
				width: 50%;
				color: white;
				margin: 0 20upx;
			}
		}
	}
</style>
