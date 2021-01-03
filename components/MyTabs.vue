<template>
	<view>
		<view class="my-tabs">
			<view class="tabs-bar">
				<view class="tabs-bar-nav">
					<view class="tabs-tab" v-for="tab in tabList" :class="[tabIndex == tab.index ? 'tabs-active' : '']" :key="tab.index" @click="changeTab(tab)">
						{{tab.name}}
					</view>
				</view>
			</view>
			<view class="tabs-content">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabList: Array,
			tabIndex: Number
		},
		data() {
			return {

			};
		},
		methods: {
			changeTab: function(tab) {
				this.$emit('changeTab', tab)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-tabs {
		font-size: 20rpx;
		color: #444;

	}

	.tabs-bar {
		border-bottom: 1rpx solid #eee;
		position: relative;
		padding: 5rpx 0;
	}

	.tabs-bar-nav {
		display: flex;
		justify-content: space-around;
	}

	.tabs-tab {
		min-width: 50%;
		padding: 20rpx 0;
		position: relative;
		display: inline-block;
		text-align: center;
		cursor: pointer;

		font-size: 30rpx;
	}

	.tabs-active {
		background: #e2bf88;
		border-radius: 8rpx;
		color: white;
	}

	.tabs-content {
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 30rpx;
	}
</style>
