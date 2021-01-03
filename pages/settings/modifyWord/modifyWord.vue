<template>
	<view>
		<view class="modif-name">
			<view class="modif-name-box">
				<view class=" modif-name-title">
					{{i18.setting.modifyLogin}}
				</view>
				<view class=" modif-name-body">
					<view class="u-flex login-item u-margin-top-26">
						<u-icon name="lock-fill" color="#9E9E9E" size="35" class="u-margin-right-26"></u-icon>
						<u-input :placeholder="i18.setting.pleaselogin1" v-model="password1"  />
					</view>
					<view class="u-flex login-item u-margin-top-26">
						<u-icon name="lock-fill" color="#9E9E9E" size="35" class="u-margin-right-26"></u-icon>
						<u-input :placeholder="i18.setting.pleaselogin2" v-model="password2"  />
					</view><view class="u-flex login-item u-margin-top-26">
						<u-icon name="lock-fill" color="#9E9E9E" size="35" class="u-margin-right-26"></u-icon>
						<u-input :placeholder="i18.setting.pleaselogin3" v-model="password3"  />
					</view>
					<u-button :ripple="true" class="modify-btn" @click="submits">{{i18.setting.submit}}</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password1:'',
				password2:'',
				password3:'',
			}
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
			
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.setting.modifyLogin
			})
			
		},
		methods: {
			async submits(){
				const data = await this.$api.userPassword({
					o_password:this.password1,
					f_password:this.password2,
					l_password:this.password3
				}) 
				if(data.code===200) {
					uni.showToast({
						// title: '修改成功',
						title: this.i18.active.modifySuccess
					});
				} else {
					uni.showToast({
						title: res.msg,
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modif-name {
		background: url(../../../common/enjoy/enjoy-top.png) no-repeat;
		box-sizing: 100% 100%;
		height: 300rpx;
		padding: 30rpx 30rpx;

		&-box {}

		&-body {

			box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, .2);
			background-color: white;
			border-bottom-right-radius: 10rpx;
			border-bottom-left-radius: 10rpx;
			padding: 40rpx;

		}

		&-title {
			background-image: linear-gradient(-10deg, #f7dec3, #e2bf88);
			text-align: center;
			border-top-right-radius: 10rpx;
			border-top-left-radius: 10rpx;
			font-size: 35rpx;
			color: white;
			padding: 15rpx 0;
		}
		.modify-btn {
			background-color: #a7866e;
			color: white;
			margin-top: 50rpx;
		}
	}
</style>
