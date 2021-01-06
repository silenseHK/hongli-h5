<template>
	<view>
		<!-- 客服中心 --start -->
		<!-- <view>
			<view class="app-customer" @click="handelService" :class="isServer?'service-bg1':'service-bg'" v-show="isGroup">
				<view class=" u-flex-col u-row-center u-p-t-20">
					<image src="../../static/service.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center" style="color: white; font-size: 20upx;">Service</text>
				</view>
			</view>
			<view class="" v-if="isServer">
				<view class="app-grouap  u-flex-col u-row-center u-p-t-10" @tap="handelservices">
					<image src="../../static/phoneicon.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 20upx;">Group</text>
				</view>
				<view class="app-whates  u-flex-col u-row-center u-p-t-10" @tap="handelGrop">
					<image src="../../static/whatsapp.f636c058.png" mode="" style="width: 40upx; height: 40upx; margin: auto;"></image>
					<text class="u-text-center u-p-b-20" style="color: white; font-size: 18upx;">WhatsApp</text>
				</view>


			</view>
		</view> -->
		<service></service>
		<!-- 客服中心 --end-->
		<view class="setting">
			<view class="u-flex-col user-box u-p-l-30 u-p-r-20 u-p-b-30 ">
				<view class="u-flex">
					<view class="u-m-r-10">
						<u-avatar :src="pic" size="140"></u-avatar>
					</view>
					<view class="u-flex-1">
						<!-- <view class="u-font-18 u-p-b-20 u-m-t-30 nickname-text">
							<text class="nickname-text">{{i18.mine.users}}:{{nickName}}</text>
						</view> -->
						<view class=" u-flex">
							<text class="u-m-r-20">{{i18.mine.mobile}}:{{phone}}</text><text>{{i18.mine.userId }}:{{id}}</text>
						</view>
						<!-- <view class=" "></view> -->
					</view>

					<view class="u-m-l-10 u-p-10">
						<u-icon name="setting" color="black" size="35" @click="handelSetting"></u-icon>
					</view>
				</view>

				<!-- 卡片区域 -->
				<view class="u-flex setting-item ">
					<view class="u-flex-col setting-card u-p-t-20" @click="handelWallet">
						<text>₹ {{numMony }}</text>
						<text>{{i18.mine.balance}}</text>
					</view>
					<view class="u-flex-col setting-card u-p-t-20" @click="handellink">
						<text>₹ {{commission}}</text>
						<text>{{i18.mine.bonus}}</text>
					</view>

				</view>
			</view>
			<view class="u-flex u-p-t-40 u-row-around setting-cards">
				<view class="u-flex-col u-text-center" style="align-items: center;" @click="handelEnvelope">
					<u-image src="../../static/setting/title.png" width="50rpx" mode="widthFix" height="70rpx"></u-image>
					<text>{{i18.mine.envelope}}</text>
				</view>
				<view class="u-flex-col u-text-center" style="align-items: center;" @click="handellink">
					<u-image src="../../static/setting/about.png" width="50rpx" mode="widthFix" height="70rpx"></u-image>
					<text>{{i18.mine.promorion}}</text>
				</view>
				<view class="u-flex-col u-text-center" style="align-items: center;" @click="handelWallet">
					<u-image src="../../static/setting/card.png" width="50rpx" mode="widthFix" height="70rpx"></u-image>
					<text>{{i18.mine.wallet}}</text>
				</view>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="file-text" :title="i18.mine.order" @click="handelOrder"></u-cell-item>
				<u-cell-item icon="order" :title="i18.mine.statistics" @click="handleStatistic"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="map" :title="i18.mine.address" @click="handelMap"></u-cell-item>
				<!--<u-cell-item icon="kefu-ermai" :title="i18.mine.contact" @tap="handelservices"></u-cell-item>-->
				<u-cell-item icon="IE-circle-fill" :title="i18.mine.language" @click="handelLanguage"></u-cell-item>
				<u-cell-item icon="close" :title="i18.mine.out" @click="handelClick"></u-cell-item>
			</u-cell-group>
		</view>
		<u-modal v-model="loginOut" confirmText="Yes" cancelText="No" @confirm="dropOut" :title="i18.mine.prompt"
		 show-confirm-button show-cancel-button cancel-color="#d5bea2" confirm-color="#d5bea2">
			<view class="slot-content u-text-center u-m-t-50 u-m-b-50">
				<text>{{i18.mine.loginout}}</text>
			</view>
		</u-modal>

	</view>
</template>

<script>
	import service from '../../components/Service.vue';
	export default {
		components: {
			service
		},
		data() {
			return {
				isGroup: false,
				isServer: false,
				loginOut: false,
				pic: 'https://uviewui.com/common/logo.png',
				show: true,
				nickName: "",
				id: '',
				phone: '',
				money: '',
				numMony: '',
				commission: 0
			}
		},
		onLoad() {
			this._getInfo()
		},
		activated() {
			this.init()
			this._getInfo()
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.mine.mineNavabr
			})
		},
		onShow() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.isGroup = true
				return;
			}
			this.isGroup = false
		},
		methods: {
			init(){
				this.nickName = ""
				this.id = ''
				this.phone = ''
				this.money = ''
				this.numMony = ''
				this.commission = ''
			},
			async _getInfo() {
				/* 获取个人信息 */
				const {
					data,
					code
				} = await this.$api.requestInfo()
				if (code === 200) {
					this.numMony = data.balance
					uni.setStorageSync('money', data.balance)
					this.money = data.balance
					this.commission = data.commission
					uni.setStorageSync('commission', data.commission)
					this.id = data.id
					this.phone = data.phone
					this.nickName = data.nickname
				}
			},

			/* 跳转到语言切换 */
			handelLanguage() {
				this.$Router.push({
					name: 'language'
				})
			},
			handelClick() {
				this.loginOut = true;
			},
			handelSetting() {
				// console.log(123)
				this.$Router.push({
					name: 'settings'
				})
			},
			handelWallet() {
				this.$Router.push({
					name: 'wallet'
				})
			},
			// 跳转地址页面
			handelMap() {
				this.$Router.push({
					name: 'address'
				})
			},
			handelOrder() {
				this.$Router.push({
					name: 'myOrder'
				})
			},
			handleStatistic() {
				this.$Router.push({
					name: 'statistics'
				})
			},
			handellink() {
				this.$Router.push({
					name: 'promotion'
				})
			},
			//退出按钮
			dropOut() {
				this.$Router.push({
					name: 'login'
				})
				this.$util.msg('Exit success')
				uni.removeStorageSync('token')
				uni.removeStorageSync('nikename')
				uni.removeStorageSync('money')
				uni.removeStorageSync('code')
				uni.removeStorageSync('commission')
				uni.removeStorageSync('id')
				uni.removeStorageSync('ping')
				uni.removeStorageSync('phone')
				//close socket 
				this.UniSocket.close();
			},
			handelEnvelope() {
				this.$Router.push({
					name: 'envelopes'
				})
			},
			handelService() {
				this.isServer = !this.isServer;
			},
			/*
				获取客服信息
			 */
			async handelservices() {
				const data = await this.$api.getGroup()
				if (data.code === 200) {

					// window.open(data.data.whats_group_url)
					window.location.href = data.data.whats_group_url
				}
			},
			/* 
				获取客服信息
			 */
			async handelGrop() {
				const data = await this.$api.getservice()
				if (data.code === 200) {
					// window.open(data.data.whats_service_url)
					window.location.href = data.data.whats_service_url
				}
			}
		}
	}
</script>

<style lang="scss">
	.setting-item {
		margin: 0 40rpx;

	}

	.setting-card {
		width: 400rpx;
		text-align: center;
		background: #f5dbbd;
		border-radius: 8rpx;
		margin: 0 15rpx;
	}

	.setting {
		background: url(../../static/mine_info_bg.33b75004.png) no-repeat center;

	}

	.setting-cards {
		box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, .2);
		padding-bottom: 30rpx;
	}

	.nickname-text {
		font-size: 26upx;
		width: 440upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
