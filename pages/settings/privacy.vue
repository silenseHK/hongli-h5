<template>
	<view class="privacy u-flex-col">
		<view class="privacy-title">
			<text>{{context.title}}</text>
		</view>
		<u-parse :html="context.content"></u-parse>

	</view>
</template>

<script>
	export default {
		data(){
			return {
				context: {
					title: "",
					content: ""
				},
				query: {
					type: 1,
					titleItem: ""
				}
			}
		},
		onLoad() {
			this.query = this.$Router.$Route.query
			if (!this.query.hasOwnProperty('titleItem')) {
				this.$Router.push({
					name: 'about'
				});
				return;
			}
			uni.setNavigationBarTitle({
				title: this.query.titleItem.title
			});
			this.initContent()
		},
		methods: {
			async initContent () {
				console.log(this.query);
				let res = await this.$api.aboutUs(this.query.type)
				if(res.code === 200){
					this.context = Object.assign(this.context, res.data)
				} else {
					this.$util.msg('Failed to get data')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.privacy {
		padding: 0 30rpx;

		&-title {
			text-align: center;
			color: #e2bf88;
			font-size: 40rpx;
			font-weight: bold;
			margin: 30rpx 0;
		}

		.title-text {
			color: #e2bf88;
			font-size: 35rpx;
			text-align: center;
		}

		.text-option {
			opacity: 0.6;
		}
	}
</style>
