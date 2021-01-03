<template>
	<view class="u-p-l-20 u-p-r-20">
		<view class="item" v-for="(res, index) in siteList" :key="res.id">
			<view class="top">
				<view class="name">{{ res.name }}</view>
				<view class="phone">{{ res.phone }}</view>

			</view>

			<view class="bottom">
				{{res.country+res.province+res.city+res.street+res.name}}
				<u-icon name="edit-pen" :size="40" color="#999999"></u-icon>
				<u-icon name="trash-fill" :size="40" color="red" @click="handelDelete(res.id)"></u-icon>
			</view>
		</view>
		<view class="addSite" @tap="toAddSite">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>{{i18.map.newMap}}
			</view>
		</view>
		<u-toast ref="uToast" position="top" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				siteList: []
			};
		},
		onLoad() {
			this.getData();
		},
		computed: {
			i18() {
				return this.$t('index')
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.i18.map.top
			})
		},
		methods: {
			async getData() {

				const data = await this.$api.getAddress()
				// console.log(data)
				if (data.code === 200) {

					this.siteList = data.data
					// console.log(this.siteList)
				}

			},
			toAddSite() {
				this.$Router.push({
					name: 'addSite'
				})
			},
			//删除地址
			async handelDelete(id) {
				const data = await this.$api.deleteAddress({
					id:id
				})
				if(data.code===200){
					this.$refs.uToast.show({
						// title:'删除成功',
						title: this.i18.active.delSuccess,
						type:'success'
					})
					this.getData();
				} else{
					this.$refs.uToast.show({
						// title:'删除失败',
						title: this.i18.active.delFail,
						type:'error'
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		padding: 40rpx 20rpx;

		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;

			.phone {
				margin-left: 60rpx;
			}

			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;

				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: rgb(49, 145, 253);
				}

				.red {
					background-color: #e6c593;
				}
			}
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}

	.addSite {
		display: flex;
		justify-content: space-around;
		width: 600rpx;
		line-height: 100rpx;
		position: absolute;
		bottom: 30rpx;
		left: 80rpx;
		background-color: red;
		border-radius: 60rpx;
		font-size: 30rpx;

		.add {
			display: flex;
			align-items: center;
			color: #ffffff;

			.icon {
				margin-right: 10rpx;
			}
		}
	}
</style>
