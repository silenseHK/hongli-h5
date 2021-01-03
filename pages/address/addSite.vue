<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">{{i18.map.name}}</view>
				<input type="text" v-model="addressData.name" placeholder-class="line" :placeholder="i18.map.namepl" />
			</view>
			<view class="item">
				<view class="left">{{i18.map.mobile}}</view>
				<input type="text" v-model="addressData.phone" placeholder-class="line":placeholder="i18.map.mobilepl" />
			</view>

			<view class="item">
				<view class="left">{{i18.map.code}}</view>
				<input type="text" v-model="addressData.postal" placeholder-class="line" :placeholder="i18.map.codepl"/>
			</view>
			<view class="item">
				<view class="left">{{i18.map.mailbox}}</view>
				<input type="text" v-model="addressData.mail" placeholder-class="line" :placeholder="i18.map.mailboxpl" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">{{i18.map.area}}</view>
				<input disabled type="text" placeholder-class="line"  :placeholder="i18.map.areapl" />
			</view>
			<view class="item address">
				<view class="left">{{i18.map.Address}}</view>
				<textarea type="text" placeholder-class="line" :placeholder="i18.map.addrespl" />
				</view>
			
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bottom u-p-r-20">
			<u-button type="primary" @click="handelSubmit" >{{i18.map.add}}</u-button>
		</view>
		<u-picker mode="region" ref="uPicker" v-model="show" @confirm="confirm" />
		<u-toast ref="uToast" position="top" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			addressData:{
				name:'',
				country:'中国',
				street:'',
				city:"",
				province:'',
				postal:'',
				phone:'',
				mail:'',
			}
		};
	},
	computed: {
		i18() {
			return this.$t('index')
		}
	},
	onReady() {
		uni.setNavigationBarTitle({
			title: this.i18.map.addmap
		})
	},
	methods: {
		setDefault() {},
		showRegionPicker() {
			this.show = true;
		},
		confirm(e) {
			this.addressData.city = e.city.label
			this.addressData.province = e.province.label
			this.addressData.street = e.area.label
		
		},
		async handelSubmit(){
			const data = await this.$api.addAddress(this.addressData)
			if(data.code===200) {
				this.$refs.uToast.show({title: '添加成功',type: 'success',})
				this.$Router.push({
					name:'address'
				})
			}
			
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
</style>
