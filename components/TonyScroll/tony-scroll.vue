<template>
	<view class="home">
		<view class="list uni-flex uni-column">
			<view class="wrap-item">
				<view class="lis uni-flex uni-column" :animation="animationData">
					<view class="uni-flex uni-column" v-for="(item, index) in list" :key="index">
						<view class="u-flex list-item u-row-between">
							<view>
								<image src="../../static/activity/users.png" class="item-img" mode=""></image>
							</view>
							<view class="uni-flex uni-column">
								<view class="phone uni-flex-item justify-align-center uni-flex">{{ item.nickname }}</view>
								<view class="time uni-flex-item justify-align-center uni-flex">{{ item.sign_time*1000|friendDate }}</view>
							</view>
							<view>
								<text class="u-font-30">₹{{item.daily_rebate}}</text>
								<view class=" uni-flex ">
									<image src="../../static/activity/crown.png" mode="" class="item-img1"></image>
									<text>INCOME</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: [{
					nickname: '位知',
					sign_time: '1',
					daily_rebate: '100'
				}]
			}
		},
		data() {
			return {
				scrollHeight: 500, //向上滚动距离
				height: 0, //.lis高度（滚动框高度）
				animationData: {} //动画对象
			};
		},
		components: {},
		mounted() {
		
			this.prizeScroll();
		},
		methods: {
			
			getHeight(Class) {
				let query = uni.createSelectorQuery().in(this);
				query
					.selectAll(Class)
					.boundingClientRect(data => {
						this.height = data[0].height;
					})
					.exec();
			},
			prizeScroll() {
				let speed = 50;
				let animation = uni.createAnimation({
					duration: this.getHeight('.lis') / speed,
					timingFunction: 'linear',
					delay: 0
				});
				this.animation = animation;
				setInterval(() => {
					if (this.scrollHeight >= this.height) {
						animation.translateY(0).step();
						this.scrollHeight = 0;
						this.animationData = animation.export();
					} else {
						this.scrollHeight = this.scrollHeight + 1;
						animation.translateY(-this.scrollHeight).step();
						this.animationData = animation.export();
					}
					// console.log('1')
				}, speed);
			},
			handelClick(){
				 this.prizeScroll()
			}
		}
	};
</script>

<style>
	page {
		width: 100%;
	}

	.home,
	.list {
		width: 100%;
		padding-top: 30upx;
		height: 500upx;
		overflow: hidden;
	}

	.list-item {
		background: black;
		opacity: .6;
		overflow: hidden;
		margin: 20upx 0;
		padding: 20rpx;
		border-radius: 10upx;
		color: white;
	}

	.item-img {
		width: 100upx !important;
		height: 100upx !important;
	}

	.item-img1 {
		width: 30upx !important;
		height: 30upx !important;
	}
</style>
