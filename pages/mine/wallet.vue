<template>
	<view class=" wallet">
		<view class="wallet-title">
			<view class="wallet-item">
				<image src="../../static/setting/my_wallet.png" mode="" class="wallet-img"></image>
				<view class="wallet-avater u-flex">
					<u-avatar :src="src"></u-avatar>
					<view class="u-flex-col u-m-l-30">
						<text class="u-font-30">{{i18.wallet.myBalance}}</text>
						<text class="u-font-35 ">₹ 
							<text v-if='moeny'>{{moeny}}</text>
						</text>
					</view>
				</view>
			</view>
		</view>

		<view class="wallet-body">
			<view class="u-flex u-p-t-40 u-row-around setting-cards">
				<view class="u-flex-col u-text-center" style="align-items: center;" @click="handelRechar">
					<u-image src="../../static/setting/rechang.png" width="50rpx" mode="widthFix" height="70rpx"></u-image>
					<text>{{i18.wallet.recharge}}</text>
				</view>
				<view class="u-flex-col u-text-center" style="align-items: center;" @click="withdr">
					<u-image src="../../static/setting/whidhd.png" width="50rpx" mode="widthFix" height="70rpx"></u-image>
					<text>{{i18.wallet.withdRawal}}</text>
				</view>
				<view class="u-flex-col u-text-center" style="align-items: center;" @click="cardLink">
					<u-image src="../../static/setting/bankcard.png" width="50rpx" mode="widthFix" height="70rpx"></u-image>
					<text>{{i18.wallet.bank}}</text>
				</view>
			</view>
		</view>
		<view class="wallet-footer">
			<u-cell-group>
				<u-cell-item icon="list" :title="i18.wallet.records" @click="handelMaps"></u-cell-item>
				<u-cell-item icon="list" :title="i18.wallet.withdrawal" @click="withdrawal"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moeny:0,
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			};
		},
		onLoad() {
			// this.moeny = uni.getStorageSync('money')
			this._getInfo()
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.wallet.walletNavbar
			})
		},
		methods:{
			async _getInfo() {
				/* 获取个人信息 */
				const {
					data,
					code
				} = await this.$api.requestInfo()
				if (code === 200) {
					this.moeny = data.balance
				}
			},
			handelRechar() {
				this.$Router.push({
					name: 'recharge'
				})
			},
			cardLink(){
				this.$Router.push({
					name:'bankCard'
				})
			},
			withdr(){
				this.$Router.push({
					name:'withdrawal'
				})
			},
			handelMaps(){
				this.$Router.push({
					name:'rechargeRecord'
				})
			},
			withdrawal(){
				this.$Router.push({
					name:'records'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.wallet {
		// padding: 0 20rpx;

		&-title {
			background: url(../../common/enjoy/enjoy-top.png) no-repeat;
			display: flex;
			flex-direction: column;
			// align-items: center;
		}

		&-img {
			width: 100%;
			height: 350rpx;
		}

		&-item {
			position: relative;
		}

		&-avater {
			position: absolute;
			top: 97rpx;
			left: 60rpx;
		}

		&-body {
			margin: 0 30rpx;
			margin-top: -30rpx;
			
			box-shadow: 0 6px 10rpx 0 rgba(0,0,0,.2);
			padding: 30rpx 20rpx;
			background-color: white;
			border-radius: 10rpx;
		}
		&-footer{
			margin: 20rpx 30rpx;
			box-shadow: 0 6px 10rpx 0 rgba(0,0,0,.2);
			padding: 30rpx 20rpx;
			background-color: white;
			border-radius: 10rpx;
		}
	}
</style>
